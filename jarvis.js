#!/usr/bin/env node
// ════════════════════════════════════════════════════════════════════
// JARVIS — terminal edition. Same brain/modes as the phone PWA (shares
// jarvis-core.js). Chat, modes, persistent brain memory, streaming, voice.
//   ./jarvis.js          start the chat
//   config + brain live in ~/.jarvis/
// ════════════════════════════════════════════════════════════════════
const fs = require('fs');
const os = require('os');
const path = require('path');
const readline = require('readline');
const { spawn, spawnSync } = require('child_process');
const CORE = require('./jarvis-core.js');

const DIR = path.join(os.homedir(), '.jarvis');
const CFG_FILE = path.join(DIR, 'config.json');
const BRAIN_FILE = path.join(DIR, 'brain.json');

const C = { red:'\x1b[38;5;196m', gold:'\x1b[38;5;178m', dim:'\x1b[2m', grey:'\x1b[38;5;245m',
  green:'\x1b[38;5;42m', bold:'\x1b[1m', reset:'\x1b[0m', cyan:'\x1b[38;5;81m' };

let cfg = { provider:'groq', apikey:'', url:'', model:'llama-3.1-8b-instant',
  name:'Commander', goal:10000, income:0, niche:'', ctx:'', voice:false, automem:true,
  gumkey:'', discord:'', identity:'', style:'', ytkey:'', ytchannel:'' };
let brain = [];
let mode = null;
let history = [];          // [{role,content}] — last 16 kept (8 turns)
let busy = false;
let pendingAction = null;  // approval-gated action awaiting /yes
let lastReply = '';        // last JARVIS message (for /blast with no arg)
let liveSales = null;      // cached real Gumroad data, injected into the prompt
let liveYT = null;         // cached real YouTube channel stats
let watchTimer = null;     // continuous screen-watch loop handle (also = "is watching" flag)
let watchPrev = null;      // last tiny screenshot bytes, for change detection

// ── persistence ───────────────────────────────────────────────────────
// secrets live in the macOS Keychain (encrypted), never in the config file
const SECRETS = ['apikey','gumkey','discord','ytkey','pexels','yt_client_id','yt_client_secret'];
function kcGet(n){ try { const r = spawnSync('security', ['find-generic-password','-s','jarvis-keys','-a',n,'-w'], {encoding:'utf8'}); return r.status===0 ? r.stdout.trim() : ''; } catch(e){ return ''; } }
function kcSet(n,v){ try { spawnSync('security', ['add-generic-password','-U','-s','jarvis-keys','-a',n,'-w',v,'-T','/usr/bin/security']); } catch(e){} }
function fread(f){ try { return fs.readFileSync(path.join(DIR, f), 'utf8').trim(); } catch(e){ return ''; } }
// vault-aware chat: no local key → route through the server vault (the Mac backend
// keeps ~/.jarvis/api-url fresh). Groq dies → local Ollama answers. Same brain everywhere.
async function chatLLM(o){
  if (!cfg.apikey) {
    const vurl = (cfg.apiUrl || fread('api-url')).replace(/\/+$/,''), vtok = cfg.apiToken || fread('api-token');
    if (vurl && vtok) {
      const r = await fetch(vurl + '/api/chat', { method:'POST', headers:{ 'Content-Type':'application/json', 'x-jarvis-token':vtok }, body: JSON.stringify({ system:o.system, messages:o.messages }) });
      if (!r.ok) throw new Error('server vault ' + r.status + (r.status===401?' — wrong token':''));
      const full = ((await r.json()).reply) || '';
      if (o.onToken) o.onToken(full);
      return full;
    }
  }
  try { return await CORE.streamChat(o); }
  catch(e){
    try { return await CORE.streamChat({ ...o, provider:'ollama', apikey:'', url:'http://127.0.0.1:11434', model:'llama3.2:3b' }); }
    catch(e2){ throw e; }
  }
}

function load() {
  try { fs.mkdirSync(DIR, { recursive:true }); } catch (e) {}
  try { Object.assign(cfg, JSON.parse(fs.readFileSync(CFG_FILE, 'utf8'))); } catch (e) {}
  SECRETS.forEach(s => { const v = kcGet(s); if (v) cfg[s] = v; });          // pull secrets from Keychain
  if (process.env.GROQ_API_KEY && !cfg.apikey) cfg.apikey = process.env.GROQ_API_KEY;
  try { brain = JSON.parse(fs.readFileSync(BRAIN_FILE, 'utf8')); } catch (e) { brain = []; }
}
function saveCfg() { const clean = {...cfg}; SECRETS.forEach(s => delete clean[s]); try { fs.writeFileSync(CFG_FILE, JSON.stringify(clean, null, 2)); } catch (e) {} }
function saveBrain() { try { fs.writeFileSync(BRAIN_FILE, JSON.stringify(brain, null, 2)); } catch (e) {} }

// ── ui helpers ──────────────────────────────────────────────────────────
const out = s => process.stdout.write(s);
function line(s = '') { console.log(s); }
function banner() {
  line('');
  line(`${C.red}${C.bold}     ╦  ╔═╗╦═╗╦  ╦╦╔═╗${C.reset}`);
  line(`${C.red}${C.bold}     ║  ╠═╣╠╦╝╚╗╔╝║╚═╗${C.reset}   ${C.grey}terminal edition${C.reset}`);
  line(`${C.red}${C.bold}    ╚╝╩ ╩╩╚═ ╚╝ ╩╚═╝${C.reset}`);
  line('');
  line(`${C.grey}  ${cfg.provider} · ${cfg.model}${cfg.apikey || cfg.url ? '' : '  ' + C.red + '⚠ no key — type /key' + C.grey}${C.reset}`);
  line(`${C.grey}  /help for commands · /quit to exit${C.reset}`);
  line('');
}
function modeTag() {
  if (!mode || !CORE.MODES[mode]) return '';
  return ` ${C.gold}[${CORE.MODES[mode].label}]${C.reset}`;
}
function promptStr() { return `${C.red}${C.bold}you${C.reset}${modeTag()} ${C.red}›${C.reset} `; }

// ── commands ──────────────────────────────────────────────────────────────
function tryMode(input) {
  const t = input.trim().toLowerCase();
  if (/^(exit|off|none|clear|normal|general|reset)( mode)?$/.test(t) && mode) { mode = null; line(`${C.grey}  mode off${C.reset}`); return true; }
  const m = t.match(/^([a-z]+)\s*mode$/);
  if (m && CORE.MODES[m[1]]) { mode = m[1]; line(`${C.gold}  ⚡ ${CORE.MODES[mode].label} — ${CORE.MODES[mode].desc}${C.reset}`); return true; }
  return false;
}

function command(input) {
  const [c, ...rest] = input.trim().split(/\s+/);
  const arg = rest.join(' ');
  switch (c) {
    case '/help':
      line(`${C.gold}  commands:${C.reset}`);
      line(`  ${C.cyan}/mode <name>${C.reset}   focus a mode    ${C.cyan}/modes${C.reset}   list all modes`);
      line(`  ${C.cyan}/exit${C.reset}          leave the mode  ${C.cyan}/brain${C.reset}   show memory`);
      line(`  ${C.cyan}/remember <cat>: <fact>${C.reset}   teach JARVIS a fact (cat = idea/fact/context/product)`);
      line(`  ${C.cyan}/forget <n>${C.reset}    delete fact n   ${C.cyan}/status${C.reset}  business snapshot`);
      line(`  ${C.cyan}/key <groq-key>${C.reset}  set API key    ${C.cyan}/set <k> <v>${C.reset}  config (name/goal/income/niche/gumkey/discord/…)`);
      line(`  ${C.cyan}/sales${C.reset}         real Gumroad numbers   ${C.cyan}/yt${C.reset}     real YouTube stats   ${C.cyan}/blast [msg]${C.reset}  Discord`);
      line(`  ${C.cyan}/identity <txt>${C.reset}  tell JARVIS who you are   ${C.cyan}/style learn${C.reset}  learn your writing voice`);
      line(`  ${C.cyan}/minds${C.reset}         dispatch the parallel agents (ATLAS·SCRIBE·HUNTER·LEDGER) now`);
      line(`  ${C.cyan}/see [question]${C.reset}  let JARVIS look at your screen once and answer`);
      line(`  ${C.cyan}/watch [secs] [q]${C.reset}  JARVIS watches your screen continuously — press Enter to stop`);
      line(`  ${C.cyan}/video <topic>${C.reset}  make a faceless video → approve → upload to YouTube`);
      line(`  ${C.cyan}/batch${C.reset}         watch the daemon's latest 3 videos   ${C.cyan}/pick <n>${C.reset}  upload your favorite`);
      line(`  ${C.cyan}/voice${C.reset}         toggle talk-back ${C.cyan}/new${C.reset}    clear conversation`);
      line(`  ${C.cyan}/automem${C.reset}       toggle auto-memory (JARVIS remembers durable facts on its own)`);
      line(`  ${C.cyan}/quit${C.reset}          exit`);
      return true;
    case '/modes':
      line(`${C.gold}  modes:${C.reset}`);
      Object.entries(CORE.MODES).forEach(([k, m]) => { if (k !== 'music' && k !== 'create') line(`  ${C.cyan}${k.padEnd(9)}${C.reset}${C.grey}${m.desc}${C.reset}`); });
      return true;
    case '/mode': if (!tryMode(arg + ' mode')) line(`${C.red}  unknown mode. /modes to list.${C.reset}`); return true;
    case '/exit': mode = null; line(`${C.grey}  mode off${C.reset}`); return true;
    case '/brain':
      if (!brain.length) { line(`${C.grey}  brain empty — teach me with /remember idea: <thing>${C.reset}`); return true; }
      brain.forEach((b, i) => line(`  ${C.gold}${i + 1}.${C.reset} ${C.cyan}[${b.category}]${C.reset} ${b.fact}`));
      return true;
    case '/remember': {
      const m = arg.match(/^(\w+)\s*:\s*(.+)$/);
      const cat = m ? m[1] : 'fact', fact = m ? m[2] : arg;
      if (!fact.trim()) { line(`${C.red}  usage: /remember idea: sell a Notion budget template${C.reset}`); return true; }
      brain.unshift({ category:cat, fact:fact.trim(), date:new Date().toISOString() });
      brain = brain.slice(0, 25); saveBrain();
      line(`${C.green}  ✓ remembered (${brain.length}/25)${C.reset}`);
      return true;
    }
    case '/forget': {
      const i = parseInt(arg, 10) - 1;
      if (i >= 0 && i < brain.length) { const g = brain.splice(i, 1)[0]; saveBrain(); line(`${C.grey}  forgot: ${g.fact}${C.reset}`); }
      else line(`${C.red}  no fact ${arg}. /brain to list.${C.reset}`);
      return true;
    }
    case '/status':
      line(`${C.gold}  ${cfg.name}${C.reset} · niche: ${cfg.niche || '—'}`);
      line(`  goal $${(cfg.goal||0).toLocaleString()}/mo · income $${(cfg.income||0).toLocaleString()}/mo · brain ${brain.length}/25`);
      line(`  ${C.grey}${cfg.provider} · ${cfg.model}${C.reset}`);
      return true;
    case '/key': if (!arg) { line(`${C.red}  usage: /key gsk_...  (get one free at console.groq.com/keys)${C.reset}`); return true; }
      cfg.apikey = arg.trim(); kcSet('apikey', cfg.apikey); line(`${C.green}  ✓ key saved (Keychain)${C.reset}`); return true;
    case '/set': {
      const k = rest[0], v = rest.slice(1).join(' ');
      if (!k || v === '') { line(`${C.red}  usage: /set name Miguel  |  /set goal 7500  |  /set niche faceless youtube${C.reset}`); return true; }
      if (['goal', 'income'].includes(k)) cfg[k] = parseInt(v.replace(/[^0-9]/g, ''), 10) || 0;
      else if (['name','model','provider','url','niche','ctx','identity','style','ytchannel'].includes(k) || SECRETS.includes(k)) cfg[k] = v;
      else { line(`${C.red}  unknown setting "${k}"${C.reset}`); return true; }
      if (SECRETS.includes(k)) { kcSet(k, v); saveCfg(); line(`${C.green}  ✓ ${k} saved (Keychain)${C.reset}`); }
      else { saveCfg(); line(`${C.green}  ✓ ${k} = ${cfg[k]}${C.reset}`); }
      return true;
    }
    case '/sales': {
      if (!cfg.gumkey) { line(`${C.red}  no Gumroad token. /set gumkey <token>  (gumroad.com/settings/advanced → Generate access token)${C.reset}`); return true; }
      line(`${C.grey}  fetching Gumroad…${C.reset}`);
      CORE.fetchGumroad(cfg.gumkey).then(r => {
        if (!r.ok) { line(`${C.red}  ✕ ${r.error}${C.reset}`); return; }
        liveSales = r;   // ground JARVIS in real data
        line(`${C.gold}  Gumroad:${C.reset} ${r.salesCount} sales · $${r.revenue.toFixed(2)} revenue`);
        if (r.products.length) r.products.forEach(p => line(`  ${C.cyan}•${C.reset} ${p.name} — $${p.price} · ${p.sales} sold${p.published ? '' : ' (draft)'}`));
        else line(`${C.grey}  no products listed yet${C.reset}`);
      });
      return true;
    }
    case '/video':
      if (!arg) { line(`${C.red}  usage: /video <topic>  (writes a script, renders a faceless video, then asks to upload)${C.reset}`); return true; }
      makeVideo(arg);
      return true;
    case '/minds': dispatchMinds(); return true;
    case '/see': seeScreen(arg); return true;
    case '/watch': watchScreen(arg); return true;
    case '/stop': stopWatch(); return true;
    case '/batch': {
      const lf = path.join(DIR, 'videos', 'latest.json');
      if (!fs.existsSync(lf)) { line(`${C.grey}  no video batch yet — the daemon makes them, or run ./jarvisd.sh idea${C.reset}`); return true; }
      const b = JSON.parse(fs.readFileSync(lf, 'utf8'));
      line(`${C.gold}  latest batch:${C.reset} ${b.idea}`);
      b.items.forEach((it, i) => line(`  ${C.cyan}${i + 1}.${C.reset} ${it.title}`));
      line(`${C.grey}  opening the folder to watch them · upload one with /pick <n>${C.reset}`);
      try { spawn('open', [b.dir], { stdio:'ignore' }); } catch (e) {}
      return true;
    }
    case '/pick': {
      const lf = path.join(DIR, 'videos', 'latest.json');
      if (!fs.existsSync(lf)) { line(`${C.red}  no batch yet — /batch${C.reset}`); return true; }
      const b = JSON.parse(fs.readFileSync(lf, 'utf8'));
      const n = parseInt(arg, 10);
      if (!(n >= 1 && n <= b.items.length)) { line(`${C.red}  usage: /pick 1  (1-${b.items.length})${C.reset}`); return true; }
      const it = b.items[n - 1];
      line(`${C.grey}  uploading "${it.title}" (private)… don't close${C.reset}`);
      runPy(['upload_youtube.py', '--file', it.file, '--title', it.title, '--desc', it.desc || '', '--tags', it.tags || '', '--privacy', 'private']).then(r => {
        const m = r.out.match(/https:\/\/youtu\.be\/\S+/);
        line(m ? `${C.green}  ✓ uploaded (private): ${m[0]}${C.reset}\n  ${C.grey}flip to Public in YouTube Studio when ready${C.reset}` : `${C.red}  ✕ upload failed: ${r.out.slice(-280)}${C.reset}`);
      });
      return true;
    }
    case '/yt': {
      if (!cfg.ytkey || !cfg.ytchannel) { line(`${C.red}  need both: /set ytkey AIza…  and  /set ytchannel UC…${C.reset}`); return true; }
      line(`${C.grey}  fetching YouTube…${C.reset}`);
      CORE.fetchYouTube(cfg.ytkey, cfg.ytchannel).then(r => {
        if (!r.ok) { line(`${C.red}  ✕ ${r.error}${C.reset}`); return; }
        liveYT = r;
        line(`${C.gold}  YouTube:${C.reset} "${r.title}" — ${r.subs.toLocaleString()} subs · ${r.views.toLocaleString()} views · ${r.videos} videos`);
      });
      return true;
    }
    case '/blast': {
      if (!cfg.discord) { line(`${C.red}  no Discord webhook. /set discord <url>  (Server → Integrations → Webhooks → New)${C.reset}`); return true; }
      const content = arg.trim() || lastReply;
      if (!content) { line(`${C.red}  nothing to blast — /blast <message>, or send a message first then /blast${C.reset}`); return true; }
      pendingAction = { type:'discord', content };
      line(`${C.gold}  ▼ BLAST PREVIEW → Discord:${C.reset}`);
      line(content.slice(0, 500) + (content.length > 500 ? '…' : ''));
      line(`${C.grey}  /yes to send · /no to cancel${C.reset}`);
      return true;
    }
    case '/yes': {
      if (!pendingAction) { line(`${C.grey}  nothing pending${C.reset}`); return true; }
      const a = pendingAction; pendingAction = null;
      if (a.type === 'discord') {
        line(`${C.grey}  sending…${C.reset}`);
        CORE.sendDiscord(cfg.discord, a.content).then(r => line(r.ok ? `${C.green}  ✓ blasted to Discord${C.reset}` : `${C.red}  ✕ ${r.error || ('HTTP ' + r.status)}${C.reset}`));
      } else if (a.type === 'youtube') {
        line(`${C.grey}  uploading to YouTube (private)… don't close${C.reset}`);
        runPy(['upload_youtube.py', '--file', a.file, '--title', a.title, '--desc', a.desc || '', '--tags', a.tags || '', '--privacy', 'private']).then(r => {
          const m = r.out.match(/https:\/\/youtu\.be\/\S+/);
          line(m ? `${C.green}  ✓ uploaded (private): ${m[0]}${C.reset}\n  ${C.grey}set it Public in YouTube Studio when ready${C.reset}` : `${C.red}  ✕ upload failed: ${r.out.slice(-300)}${C.reset}`);
        });
      }
      return true;
    }
    case '/no': pendingAction = null; line(`${C.grey}  cancelled${C.reset}`); return true;
    case '/identity':
      if (!arg) { line(cfg.identity ? `${C.gold}  identity:${C.reset} ${cfg.identity}` : `${C.grey}  none set. /identity <who you are + your business>${C.reset}`); return true; }
      cfg.identity = arg; saveCfg(); line(`${C.green}  ✓ identity set — JARVIS knows you now${C.reset}`); return true;
    case '/style': {
      if (!arg) { line(cfg.style ? `${C.gold}  your voice:${C.reset} ${cfg.style}` : `${C.grey}  none set. /style learn (after chatting) or /style <description>${C.reset}`); return true; }
      if (rest[0] === 'learn') {
        const extra = rest.slice(1).join(' ').trim();
        const samples = extra || history.filter(m => m.role === 'user').map(m => m.content).join('\n\n');
        if (!samples) { line(`${C.red}  nothing to learn from — chat first, or /style learn <paste your writing>${C.reset}`); return true; }
        if (!cfg.apikey) { line(`${C.red}  need an API key to learn style${C.reset}`); return true; }
        line(`${C.grey}  learning your voice…${C.reset}`);
        CORE.learnStyle({ provider:cfg.provider, apikey:cfg.apikey, url:cfg.url, model:cfg.model, samples }).then(s => {
          if (s) { cfg.style = s; saveCfg(); line(`${C.green}  ✓ learned your voice:${C.reset} ${s}`); }
          else line(`${C.red}  couldn't learn style — try again${C.reset}`);
        });
        return true;
      }
      cfg.style = arg; saveCfg(); line(`${C.green}  ✓ voice set${C.reset}`); return true;
    }
    case '/voice': cfg.voice = !cfg.voice; saveCfg(); line(`${C.grey}  voice ${cfg.voice ? 'on' : 'off'}${C.reset}`); return true;
    case '/automem': cfg.automem = (cfg.automem === false); saveCfg(); line(`${C.grey}  auto-memory ${cfg.automem ? 'on — JARVIS remembers durable facts automatically' : 'off'}${C.reset}`); return true;
    case '/new': history = []; line(`${C.grey}  conversation cleared${C.reset}`); return true;
    case '/quit': case '/exit!': line(`${C.grey}  later, ${cfg.name}.${C.reset}`); process.exit(0);
  }
  if (c.startsWith('/')) { line(`${C.red}  unknown command ${c} — /help${C.reset}`); return true; }
  return false;
}

// ── video pipeline (script → faceless video → approve → upload) ───────────
function runPy(args) {
  // honest error when the .py helper isn't installed — otherwise the terminal
  // shows a python stack trace and looks like something ran.
  const first = args[0];
  try {
    if (typeof first === 'string' && /\.py$/.test(first)) {
      const fs = require('fs'), path = require('path');
      const p = path.join(__dirname, first);
      if (!fs.existsSync(p)) {
        return Promise.resolve({ code: 127, out: '  ✕ '+first+' is not installed at '+__dirname+'\n  → re-run: curl -fsSL https://bozo711.github.io/bam-install.sh | bash' });
      }
    }
  } catch (e) {}
  return new Promise(res => {
    const p = spawn('python3.11', args, { cwd: __dirname });
    let out = '';
    p.stdout.on('data', d => out += d); p.stderr.on('data', d => out += d);
    p.on('close', code => res({ code, out }));
    p.on('error', e => res({ code: 1, out: '  ✕ python3.11 not found — brew install python@3.11' }));
  });
}

async function makeVideo(topic) {
  if (!cfg.apikey) { line(`${C.red}  need an API key (/key)${C.reset}`); return; }
  line(`${C.grey}  ● writing the script…${C.reset}`);
  const sys = 'You script short faceless videos. Return JSON only: {"title":"","script":"","description":"","tags":"","broll":["","",""]}. script = 4-7 punchy spoken sentences — ONLY the words to read aloud, no scene directions. broll = 3-5 stock-footage search terms. tags = comma-separated. No hype.';
  let reply = '';
  try { reply = await CORE.streamChat({ provider:cfg.provider, apikey:cfg.apikey, url:cfg.url, model:cfg.model, system:sys, messages:[{ role:'user', content:'Topic: ' + topic }], json:true, onToken:()=>{} }); }
  catch (e) { line(`${C.red}  script failed: ${e.message}${C.reset}`); return; }
  let d; try { d = JSON.parse((reply.match(/\{[\s\S]*\}/) || [reply])[0]); } catch (e) { line(`${C.red}  couldn't parse script${C.reset}`); return; }
  const title = String(d.title || topic).trim();
  const script = String(d.script || '').trim();
  if (!script) { line(`${C.red}  empty script — try again${C.reset}`); return; }
  line(`${C.gold}  ${title}${C.reset}`);
  line(`${C.grey}  ● rendering video (~30s, neural voice + visuals)…${C.reset}`);
  const dir = path.join(DIR, 'videos'); fs.mkdirSync(dir, { recursive:true });
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const slug = (title.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '').slice(0, 40)) || 'video';
  const sf = path.join(dir, slug + '_' + stamp + '.txt'); fs.writeFileSync(sf, script);
  const out = path.join(dir, slug + '_' + stamp + '.mp4');
  const broll = (d.broll || []).map(x => String(x).trim()).filter(Boolean);
  let brollDir = '';
  if (cfg.pexels && broll.length) {
    brollDir = path.join(dir, 'broll_' + stamp);
    await runPy(['get_broll.py', '--out', brollDir, ...broll]);
  }
  const args = ['make_video.py', '--title', title, '--script-file', sf, '--out', out];
  if (brollDir && fs.existsSync(brollDir)) args.push('--broll-dir', brollDir);
  const r = await runPy(args);
  if (r.code !== 0 || !fs.existsSync(out)) { line(`${C.red}  ✕ render failed: ${r.out.slice(-300)}${C.reset}`); return; }
  line(`${C.green}  ✓ video ready:${C.reset} ${out}`);
  pendingAction = { type:'youtube', file:out, title, desc:String(d.description||''), tags:String(d.tags||'') };
  line(`${C.gold}  ▼ upload to YouTube (PRIVATE)? /yes to upload · /no to keep it local${C.reset}`);
}

// ── screen vision: capture the screen and let JARVIS read it ──────────────
async function seeScreen(q) {
  if (!cfg.apikey) { line(`${C.red}  need an API key (/key)${C.reset}`); return; }
  const shot = '/tmp/jarvis-screen.jpg';
  try { if (fs.existsSync(shot)) fs.unlinkSync(shot); } catch (e) {}
  spawnSync('screencapture', ['-x', '-t', 'jpg', shot]);
  spawnSync('sips', ['-Z', '1400', shot], { stdio: 'ignore' });   // shrink to keep the payload small
  if (!fs.existsSync(shot)) { line(`${C.red}  ✕ couldn't capture the screen. Grant Screen Recording permission to your terminal (System Settings → Privacy & Security → Screen Recording), then retry.${C.reset}`); return; }
  const b64 = fs.readFileSync(shot).toString('base64');
  line(`${C.grey}  👁  looking at your screen…${C.reset}`);
  out(`${C.gold}${C.bold}jarvis${C.reset} ${C.gold}›${C.reset} `);
  let printed = 0;
  try {
    await CORE.streamChat({
      provider: cfg.provider, apikey: cfg.apikey, url: cfg.url, model: cfg.model,
      system: CORE.buildSystemPrompt({ name: cfg.name, niche: cfg.niche, goal: cfg.goal, income: cfg.income, ctx: cfg.ctx, brain, mode }),
      messages: [{ role: 'user', content: [
        { type: 'image_url', image_url: { url: 'data:image/jpeg;base64,' + b64 } },
        { type: 'text', text: q || 'What is on my screen right now? Describe it and give me anything useful or actionable.' },
      ] }],
      onToken: (f) => { out(f.slice(printed)); printed = f.length; },
    });
    line(''); line('');
  } catch (e) { line(`\n${C.red}  ✕ ${e.message}${C.reset}\n`); }
}

// ── parallel minds: run the NEUROLINK agents concurrently in the terminal ────
async function dispatchMinds() {
  if (!cfg.apikey) { line(`${C.red}  need an API key (/key)${C.reset}`); return; }
  const niche = cfg.niche || 'digital products';
  line(`${C.gold}  🧠 dispatching parallel minds…${C.reset}`);
  // LEDGER — real numbers
  let ledger = 'Gumroad not connected', prods = '';
  if (cfg.gumkey) {
    try { const r = await CORE.fetchGumroad(cfg.gumkey); if (r && r.ok) { liveSales = r; const pct = cfg.goal ? Math.round(r.revenue / cfg.goal * 100) : 0; ledger = `$${r.revenue.toFixed(0)} · ${r.salesCount} sales${cfg.goal ? ` · ${pct}% to $${cfg.goal}` : ''}`; if (r.products && r.products.length) prods = 'My products: ' + r.products.map(p => p.name).join(', ') + '. '; } } catch (e) {}
  }
  const ask = async (sys, user) => {
    try { const o = await CORE.streamChat({ provider:cfg.provider, apikey:cfg.apikey, url:cfg.url, model:cfg.model, system:sys, messages:[{ role:'user', content:user }], onToken:()=>{} }); return (o || '').replace(/\s+/g, ' ').trim(); }
    catch (e) { return '(failed: ' + e.message + ')'; }
  };
  const [atlas, scribe, hunter] = await Promise.all([
    ask('You are ATLAS, a sharp market researcher. Reply in ONE tight sentence.', `Name ONE specific ${niche} digital product that could sell right now, and why.`),
    ask('You are SCRIBE, a direct-response copywriter. Reply with just a product title and a one-sentence hook.', `Draft a ${niche} digital product title + hook.`),
    ask('You are HUNTER, a sales strategist. Reply with ONE concrete action, one sentence.', `${prods}What is the single best move to make a sale this week for a ${niche} creator?`),
  ]);
  line(`  ${C.cyan}📊 LEDGER${C.reset}  ${ledger}`);
  line(`  ${C.cyan}🔭 ATLAS${C.reset}   ${atlas}`);
  line(`  ${C.cyan}✍️  SCRIBE${C.reset}  ${scribe}`);
  line(`  ${C.cyan}🎯 HUNTER${C.reset}  ${hunter}`);
  line('');
}

// ── continuous screen watch: snapshot on an interval, narrate only on change ─
function stopWatch(quiet) {
  if (watchTimer) { clearTimeout(watchTimer); watchTimer = null; }
  watchPrev = null;
  if (!quiet) line(`\n${C.grey}  👁 watch off${C.reset}`);
}

async function watchScreen(arg) {
  if (watchTimer) { stopWatch(); return; }            // /watch again = toggle off
  if (!cfg.apikey) { line(`${C.red}  need an API key (/key)${C.reset}`); return; }
  const m = (arg || '').match(/^\s*(\d+)\s*(.*)$/);
  const secs = Math.max(3, m ? parseInt(m[1], 10) : 8);
  const q = (m ? m[2] : arg || '').trim();
  line(`${C.gold}  👁 watching your screen every ${secs}s${C.reset} ${C.grey}— press Enter to stop${C.reset}`);
  watchTimer = setTimeout(tick, 50);

  async function tick() {
    if (!watchTimer) return;
    if (busy) { watchTimer = setTimeout(tick, secs * 1000); return; }   // don't fight a chat turn
    const shot = '/tmp/jarvis-watch.jpg', tiny = '/tmp/jarvis-watch-tiny.png';
    try { if (fs.existsSync(shot)) fs.unlinkSync(shot); } catch (e) {}
    spawnSync('screencapture', ['-x', '-t', 'jpg', shot]);
    if (!fs.existsSync(shot)) {
      line(`${C.red}  ✕ capture failed — grant Screen Recording permission to your terminal (System Settings → Privacy & Security → Screen Recording).${C.reset}`);
      stopWatch(true); return;
    }
    // change detection: shrink to a tiny lossless thumbnail; identical bytes = no real change
    spawnSync('sips', ['-Z', '32', '-s', 'format', 'png', shot, '--out', tiny], { stdio: 'ignore' });
    let changed = true;
    try { const cur = fs.readFileSync(tiny); if (watchPrev && cur.equals(watchPrev)) changed = false; watchPrev = cur; } catch (e) {}
    if (changed) {
      spawnSync('sips', ['-Z', '1400', shot], { stdio: 'ignore' });
      const b64 = fs.readFileSync(shot).toString('base64');
      out(`${C.grey}  [${new Date().toLocaleTimeString()}] ${C.reset}${C.gold}👁 ${C.reset}`);
      let printed = 0;
      try {
        await CORE.streamChat({
          provider: cfg.provider, apikey: cfg.apikey, url: cfg.url, model: cfg.model,
          system: CORE.buildSystemPrompt({ name: cfg.name, niche: cfg.niche, goal: cfg.goal, income: cfg.income, ctx: cfg.ctx, brain, mode })
            + '\n\nYou are WATCHING the user\'s screen live. Reply in ONE short sentence about what is notable or changed right now — terse, no preamble. If nothing useful, reply exactly "(nothing worth noting)".',
          messages: [{ role: 'user', content: [
            { type: 'image_url', image_url: { url: 'data:image/jpeg;base64,' + b64 } },
            { type: 'text', text: q || 'What changed / what is notable on my screen now? One short sentence.' },
          ] }],
          onToken: (f) => { out(f.slice(printed)); printed = f.length; },
        });
        line('');
      } catch (e) { line(`${C.red}  ✕ ${e.message}${C.reset}`); }
    }
    if (watchTimer) watchTimer = setTimeout(tick, secs * 1000);
  }
}

// ── speak (macOS) ─────────────────────────────────────────────────────────
function speak(text) {
  if (!cfg.voice || process.platform !== 'darwin') return;
  const clean = text.replace(/\[[^\]]*\]/g, '').replace(/[*_`#>•]/g, '').replace(/https?:\/\/\S+/g, '').slice(0, 600);
  try { spawn('say', ['-v', 'Daniel', clean], { detached:true, stdio:'ignore' }).unref(); } catch (e) {}
}

// ── chat turn ─────────────────────────────────────────────────────────────
async function ask(input) {
  busy = true;
  history.push({ role:'user', content:input });
  const system = CORE.buildSystemPrompt({
    name:cfg.name, niche:cfg.niche, goal:cfg.goal, income:cfg.income,
    ctx:cfg.ctx, brain, mode, query:input, sales:liveSales, youtube:liveYT,
    identity:cfg.identity, style:cfg.style,
  });
  out(`${C.gold}${C.bold}bam${C.reset} ${C.gold}›${C.reset} `);
  let printed = 0;
  try {
    const full = await chatLLM({
      provider:cfg.provider, apikey:cfg.apikey, url:cfg.url, model:cfg.model,
      system, messages:history.slice(-16),
      onToken: (f) => { out(f.slice(printed)); printed = f.length; },
    });
    line(''); line('');
    history.push({ role:'assistant', content:full });
    history = history.slice(-16);
    lastReply = full;
    speak(full);
    // auto-memory: pull durable facts from this exchange and remember them
    if (cfg.automem !== false && cfg.apikey) {
      try {
        const facts = await CORE.extractFacts({ provider:cfg.provider, apikey:cfg.apikey, url:cfg.url, model:cfg.model, userText:input, assistantText:full });
        const r = CORE.mergeFacts(brain, facts);
        if (r.added.length) { brain = r.brain; saveBrain(); line(`${C.grey}  🧠 remembered: ${r.added.join(' · ')}${C.reset}\n`); }
      } catch (e) {}
    }
  } catch (e) {
    line(`\n${C.red}  ✕ ${e.message}${C.reset}`);
    if (/key|HTTP 401/i.test(e.message)) line(`${C.grey}  set one with /key gsk_...  (free at console.groq.com/keys)${C.reset}`);
    line('');
  }
  busy = false;
}

// ── repl ────────────────────────────────────────────────────────────────────
function main() {
  load();
  banner();
  // prefetch real Gumroad + YouTube data so JARVIS is grounded from the first message
  if (cfg.gumkey) CORE.fetchGumroad(cfg.gumkey).then(r => { if (r.ok) liveSales = r; }).catch(() => {});
  if (cfg.ytkey && cfg.ytchannel) CORE.fetchYouTube(cfg.ytkey, cfg.ytchannel).then(r => { if (r.ok) liveYT = r; }).catch(() => {});
  const rl = readline.createInterface({ input:process.stdin, output:process.stdout, prompt:promptStr() });
  rl.prompt();
  rl.on('line', async (raw) => {
    const input = raw.trim();
    if (watchTimer) { stopWatch(); rl.prompt(); return; }   // any keypress stops a live watch
    if (!input) { rl.prompt(); return; }
    if (busy) return;
    if (command(input)) { rl.setPrompt(promptStr()); rl.prompt(); return; }
    if (tryMode(input)) { rl.setPrompt(promptStr()); rl.prompt(); return; }
    if (!cfg.apikey && cfg.provider !== 'ollama') {
      line(`${C.red}  no API key yet.${C.reset} ${C.grey}set one: /key gsk_...  (free at console.groq.com/keys)${C.reset}`);
      rl.prompt(); return;
    }
    rl.pause();
    await ask(input);
    rl.setPrompt(promptStr());
    rl.resume();
    rl.prompt();
  });
  rl.on('close', () => { line(`\n${C.grey}  later, ${cfg.name}.${C.reset}`); process.exit(0); });
}

main();

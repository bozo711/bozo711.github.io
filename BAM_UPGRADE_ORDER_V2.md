# BAM — 10 UPGRADES · MACHINE, NOT LLM
**Rule for this list:** v1 made the instruments honest. This list closes the loops that turn BAM from a talking system into one that acts, ships, measures, and adjusts.

**Grounded audit** — every claim below cites a file that exists (or doesn't):

- `~/.jarvis/config.json` → `niche: ""` · `income: 0` — the niche is empty (all generated videos default to "make money online with digital products") and lifetime income is $0.
- `~/.jarvis/ledger.jsonl` last 500 entries by kind: 169 academy · 157 fix · 98 security · 23 paper · 18 agent · 8 code · 7 scout · 7 trend · 5 learn · 3 research · 2 mail · 2 site · 1 intercom · **0 sale · 0 publish · 0 deploy · 0 revenue**.
- Missing: no `~/.jarvis/budget.json`, no `~/.jarvis/autonomy.json`, no `~/.jarvis/gumroad-history.json`, no daily-cost tracker anywhere in `server.js` or `jarvis-daemon.js` (grep returns 0).

**Do them in this order.** 1–3 close the money loop. 4–6 close the reliability loop. 7–9 close the learning loop. 10 gives the machine controlled autonomy.

---

## 1. Gumroad payout watchdog (silent failure → loud unblocking)
**Missing file:** `~/.jarvis/gumroad-history.json`  ·  **Config truth:** `income: 0` for the entire life of BAM.

Right now BAM will draft products and *"publish"* them without ever checking whether Gumroad can pay you. Every "success" toast is on a listing that would never ship a dollar to your bank.

**Add a daemon tick — `payoutCheck()`:**

```js
async function payoutCheck() {
  const key = kcRead('gum_key'); if (!key) return;
  const j = await (await fetch('https://api.gumroad.com/v2/user', {
    headers: { Authorization: 'Bearer ' + key }
  })).json();
  const ok = j.user && j.user.payout_configured === true;  // Gumroad marks this field
  writeJSON(HOME('.jarvis/payout.json'), { ok, ts: Date.now(), user: j.user });
  if (!ok) {
    pushDecision({
      kind:'block', title:'Gumroad payout NOT configured',
      body:'Every product BAM "publishes" is a draft nobody sees. Attach your bank in Gumroad first.',
      cta:{ label:'Open Gumroad payouts', url:'https://app.gumroad.com/settings/payments' }
    });
  }
}
```

And in `publishProduct()`, refuse to publish if `payout.json.ok === false` — with a chat message that says **why**. No more silent failure into a phantom pipeline.

**Impact:** the single biggest cause of "why has BAM never made a dollar" becomes a top-of-screen decision item until fixed.

---

## 2. YouTube OAuth health check (stop losing publishing every 7 days)
**Cited in memory:** OAuth in Testing mode invalidates refresh tokens weekly. Every failed upload logs `invalid_grant` into a log nobody reads.

**Add `ytHealthTick()` — daily:**

```js
async function ytHealthTick() {
  const rt = kcRead('yt_refresh_token'); if (!rt) return;
  try {
    const tok = await ytAccessToken(rt);
    await (await fetch('https://www.googleapis.com/youtube/v3/channels?part=id&mine=true',
      { headers:{ Authorization:'Bearer '+tok } })).json();
    writeJSON(HOME('.jarvis/yt-health.json'), { ok:true, ts:Date.now() });
  } catch (e) {
    writeJSON(HOME('.jarvis/yt-health.json'), { ok:false, err:e.message, ts:Date.now() });
    pushDecision({
      kind:'block', title:'YouTube OAuth expired — re-consent needed',
      body:'python3.11 ~/jarvis-api/yt_oauth.py — walks you through it in 60s',
      cta:{ label:'Run yt_oauth.py', copy:'python3.11 ~/jarvis-api/yt_oauth.py' }
    });
  }
}
```

Every publish path first reads `yt-health.json` — no draft renders while OAuth is broken. Better fix long-term: move the app from **Testing** to **In production** in Google Cloud Console. That removes the 7-day expiry entirely.

**Impact:** publishing stops rotting weekly. `📹 YouTube Studio` becomes a real channel.

---

## 3. Every real sale writes a ledger entry → brain fact → strategy signal
**Ledger truth:** 500 lines back, zero entries with `kind: "sale"`.

Right now Gumroad sales exist as a number on a card. They don't feed strategy, and the memory spine never sees them. So the lineage minds keep teaching about "digital product strategy" without a single real signal from what actually earned.

**Add — in the gumroad-poll path:**

```js
// existing: fetch sales; new: for each newly-seen sale…
ledger('sale', product.name+' · $'+amount+' · '+buyer_country, { amount, day:new Date().getDay() });
memWrite({ kind:'sale-fact',
  text:'"'+product.name+'" made $'+amount+' on '+dayName(day)+' from '+buyer_country
});
```

Weekly self-review already ingests ledger + brain. Suddenly it has real data instead of imagined lessons. `bestFor('money')` — Sage — starts routing decisions on what actually worked.

**Impact:** BAM stops learning from a vacuum and starts learning from money.

---

## 4. Daily cost governor with hard stop
**Grep truth:** `budget|dailySpend|costTrack` returns **0** hits in server + daemon.

Right now a runaway loop (mission → 70B → mission → 70B) can rack up $$ overnight and nobody knows until the bill lands.

**One file, one middleware:**

```js
// ~/jarvis-api/costs.js
const F = HOME('.jarvis/budget.json');
const PRICE = { 'llama-3.3-70b-versatile':{in:.59,out:.79}, 'llama-3.1-8b-instant':{in:.05,out:.08} };
function load(){ try{return JSON.parse(fs.readFileSync(F));}catch{return {date:today(),spent:0,cap:2}} }
function save(b){ fs.writeFileSync(F, JSON.stringify(b,null,1)); }
function bill(model, inTok, outTok){
  const b = load(); if (b.date !== today()){ b.date=today(); b.spent=0; }
  const p = PRICE[model] || {in:.5,out:1};
  b.spent += (inTok/1e6)*p.in + (outTok/1e6)*p.out;
  save(b); return b;
}
function budgetLeft(){ const b=load(); return b.cap - b.spent; }
function overBudget(){ return budgetLeft() <= 0; }
module.exports = { bill, budgetLeft, overBudget };
```

Wrap `groqChat()` and `openaiChat()`:

```js
if (Costs.overBudget()) { return { text:'', fallback:'local:qwen2.5:3b' }; }
// call…
Costs.bill(model, usage.prompt_tokens, usage.completion_tokens);
```

At 90% cap: warn + auto-downgrade to local ollama. At 100%: refuse cloud calls until midnight reset. Sentinel shows today's spend + cap.

**Impact:** you sleep at night. Every dollar leaves an audit trail.

---

## 5. State store — one process owns the write
**Files that fight over writes:** `paper-trading.json`, `daemon-state.json`, `minds/roster.json`, `brain.json`, `ledger.jsonl`, `mission.json`, `code/state.json`. Each has ad-hoc `tmp+rename` atomicity, no lock, no version.

When two tick handlers touch the same file in the same second, one loses. Silent. This is likely why paper trading had 6 stuck positions for weeks — the settlement write may have raced ptSave.

**One file — `~/jarvis-api/stateStore.js`:**

```js
const flock = new Map(); // key → Promise chain
function patch(key, fn) {
  const prev = flock.get(key) || Promise.resolve();
  const next = prev.then(async () => {
    const f = HOME('.jarvis/'+key+'.json');
    const cur = readJSON(f, {});
    const nxt = await fn(cur);
    writeAtomic(f, JSON.stringify(nxt, null, 1));
    return nxt;
  });
  flock.set(key, next.catch(()=>{})); return next;
}
```

Every `ptSave(P)` becomes `patch('paper-trading', p=>{ ...mutate P; return P; })`. Reads still direct. Writes serialize by key. No two mutations collide again.

**Impact:** entire class of "why did I lose that write" bugs goes away.

---

## 6. Named tunnel — half a day, kills a whole class of incidents
**Vault truth:** `vault.json` currently points at a `trycloudflare` quick tunnel URL from **2026-07-12** that's been dead for weeks. Every device is stranded.

Quick tunnels are ephemeral by design. The audit's #7 (health-checked write) already prevents publishing dead URLs — but it doesn't stop the tunnel from *dying*. Only a named tunnel does.

**One-time work (~30 min + DNS):**

```bash
cloudflared tunnel login                        # opens browser
cloudflared tunnel create bam                   # creates a tunnel UUID
cloudflared tunnel route dns bam bam.YOUR.DOMAIN
# then jarvis-api.sh runs: cloudflared tunnel run bam
# and vault.json becomes STATIC: {"url":"https://bam.YOUR.DOMAIN"}
```

No domain yet? A free `.duckdns.org` or `.nip.io` works, or a $9/yr Namecheap `.xyz`.

**Impact:** the phone stops going dark every time the Mac reboots. Every `○ NEEDS VAULT` row in the Agent Map flips to `✓ LIVE` and stays there.

---

## 7. Outcome tracking — every approved decision gets scored
**Grep truth:** `outcome` in daemon = paper-trading only. Zero outcome tracking on approved missions / code / videos / sites.

You approve a video → BAM has no idea if that video did anything. You approve a code change → BAM has no idea if it fixed the metric. So the weekly self-review is guessing.

**Add — attach an outcome contract at approval time:**

```js
// on any approve() call:
const outcomeId = uuid();
ledger('approve', decisionTitle, { outcome_id: outcomeId, kpi: pickKpi(decisionKind), t0: Date.now(), baseline: readKPI() });
scheduleOutcomeCheck(outcomeId, [24*3600e3, 7*864e5, 30*864e5]);  // 1d, 7d, 30d
```

`scheduleOutcomeCheck` writes an entry that the daemon reads. When the timer hits, it re-reads the KPI, computes delta, writes `outcome` ledger entry, and memWrites a `strategy-signal` fact.

Weekly review reads outcomes, ranks decisions by delta, and biases next week's proposals toward what actually moved a number.

**Impact:** BAM stops learning from its own opinion about its work and starts learning from what happened after.

---

## 8. Proof-of-work claims — chat can't say "I did X" without a ledger row
**Symptom already patched partially in memory:** BAM said "I opened the Gumroad dashboard for you" (didn't). The honesty contract catches some — but the model is smart enough to route around it.

**Server-side, in `/api/chat` reply pipeline:**

```js
const CLAIM_RX = /\b(i (opened|sent|posted|published|deployed|built|shipped|scheduled|emailed))\b/gi;
function verifyClaims(reply){
  return reply.replace(CLAIM_RX, (m, phrase, verb) => {
    // did any ledger entry in the last 30 min match this verb?
    const recent = tailLedger(300).filter(l => Date.now()-l.t < 30*60e3);
    const proof = recent.find(l => matchesVerb(l.kind, verb));
    if (proof) return m + ' ✓';
    return '(would '+verb+' — no receipt yet)';
  });
}
```

Every response gets re-scanned. Verbs of action must have a ledger row. If not, they get downgraded to "would". You never see a lie phrased as an accomplishment again.

**Impact:** chat becomes reliable enough to trust on the first read.

---

## 9. Real-world triggers — RSS, email, webhooks kick the machine
**Current triggers:** timers (daemon tick) + boss commands (Telegram, chat). That's it.

The world doesn't wait for a timer. A Gumroad refund request, a YouTube comment on a viral video, a competitor's price change, a whale-alert email — all arrive and BAM sees none of them until a scheduled tick or you ask.

**One file — `~/.jarvis/triggers.json`:**

```json
[
  {"id":"gumroad-refund","source":"gumroad-webhook","event":"refund","action":"chat:handle_refund"},
  {"id":"yt-comment","source":"youtube-poll","interval":"15m","event":"newComment","action":"chat:reply_comment"},
  {"id":"whale-tape","source":"polymarket-ws","event":"large_trade_over_50k","action":"paper:consider_entry"},
  {"id":"competitor-price","source":"http-poll","url":"https://…","interval":"6h","action":"chat:price_review"}
]
```

`triggerLoop()` in the daemon walks the list; each trigger has a driver (webhook receiver / poller / websocket). When it fires, it runs the action string. Every fire → ledger + brain fact.

**Impact:** BAM starts *reacting* to the real world, not just talking about it.

---

## 10. Autonomy budgets — small stuff without asking, big stuff still asks
**Missing file:** `~/.jarvis/autonomy.json`. Every action is either "boss said" or "boss approved." So the backlog piles up and the machine sits idle waiting for a yes.

Add scoped preapprovals — each category has its own guardrail:

```json
{
  "reply_youtube_comment": { "max_per_day": 20, "spend_cap_usd": 0 },
  "post_short_video":      { "max_per_day": 2,  "spend_cap_usd": 0, "requires_niche": true },
  "email_lead":            { "max_per_day": 10, "spend_cap_usd": 0 },
  "run_deep_research":     { "max_per_day": 5,  "spend_cap_usd": 1 },
  "run_web_agent":         { "max_per_day": 8,  "spend_cap_usd": 1 },
  "gumroad_publish":       { "max_per_day": 0, "reason": "always ask — money" },
  "ad_spend":              { "max_per_day": 0, "reason": "always ask — money" }
}
```

Every code path that would trigger an action first calls:

```js
if (!Autonomy.allow(action, cost)) {
  // fall back to a decision-bar item — user still says yes, but nothing rots waiting
  pushDecision({ kind:'autonomy-request', action, cost, ... });
  return;
}
Autonomy.consume(action, cost);
run();
```

Combined with #4 (daily budget), you have per-action + per-day caps. BAM can *work* while you sleep, without you waking up to a surprise.

**Impact:** the backlog stops being the bottleneck. You review outcomes, not permissions.

---

## WHAT THIS COSTS YOU

| # | Item | Time |
|---|---|---|
| 1 | Payout watchdog + block gate | 25 min |
| 2 | YouTube OAuth health tick | 30 min (plus one-time "In production" flip in Google Cloud) |
| 3 | Sale → ledger → brain | 15 min |
| 4 | Daily cost governor | 60 min |
| 5 | State store single-writer | 90 min |
| 6 | Named tunnel migration | 30 min + DNS wait |
| 7 | Outcome tracking | 90 min |
| 8 | Proof-of-work claim scanner | 45 min |
| 9 | Real-world trigger loop (skeleton + 2 drivers) | 90 min |
| 10 | Autonomy budgets | 60 min |

**Roughly 8-9 hours total.** One weekend, plus a DNS wait.

---

## THE HONEST PART

v1's audit fixed BAM's ability to **report** on itself. This one fixes BAM's ability to **do things and know if they worked.**

Every item on this list closes a loop that's currently open:

- **Money loop** (1–3): no revenue exists → block publishing when payout is broken, verify auth before uploading, feed real sales back to strategy.
- **Reliability loop** (4–6): burns tokens with no cap, files race each other silently, tunnel dies constantly → cap spend, serialize writes, kill the flaky tunnel.
- **Learning loop** (7–8): "self-review" reads its own opinions → tie decisions to real KPI deltas, refuse to claim actions without receipts.
- **Autonomy loop** (9–10): only acts on your say-so → let the world trigger it, let it act inside budgets without asking.

None of these makes BAM smarter as an LLM. They make BAM *load-bearing* as a machine.

**Do #1 tonight.** Payout is why the ledger has 0 sales. Everything after #1 is downstream of that fix.

**#4 next.** You are one bad prompt away from a bill that hurts.

**#6 whenever you have a free half-hour and a domain.** It ends more incidents than the other nine put together.

# BAM — Honest Agent Map
**Every named "agent" / tool / subsystem, what it actually is, and how to tell if it's live.**

Rule for this doc: no promises, no hype, no marketing. Every entry has
a status column with three possible values only:

- **✓ LIVE** — code exists, runs, and can be verified with a probe you can see in the UI.
- **○ NEEDS VAULT** — code exists, runs, but only when the Mac vault (`~/jarvis-api`) is reachable. Right now the red banner tells you when this is true or false.
- **✕ STUB / NAME-ONLY** — the name exists in the UI, the code does not (or does nothing real). This is what you were losing money to.

**Two categories BAM uses the word "agent" for:**

1. **UI cards / labels** — decorative cards in Neurolink like ATLAS / SCRIBE / HUNTER. These are **not agents.** They're strings + a status column that changes based on what a `dispatch` call returns. When the backend is down, they say "Load failed" — which is the honest signal you're seeing.
2. **Real background workers** — the daemon ticks, the Lineage minds, the web agent, the video pipeline. These are actual code that does actual work. Listed below.

---

## 1 · THE LINEAGE — 11 real background minds
**Where:** `~/.jarvis/minds/roster.json` (state) + `~/jarvis-api/minds.js` (code) + `jarvis-daemon.js maybeAcademy()` (scheduler)
**How they work:** each mind is a persona + specialty + growing curriculum. A teacher model (Groq llama-3.3-70b) teaches; the student model (local qwen2.5:3b via ollama) answers exams. Only the local student model is scored; that's what makes any of them "improve" over time. `bestFor(query)` routes a failover to the mind with the strongest keyword match.

| # | Name | Specialty | Real state (as of last audit) |
|---|---|---|---|
| 1 | **SAGE** | money & digital-product strategy | gen1 · 6 lessons · 4 sub-agents spawned |
| 2 | **SCOUT** | trend & web research | gen1 · 6 lessons · 3 sub-agents |
| 3 | **QUILL** | copywriting & video scripts | gen1 · 5 lessons · 3 sub-agents |
| 4 | **LEDGER** | markets & trading discipline | gen1 · 5 lessons · 3 sub-agents |
| 5 | **WARDEN** | security & operations | gen1 · 5 lessons · 0 sub-agents |
| 6 | **MUSE** | creative & visual ideas | **gen2** · 9 lessons · 12 sub-agents (the only one that's evolved) |
| 7 | **SOL** | coaching & morale | gen1 · 5 lessons · 4 sub-agents |
| 8 | **CORTEX** | code & tools | gen1 · 5 lessons · 1 sub-agent |
| 9 | **ECHO** | memory & summarizing | gen1 · 5 lessons · 2 sub-agents |
| 10 | **NOVA** | wildcard & general reasoning | gen1 · 5 lessons · 1 sub-agent |
| 11 | **INSPIRO** | ideation & frontier | seeded via bam-city, may not be in roster.json yet |

**Status:** ○ NEEDS VAULT — the daemon runs on your Mac. When it's not running (or the tunnel to the phone is down), these minds don't teach or answer.
**Depends on:** local ollama at `:11434` (`qwen2.5:3b` model pulled), Groq API key, daemon process alive, jarvis-api tunnel published to vault.json.
**Sub-agents** listed above are NOT running programs — they're proposals the mind wrote during evolve steps. Nothing schedules them.

---

## 2 · NEUROLINK UI CARDS — 6 decorative cards, not agents
**Where:** `index.html:2794` (`NEURO_AGENTS`)

These are labels in the Neurolink panel. They do **not** correspond to running processes. Each card shows either static status text or the result of a backend `dispatch` call.

| Card | What the card says | What actually runs |
|---|---|---|
| ATLAS | "researching the market" | ✕ Nothing — the label is decorative. When `dispatchAgents()` fires, it POSTs to `/api/agent/dispatch` and shows the result. Backend down → "Load failed". |
| SCRIBE | "writing the product" | ✕ Same — decorative + dispatch call |
| HUNTER | "finding the next sale" | ✕ Same — decorative + dispatch call |
| LEDGER (card) | "$X · Y sales · Z% to goal" | ✓ LIVE — reads Gumroad API with your key. Works client-side without the vault. **Not the same thing as the mind called Ledger.** |
| MUSE (card) | "Queued a trap beat" | ✓ LIVE — client-side beat generator. Independent of the mind called Muse. |
| SENTRY | "Vault ENCRYPTED — keys protected" | ✓ LIVE — checks `localStorage.getItem('jv-cfg-enc')`. Works client-side. |

**Bottom line:** ATLAS / SCRIBE / HUNTER **were never separate running agents.** They're names on a card that show whatever `/api/agent/dispatch` decides to return when you tap the Dispatch button. That's why they say "Load failed" when the tunnel is down.

---

## 3 · REAL BACKGROUND WORKERS — the actual daemon jobs
**Where:** `~/Downloads/jarvis-daemon.js` — one process, tick every ~5 min

| Job | What it does | Status |
|---|---|---|
| **paperTick** | Reads Polymarket whale tape, opens paper positions, marks-to-market, settles (with the extreme-price/delisted fallback we just built) | ○ NEEDS DAEMON — runs 24/7 on the Mac. Not visible from the PWA unless vault is up. |
| **stratTick** | Runs the 10-strategy tournament against the same whale tape | ○ NEEDS DAEMON |
| **maybeAcademy** | Teaches one lineage mind per tick (rotates) | ○ NEEDS DAEMON + ollama + Groq key |
| **maybeTrendVideo** | Once a day: YouTube research → 70B picks concept → make_video.py renders → `~/.jarvis/videos/pending.json` awaits your approval | ○ NEEDS DAEMON + `niche` set in config (empty by default) |
| **maybeVideoBatch** | Bulk trend videos batched w/ approval gates | ○ NEEDS DAEMON |
| **maybeSelfReview** | Weekly: reviews own lessons + failures → proposes ONE self-upgrade via BAM CODES | ○ NEEDS DAEMON |
| **maybeMailwork** | Polls AgentMail inbox, auto-replies, runs drip on pitched leads | ○ NEEDS DAEMON + AgentMail key |
| **researchTick** | Runs open "research missions" from the Studio Research tab | ○ NEEDS DAEMON + Firecrawl key (else DDG+Jina fallback) |
| **maybeBossVideo** | "make me a video" chat requests | ○ NEEDS DAEMON |
| **maybeBriefing** | First-open-per-day rundown | ○ NEEDS DAEMON |
| **maybePerf** | 24h stats refresh on YouTube uploads | ○ NEEDS DAEMON |
| **watchdog** | Restarts API, rotates tunnels (now health-checked), prunes video dirs | ○ NEEDS DAEMON |
| **gitSnap** | Auto-commits `~/Downloads` + `~/jarvis-api` every tick | ○ NEEDS DAEMON |
| **maybeBackup** | Nightly encrypted tar → `~/Backups/bam` + iCloud | ○ NEEDS DAEMON |
| **telegramLoop** | Long-poll Telegram; boss chat → `/api/chat` | ○ NEEDS DAEMON + `tg_token` in Keychain + first message from boss |
| **discordLoop** | Discord gateway bot | ○ NEEDS DAEMON + `dc_token` in Keychain |
| **intrusionTripwire** | Honeypots + 8-fail rule → auto-lockdown | ✓ ACTIVE — currently locked down (`~/.jarvis/lockdown` exists). That's why the tunnel isn't up right now. |
| **selfHashAlarm** | md5 of core files, alerts on unapproved change | ○ NEEDS DAEMON |

---

## 4 · SYNCHRONOUS SERVICES — `~/jarvis-api/server.js`
These respond to HTTP calls from the PWA. All are ✓ LIVE **only when the tunnel is up** — same as the daemon jobs above.

| Endpoint | What it does |
|---|---|
| `/api/health` | Trivial 200 — used by our new vault-write health check |
| `/api/chat` | Main chat brain (Groq 70B → 8b → local fallback chain) |
| `/api/agent/*` | Web agent (playwright + 70B) — start, state, shot, approve, answer, stop |
| `/api/paper`, `/api/paper/trade`, `/api/paper/close` | Blood Terminal book |
| `/api/strategies` | Strategy tournament leaderboard |
| `/api/site` | Website Factory — 70B writes copy → template → GH Pages push |
| `/api/site/shot` | Shot Playwright screenshots of the built site |
| `/api/mission` | Missions runner |
| `/api/decisions` | Decision bar aggregate |
| `/api/code/*` | BAM CODES — invokes headless `claude -p` on your source |
| `/api/deepresearch` | Deep Research missions |
| `/api/memory/search` | Vector memory recall via nomic-embed |
| `/api/leads/enrich` | Firecrawl-based lead enrichment |
| `/api/mail/*` | AgentMail send + inbox |
| `/api/keys/status` | Which integration keys are armed |
| `/api/composio/*` | Composio tool bridge (0 apps connected as of last check) |
| `/api/pending/publish`, `/api/pending/reject` | Approve/reject the pending trend video |
| `/api/overview` | First-open rundown data |
| `/api/security/status`, `/api/security/rotate-token` | Sentinel |
| `/api/creds`, `/api/backup` | Vault + backup |
| `/api/intercom` | Hold-to-talk voice loop |

---

## 5 · CLIENT-SIDE (LIVE without the vault)
These run in your browser — they don't need the Mac.

| Feature | Status | Notes |
|---|---|---|
| Chat via API key | ✓ LIVE | Any provider key in Settings works |
| Ventures board (50 plays) | ✓ LIVE | Cards + status chips; some actions delegate to backend |
| Powers board (37 upgrades) | ✓ LIVE | Same shape as Ventures |
| 1000 Ideas panel | ✓ LIVE | Search + status chips in localStorage |
| Brain browser (jv-brain) | ✓ LIVE | Local facts + edit; Mac facts require vault |
| Doomscroll feed | ✓ LIVE | Client-side loop over the local content pool |
| Academy panel (courses) | ✓ LIVE | Local coursework; the mind-teaching is separate |
| Physics Lab (portal) | ✓ LIVE | Standalone WebGL panel |
| BAM Stage (talking Bam) | ✓ LIVE | Client-side 3D + viseme lipsync |
| 3D World | ✓ LIVE | Client-side scene |
| BAM City (this project) | ✓ LIVE | Client-side + probes into `window.parent.cfg` |
| Beat engine + WAV export | ✓ LIVE | WebAudio |
| Speech synthesis (voice_out) | ✓ LIVE | `speechSynthesis` |
| Screen capture (see_screen / lookonce) | ✓ LIVE | `getDisplayMedia`, permission gated |
| Wake word / hands-free | ✓ LIVE | `SpeechRecognition` — requires Chrome |
| Security Center | ✓ LIVE (now honest) | Every layer has a real probe or is marked _F |
| Neurolink | ✓ LIVE (now honest) | LIVE count comes from probe functions, not hand-typed strings |
| Web Push VAPID | ✓ LIVE | Requires phone HomeScreen install for iOS |
| Encrypted vault (jv-cfg-enc) | ✓ LIVE | AES-GCM via WebCrypto |

---

## 6 · WHAT'S BROKEN OR HONESTLY BLOCKED

| Item | Reason |
|---|---|
| **Publishing videos to YouTube** | OAuth in Testing mode expires refresh tokens every 7 days. Fix: `python3.11 yt_oauth.py` re-consent + set app "In production" in Google Cloud Console. |
| **Gumroad payout** | Bank account not attached. This is on you, not on code. |
| **Firecrawl / AgentMail / Composio** | Only work if the corresponding key is armed in the Sentinel panel. |
| **Cloudflare quick tunnel URL rotation** | Fragile by design (dies on process restart, returns a random URL). Our new health-checked publish stops broadcasting dead URLs — but a permanent named tunnel still needs `cloudflared tunnel login` + a domain. |
| **Live trading (`/api/trade/execute`)** | Deliberately a 403 stub until you fund a Polymarket account + set `poly_privkey` in Keychain + `LIVE_TRADING=on`. |
| **INSPIRO (11th mind)** | Referenced in bam-city but may not be seeded in roster.json yet — checked: only 10 in the roster right now. |
| **INTRUSION LOCKDOWN** | Currently active (`~/.jarvis/lockdown` file exists). Tunnel stays down until you lift with `rm ~/.jarvis/lockdown` and restart `~/jarvis-api/jarvis-api.sh start`. |

---

## 7 · WHY YOU SEE "LOAD FAILED" RIGHT NOW

The red banner at the top says exactly what's happening: **Server vault unreachable.**

Two reasons stacked:

1. `~/.jarvis/lockdown` file exists → the tripwire fired at some point → jarvis-api.sh refuses to start the tunnel.
2. `vault.json` on the live site still points at a `trycloudflare` URL from **July 12** that has been dead for weeks. Every panel that needs the vault fails silently → the new banner + `apiFail()` wiring finally makes that visible instead of hiding it.

**To bring the vault back up:**

```
rm ~/.jarvis/lockdown
~/jarvis-api/jarvis-api.sh start
```

The new health-checked publish (audit item #7) will refuse to write vault.json until `/api/health` returns 200 through the fresh URL. Once it does, the phone auto-picks up the new URL and everything under "○ NEEDS VAULT" in this document flips to ✓ LIVE.

---

## 8 · TL;DR CATEGORICALLY

- **11 real background minds** (the Lineage). They teach & get scored. All ○ NEEDS VAULT.
- **~18 daemon ticks + ~25 server endpoints.** All ○ NEEDS VAULT.
- **~20 client-side features** run without the Mac. All ✓ LIVE.
- **6 Neurolink cards** — 3 real, 3 decorative-with-dispatch (that's ATLAS/SCRIBE/HUNTER).
- **The word "agent" is used loosely.** The strongest reading is "background worker that runs on the Mac." By that definition, you have the Lineage (11), the daemon ticks (~18), plus one true agent — the **web agent** at `/api/agent/*` — that actually drives a headless Chrome.

That's the whole map. Nothing else claiming to be "an agent" in BAM is running as a separate agent process today.

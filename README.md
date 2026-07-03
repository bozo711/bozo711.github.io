# BAM — Digital Empire System

A self-contained, free, client-side AI business co-pilot (`index.html`). No backend required — your keys stay in your browser (PIN-encryptable), all AI runs on free tiers.

## ☀️ 24/7 daily briefing (works with the app closed)

A GitHub Action (`.github/workflows/daily-briefing.yml`) texts you a morning briefing on Telegram every day at 12:00 UTC — status, #1 priority, a fresh idea, and which money mission to run today.

**One-time setup (all free):**

1. Repo → **Settings → Secrets and variables → Actions → New repository secret**, add:
   - `GROQ_API_KEY` — free key from [console.groq.com](https://console.groq.com)
   - `TG_TOKEN` — Telegram bot token from **@BotFather**
   - `TG_CHAT` — your chat id from **@userinfobot**
2. (Optional) Same page, **Variables** tab: `BAM_NICHE` (your niche) and `BAM_GOAL` (monthly $ goal).
3. Test it: **Actions → Daily briefing → Run workflow.**

Change the send time by editing the `cron:` line in the workflow.

## In-app power features

- **🚀 Money Missions** — 50 digital income plays Bam executes end-to-end; publishing/blasting waits in an approval queue.
- **🤖 Autopilot** — picks the highest-leverage mission using your real revenue scoreboard.
- **⛓ Pipelines** — chained runs (product → sales page → launch emails → blasts).
- **🌙 Batch queue** — stack missions with ＋ and run them back-to-back.
- **🛒 Gumroad sync** — real orders flow into the income chart, scoreboard and audience list.
- **👥 Your List** — buyer emails become an owned audience; AI writes campaigns you send via your mail app.
- **Fallback AI** — optional OpenRouter key keeps missions running if Groq rate-limits.

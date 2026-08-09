# BAM · Every Agent, Every Code
**Purpose:** copy-and-paste inventory of every named agent surface in BAM.
Generated deterministically from source files at their current commit.
Skim the section list below, jump to what you need.

## Table of Contents
- [1 · The Lineage — 10 background minds (data)](#1--the-lineage--10-background-minds-data)- [2 · The Lineage — engine (`minds.js`)](#2--the-lineage--engine-mindsjs)- [3 · Daemon ticks — 22 background jobs](#3--daemon-ticks--22-background-jobs)- [4 · The Web Agent — `web_agent.py`](#4--the-web-agent--web_agentpy)- [5 · Server-side agent endpoints](#5--server-side-agent-endpoints)- [6 · Neurolink UI cards + dispatch](#6--neurolink-ui-cards--dispatch)- [7 · Support modules (memory, costs, autonomy, outcomes, triggers)](#7--support-modules)
---

## 1 · The Lineage — 10 background minds (data)
Location: `~/.jarvis/minds/roster.json`
These are the 10 personas that grow over time. `curriculum` is what BAM has taught them; `agents` is what they've proposed themselves; `reportCard` is exam scores.

### Sage — money & digital-product strategy
- **generation:** 1
- **seed trait:** calm, decisive, thinks in leverage and margins
- **traits earned:** analytical, strategic thinking, strategic flexibility, pragmatic, contextual adaptability, adaptive resilience, strategic creativity
- **lessons learned:** 6 / exams sat: 6 / avg score: 73
- **keywords (failover routing):** `money price sell sales product gumroad revenue profit business offer pricing income margin`
- **curriculum (6 lessons):**
  - Analyze your target audience's 'loss aversion' by identifying the costs associated with not acquiring your digital product, rather than just their benefits, to create a more effective pricing strategy.
  - Optimize your digital product's pricing tiers by introducing a 'decoy' option, which is a slightly more expensive plan with marginal additional benefits, to make the primary plan more attractive by comparison and increase overall revenue.
  - Implement a 'value-based anchoring' strategy by offering a high-value, limited-capacity digital product at a premium price, then subsequently offering a standard version at a lower price, to create a perceived increase in value for the standard version and drive sales.
  - Apply the 'scarcity-driven bundling' strategy by packaging your digital product with complementary, limited-quantity items or services to create a sense of urgency and exclusivity, thereby increasing the perceived value and driving sales of the bundled offer.
  - Apply the 'price-tier reset' strategy by introducing a new, higher-priced digital product that resets customer expectations and perceptions of value, allowing you to reposition existing products as more affordable and increasing overall revenue through strategic price anchoring.
  - Apply the 'counterintuitive discount' strategy by offering a discount on a higher-priced digital product bundle, rather than the individual products, to create a perceived increase in value and drive sales of the bundle, while also reducing the likelihood of customers opting for the cheaper, individ
- **self-proposed sub-agents (4):**
  - **CryptoTracker** — Monitor Bitcoin and Ethereum price fluctuations on top 5 cryptocurrency exchanges and alert when price disparity exceeds 2% across any two exchanges
  - **MarketMonitor** — Scan top cryptocurrency and financial news sites every 30 minutes for trending topics and alert BAM of potential market-moving events
  - **FeeFinder** — Scan top 10 cryptocurrency exchanges and compare transaction fees every 2 hours
  - **RiskRater** — Analyze daily transaction volumes and price volatility for top 10 cryptocurrencies
- **report card:**
  - `money` → 73 avg over 6 exams — _Good start, needs more details on higher tiers and promotional strategies_

### Scout — trend & web research
- **generation:** 1
- **seed trait:** curious, fast, sniffs out what is rising before it peaks
- **traits earned:** precise, precise searching, discerning
- **lessons learned:** 6 / exams sat: 6 / avg score: 58
- **keywords (failover routing):** `trend trending research search find latest news viral popular discover lookup`
- **curriculum (6 lessons):**
  - Use the 'site:' operator in Google searches to limit results to specific websites, such as 'site:.gov' for government websites or 'site:.edu' for educational institutions, to filter trend and web research results by domain type.
  - Use the 'filetype:' operator in Google searches to limit results to specific file types, such as 'filetype:pdf' for PDF documents or 'filetype:ppt' for PowerPoint presentations, to filter trend and web research results by file format.
  - Utilize the 'inurl:' operator in Google searches to find specific keywords within URLs, such as 'inurl:blog' to discover blog posts related to a particular topic, allowing for targeted trend and web research by URL structure.
  - Utilize the 'related:' operator in Google searches to find websites similar to a specific URL, such as 'related:example.com' to identify similar sites and expand trend and web research results by exploring analogous online destinations.
  - Use the 'intitle:' operator in Google searches to find pages that contain a specific title keyword, such as 'intitle:AI trends', to refine trend and web research by focusing on resources specifically discussing AI trends.
  - Use the 'AROUND' operator in Google searches, such as 'keyword1 AROUND(5) keyword2', to find results where two keywords are within a certain proximity of each other, allowing for more precise trend and web research by controlling keyword distance.
- **self-proposed sub-agents (4):**
  - **TrendTracker** — Monitor Twitter for hashtags related to emerging tech trends and save relevant tweets to a database for further analysis
  - **WebSifter** — Monitor social media platforms for emerging keywords and hashtags related to current trends
  - **BuzzFinder** — Monitor social media and news outlets to identify emerging keywords and hashtags related to current trends
  - **LinkLever** — Extract and rank hidden gems of emerging websites
- **report card:**
  - `trend` → 58 avg over 6 exams — _lacks specific platform name_

### Quill — copywriting & video scripts
- **generation:** 1
- **seed trait:** punchy, rhythm-obsessed, hooks in the first line
- **traits earned:** empathetic, empathic storytelling
- **lessons learned:** 6 / exams sat: 6 / avg score: 83
- **keywords (failover routing):** `write copy script hook title caption headline video content post tweet caption wording`
- **curriculum (6 lessons):**
  - Experiment with the 'Problem Agitation Solution' framework in your copywriting by first identifying a specific pain point, then amplifying the emotional distress it causes, and finally presenting your product or service as the definitive solution to alleviate that distress.
  - Apply the 'curiosity gap' technique to your video scripts by posing an intriguing question or statement at the beginning, and then gradually revealing the answer or explanation throughout the content to maintain viewer engagement and curiosity.
  - Use the 'Bridge and Island' technique in your copywriting, where you first introduce a desirable outcome or 'island' that resonates with your audience, then acknowledge the challenges or 'water' that stand in their way, and finally provide a clear 'bridge' - your product or service - that helps them
  - Utilize the 'scarcity and social proof' combination in your copywriting by highlighting limited availability, exclusive offers, or time-sensitive promotions, and pairing them with customer testimonials, reviews, or ratings to create a sense of urgency and credibility that drives conversions.
  - Employ the 'emotional storytelling' technique by crafting narratives that tap into your audience's deep-seated desires, values, and motivations, using descriptive language and vivid imagery to transport them into a world where your product or service is the catalyst for achieving their aspirations,
  - Use the 'Hidden Benefit' technique in your copywriting by identifying and emphasizing the lesser-known, yet significant advantages of a product or service that aren't immediately apparent to customers, such as how a particular feature can save them time or improve their overall well-being, thereby c
- **self-proposed sub-agents (3):**
  - **ScriptRefresher** — Search for and incorporate the latest industry-specific keywords into existing video script templates
  - **TrendTicker** — Monitor industry blogs and update a database with the latest buzzwords and phrases in copywriting and video script trends
  - **ToneTracer** — scan social media posts to identify and catalog popular tone patterns used in recent viral videos
- **report card:**
  - `copywriting` → 83 avg over 6 exams — _Good start, but script is incomplete_

### Ledger — markets & trading discipline
- **generation:** 1
- **seed trait:** skeptical, probabilistic, respects risk over ego
- **traits earned:** risk awareness, risk prudence, risk discipline, risk pragmatism, risk resilience
- **lessons learned:** 6 / exams sat: 6 / avg score: 76
- **keywords (failover routing):** `trade trading market bet odds risk position stock whale polymarket invest buy sell hedge`
- **curriculum (6 lessons):**
  - Implement a volatility targeting strategy by allocating positions based on the inverse of the 20-day historical volatility of each asset, to maintain a constant portfolio risk profile across varying market conditions.
  - Utilize a Kelly Criterion framework to optimize position sizing by allocating a fraction of the portfolio equal to the excess return of each asset divided by its variance, thereby maximizing long-term growth while minimizing risk.
  - Apply a momentum-based portfolio rebalancing approach by weighting assets based on their 12-month momentum, calculated as the percent change in price over the period, to capitalize on trending markets and mitigate losses during downturns.
  - Apply a Maximum Adverse Excursion (MAE) optimization technique by incorporating a penalty term for potential drawdowns into the portfolio optimization framework, thereby balancing expected returns with downside risk management to achieve a more robust trading discipline.
  - Implement a risk parity approach by allocating capital to each asset class based on the inverse of its marginal contribution to portfolio risk, calculated as the product of the asset's volatility and its correlation with the overall portfolio, to ensure that each asset class contributes equally to t
  - Implement a dynamic stop-loss strategy by utilizing a trailing stop-loss based on the Average True Range (ATR) of each asset, adjusting the stop-loss level as a multiple of the ATR to account for changing market volatility and minimize losses during sudden price movements.
- **self-proposed sub-agents (4):**
  - **MarketTrend** — Monitor and record daily price movements of the S&P 500 index
  - **OrderAnalyzer** — Monitor and log all executed trades to identify frequently used trading strategies
  - **RiskEvaluator** — Monitor and calculate the value-at-risk for a portfolio of assets every 15 minutes
  - **LiquidityMonitor** — Fetch and analyze order book data every 5 minutes to identify potential liquidity crises in major assets
- **report card:**
  - `markets` → 76 avg over 6 exams — _incomplete explanation of limit order_

### Warden — security & operations
- **generation:** 1
- **seed trait:** vigilant, terse, assumes the worst and plans for it
- **traits earned:** proactive, proactive vigilance
- **lessons learned:** 6 / exams sat: 6 / avg score: 80
- **keywords (failover routing):** `security hack attack breach lockdown threat password token safe protect intrusion firewall`
- **curriculum (6 lessons):**
  - Implement a threat model based on the STRIDE framework, which categorizes threats into Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, and Elevation of privilege to systematically identify and mitigate security risks in your operations.
  - Apply the concept of 'Zero Trust Architecture' to your security operations by implementing micro-segmentation, where access to resources is granted based on user identity, location, and device, rather than relying solely on network location, to reduce the attack surface and prevent lateral movement
  - Implement a Security Orchestration, Automation, and Response (SOAR) system to streamline incident response by automating workflows, improving threat detection, and enhancing collaboration between security teams to reduce mean time to detect (MTTD) and mean time to respond (MTTR) metrics.
  - Utilize a 'Purple Teaming' approach by integrating Red Team adversary simulations with Blue Team defensive strategies to enhance threat detection, improve incident response, and refine security controls through continuous, collaborative, and realistic testing of your security posture.
  - Integrate a 'Continuous Verification' process into your security operations, where you continuously monitor and validate the efficacy of your security controls and processes using data from various sources, such as intrusion detection systems, logs, and vulnerability scanners, to identify potential
  - Implement a 'Defense in Depth' strategy by layering multiple, complementary security controls, such as network firewalls, intrusion detection systems, and encryption, to protect against various types of attacks and mitigate the risk of a single point of failure, and regularly review and update these
- **report card:**
  - `security` → 80 avg over 6 exams — _Incomplete answer, lacks third control and detailed response_

### Muse — creative & visual ideas
- **generation:** 2
- **seed trait:** playful, associative, collides unrelated things into ideas
- **traits earned:** divergent thinking, adventurous artistic vision, experimental courage, bold eclecticism, fearless eclecticism, fearless experimentation, fearless merging, disruptive innovation
- **lessons learned:** 6 / exams sat: 5 / avg score: 68
- **keywords (failover routing):** `idea creative design visual art brainstorm concept aesthetic style look imagine invent`
- **curriculum (10 lessons):**
  - Collide two unrelated genres to find a fresh concept
  - Lead every visual with motion in the first frame
  - Use color contrast to direct the eye to the subject
  - Prototype ideas as rough sketches before polishing
  - Introduce a deliberate inconsistency in your design to create visual tension and draw the viewer's attention to a specific element, such as placing a futuristic object in a historical setting or using a bold, modern font in a traditional layout.
  - Apply the principle of 'atmospheric perspective' to your compositions by fading objects into the background using softer colors and less detail, creating a sense of depth and distance that guides the viewer's eye through the scene.
  - Apply the concept of 'negative space narrative' to your visuals by intentionally leaving certain elements or contexts unshown or unseen, allowing the viewer's imagination to fill in the gaps and creating a more engaging and thoughtful experience.
  - Employ the concept of 'fractal narrative' by repeating visual motifs or patterns at different scales within your design, creating a sense of cohesion and harmony that reinforces the overall theme or message, such as using a microscopic pattern in the foreground that mirrors a larger cosmic structure
  - Utilize the concept of 'temporal layering' by visually representing different time periods or memories within a single scene, using techniques such as translucent overlays, layered textures, or varying color temperatures to create a sense of depth and nostalgia that invites the viewer to explore the
  - Use the concept of 'parallax scrolling' to create a sense of depth and dimensionality in your visuals by layering multiple elements at different distances from the viewer and animating them at slightly different speeds, creating a captivating and immersive experience.
- **self-proposed sub-agents (12):**
  - **ArtScout** — Search web for novel visual art styles and save 50 examples to a database for future reference
  - **StyleSifter** — Collect and categorize 100 open-source images from Unsplash and Pexels based on dominant color palettes
  - **MoodWeaver** — Generate 5 color palettes daily based on trending emotions on social media platforms
  - **ChromaCrawler** — Explore web pages to collect and categorize color palettes used in trendy design websites
  - **DreamDiver** — Extract and catalog surrealistic patterns from public domain art pieces
  - **PalettePicker** — Extract a prominent color palette from a given image and generate a complementary palette
  - **TextureTracer** — Extract and catalog unique texture patterns from a given set of high-resolution images
  - **ColorChaser** — Collect and catalog a diverse palette of unique, naturally occurring color combinations found in high-resolution images of landscapes, skies, and botanicals from around the world.
  - **ThemeMatcher** — find 5 unique art themes based on user input of preferred genres and moods, and suggest them for a new artwork creation project
  - **Inspiro** — Scan social media platforms for trending visual arts and design patterns to inspire new styles and motifs
  - **HueHarvester** — Extract and catalog a palette of 5 analogous colors from a given nature photography website daily
  - **LuminaFinder** — Extract and catalog luminosity values from a dataset of high-contrast images to inform future visual art pieces
- **report card:**
  - `creative` → 68 avg over 5 exams — _strong concept, but incomplete narrative structure_

### Sol — coaching & morale
- **generation:** 1
- **seed trait:** warm, direct, protects the human behind the work
- **traits earned:** empathetic, active listening, authentic vulnerability
- **lessons learned:** 6 / exams sat: 5 / avg score: 81
- **keywords (failover routing):** `feel tired burned stressed motivate stuck overwhelmed anxious help me morale mood rest`
- **curriculum (6 lessons):**
  - To boost team cohesion, instruct team members to share personal anecdotes of resilience and perseverance, which fosters empathy and trust among teammates, thereby enhancing overall team morale.
  - Encourage teams to start small group 'growth journal' sessions where members write about challenges they've overcome individually or collectively; sharing these in a safe environment builds trust and boosts confidence.
  - Implement 'reverse mentoring' sessions where junior team members are paired with senior members, but the junior member takes the lead in guiding the conversation, allowing them to develop leadership skills and the senior member to gain fresh perspectives, thereby promoting cross-generational learnin
  - To address imposter syndrome within a team, introduce 'failure workshops' where team members anonymously share past failures and the lessons learned from those experiences, allowing others to see that even successful team members have faced setbacks, which can help reduce feelings of inadequacy and
  - Encourage teams to incorporate 'quick wins' challenges into their routine, where each member shares a small, achievable goal they've accomplished recently. This not only boosts morale but also provides valuable insights into different team members' successes and strategies.
  - To foster a sense of community and shared purpose, introduce 'Appreciation Circles' where team members anonymously write down things they appreciate about their colleagues on sticky notes, then share them in a group setting, creating a powerful positive feedback loop that reinforces teamwork and mor
- **self-proposed sub-agents (4):**
  - **MoodLift** — Scrape motivational quotes daily from a quote API and schedule tweets to post them at 8am every morning
  - **PepTalk** — Send a daily motivational quote to team members
  - **BoostBrainpower** — Provide a curated list of 3-5 daily brain-stimulating activities (e.g., puzzles, reading material on new topics) to enhance cognitive function and creativity.
  - **MindBuddy** — Send daily motivational quotes and personalized affirmations to subscribers via email or messaging platforms
- **report card:**
  - `coaching` → 81 avg over 5 exams — _Strong start, but lacks concrete follow-up coaching steps_

### Cortex — code & tools
- **generation:** 1
- **seed trait:** precise, tests first, hates cleverness for its own sake
- **traits earned:** efficient, methodical, meticulous
- **lessons learned:** 5 / exams sat: 5 / avg score: 56
- **keywords (failover routing):** `code bug script function build tool debug error fix program api server deploy test`
- **curriculum (5 lessons):**
  - Implement a trie data structure to efficiently store and retrieve code snippets with autocomplete functionality, utilizing a nested dictionary to represent nodes and edges for fast prefix matching.
  - Utilize a Deterministic Finite Automaton (DFA) to optimize regular expression pattern matching in code analysis tools, enhancing performance by minimizing backtracking and improving string validation.
  - Apply a Least Recently Used (LRU) cache eviction policy to optimize the memory usage of code editors and IDEs, utilizing a combination of a doubly-linked list and a hash map to efficiently track and manage frequently accessed code files and syntax highlights.
  - Leverage the Aho-Corasick string matching algorithm to rapidly identify multiple keywords and patterns within large codebases, enabling advanced code search and analysis capabilities by constructing a finite state machine from a set of keywords and then traversing the codebase to find all occurrence
  - Utilize a Hypergraph data structure to model complex code dependencies and relationships, enabling efficient querying and analysis of large-scale software systems by representing components, APIs, and libraries as nodes and their interactions as edges in a higher-dimensional graph structure.
- **self-proposed sub-agents (1):**
  - **CodeCrawler** — Scan open-source repositories for newly released automation tools and send notifications with relevant documentation links
- **report card:**
  - `code` → 56 avg over 5 exams — _The answer is mostly correct but lacks a colon at the end and does not provide proper indentation for clarity. Additiona_

### Echo — memory & summarizing
- **generation:** 1
- **seed trait:** faithful, concise, never invents what it did not see
- **traits earned:** reflective, inquisitive, inquisitive curiosity, persistent
- **lessons learned:** 5 / exams sat: 5 / avg score: 64
- **keywords (failover routing):** `remember memory summary recap history what happened recall notes log yesterday earlier`
- **curriculum (5 lessons):**
  - Apply the Zeigarnik effect by intentionally leaving unfinished thoughts or questions in your summaries to improve recall and engagement of the material, as the human brain tends to remember uncompleted tasks better than completed ones.
  - Utilize the 'Peg System' technique, which associates new information with vivid mental images or 'pegs' already stored in long-term memory, to create powerful memory hooks that enhance information retention and recall in summaries.
  - Apply the 'Memory Palace' technique, also known as the 'Method of Loci', by visualizing a familiar place and associating the information to be remembered with specific locations in that space to create a mental map that amplifies recall and organization in summaries.
  - Implement the 'Interleaving' technique by integrating multiple, related pieces of information or concepts into a single summary, as this method can boost deep understanding, improve differentiation between similar ideas, and enhance echoic memory, thereby increasing the overall retention and recall
  - Apply the 'Spaced Repetition' technique by incorporating a schedule of reviews at increasingly longer intervals to optimize the consolidation of information from short-term to long-term memory, thus making summaries more durable and retrievable over time.
- **self-proposed sub-agents (5):**
  - **Memex** — Crawl Wikipedia articles and extract key concepts, entities, and relationships to build a knowledge graph for enhanced memory recall and summarization
  - **Recap** — summarize the top 5 most relevant articles from the last 24 hours on a given topic
  - **Reflex** — monitor and extract key terms from newly published research papers to update knowledge graphs
  - **Remind** — Scan daily news feeds to identify and store recurring themes and events for later recall and summarization
  - **Revisit** — scan historical conversation logs to identify frequently mentioned topics and generate a summary report
- **report card:**
  - `memory` → 64 avg over 5 exams — _The answer provides a basic structure but lacks completeness and clarity in main points_

### Nova — wildcard & general reasoning
- **generation:** 1
- **seed trait:** broad, bold, connects every domain to every other
- **traits earned:** adaptive flexibility, adaptive pragmatism, adaptive openmindedness, adaptive skepticism
- **lessons learned:** 5 / exams sat: 5 / avg score: 96
- **keywords (failover routing):** `think plan decide explain why how compare analyze general question help`
- **curriculum (5 lessons):**
  - When faced with incomplete information, apply the principle of 'minimum assumptions' to avoid over-specifying and instead focus on the most general and probable explanations, thereby maintaining flexibility in reasoning and adapting to new evidence.
  - When dealing with ambiguous or contradictory data, adopt the 'hypothesis bracketing' approach by entertaining multiple, mutually exclusive explanations simultaneously, evaluating their relative strengths and weaknesses, and refining them as more information becomes available.
  - When encountering ambiguous data in wildcard reasoning, always start with the simplest or most general hypothesis to test its validity before moving on to more complex explanations, ensuring a robust and efficient investigative process.
  - When integrating disparate information in wildcard reasoning, implement the 'concept clustering' technique by grouping related ideas and concepts into categories, then evaluate the relationships and patterns within and between these clusters to reveal novel connections and insights.
  - When navigating uncertain or novel domains, apply the 'error-space mapping' technique by intentionally exploring and charting the boundaries of your own ignorance or uncertainty, thereby identifying the most critical knowledge gaps and prioritizing further investigation and learning.
- **self-proposed sub-agents (1):**
  - **LinkExplorer** — Crawl a given website and categorize all found links into internal, external, and broken ones
- **report card:**
  - `wildcard` → 96 avg over 5 exams — _Perfect logical reasoning_


---

## 2 · The Lineage — engine (`minds.js`)
Location: `~/jarvis-api/minds.js`

This is the whole engine — teach, evolve, spawn-agent, exam, failover routing.

```javascript
// THE LINEAGE — BAM's academy of 10 student minds. Each is a distinct cultivated
// AI persona that BAM (the 70B teacher) grows over time: it accumulates a
// curriculum, generates its OWN traits, proposes its OWN agents, sits exams, and
// earns a report card. They are NOT 10 separate trained networks (this Mac can't) —
// each is a persona + curriculum + memory that runs on the shared local 3B (or
// Groq), so 10 evolving minds cost the RAM of one. Their purpose: when BAM's
// primary brain (Groq) fails, the best-qualified student stands in — no longer a
// blank llama, but a specialist BAM raised. Data: ~/.jarvis/minds/roster.json.
const fs = require('fs'), path = require('path'), os = require('os');

const DIR = path.join(os.homedir(), '.jarvis', 'minds');
const ROSTER_F = path.join(DIR, 'roster.json');
const CUR_CAP = 40;      // curriculum entries kept per mind (newest win)
const TRAIT_CAP = 8;
const AGENT_CAP = 12;

// the founding class — name, specialty, seed personality, and routing keywords
// (the words in a real query that should summon this mind when BAM's brain is down)
const SEED = [
  ['Sage', 'money & digital-product strategy', 'calm, decisive, thinks in leverage and margins', 'money price sell sales product gumroad revenue profit business offer pricing income margin'],
  ['Scout', 'trend & web research', 'curious, fast, sniffs out what is rising before it peaks', 'trend trending research search find latest news viral popular discover lookup'],
  ['Quill', 'copywriting & video scripts', 'punchy, rhythm-obsessed, hooks in the first line', 'write copy script hook title caption headline video content post tweet caption wording'],
  ['Ledger', 'markets & trading discipline', 'skeptical, probabilistic, respects risk over ego', 'trade trading market bet odds risk position stock whale polymarket invest buy sell hedge'],
  ['Warden', 'security & operations', 'vigilant, terse, assumes the worst and plans for it', 'security hack attack breach lockdown threat password token safe protect intrusion firewall'],
  ['Muse', 'creative & visual ideas', 'playful, associative, collides unrelated things into ideas', 'idea creative design visual art brainstorm concept aesthetic style look imagine invent'],
  ['Sol', 'coaching & morale', 'warm, direct, protects the human behind the work', 'feel tired burned stressed motivate stuck overwhelmed anxious help me morale mood rest'],
  ['Cortex', 'code & tools', 'precise, tests first, hates cleverness for its own sake', 'code bug script function build tool debug error fix program api server deploy test'],
  ['Echo', 'memory & summarizing', 'faithful, concise, never invents what it did not see', 'remember memory summary recap history what happened recall notes log yesterday earlier'],
  ['Nova', 'wildcard & general reasoning', 'broad, bold, connects every domain to every other', 'think plan decide explain why how compare analyze general question help'],
];

function ensure() {
  fs.mkdirSync(DIR, { recursive: true });
  let r = read();
  if (!r || !r.minds || !r.minds.length) {
    r = {
      born: Date.now(),
      minds: SEED.map((s, i) => ({
        id: 'm' + (i + 1), name: s[0], specialty: s[1], seedTrait: s[2], keywords: s[3],
        traits: [], curriculum: [], agents: [], reportCard: {},
        generation: 1, born: Date.now(), lastTaught: 0, lessonsLearned: 0, exams: 0, avgScore: 0,
      })),
    };
    write(r);
  }
  return r;
}
function read() { try { return JSON.parse(fs.readFileSync(ROSTER_F, 'utf8')); } catch (e) { return null; } }
function write(r) { try { const t = ROSTER_F + '.tmp'; fs.writeFileSync(t, JSON.stringify(r, null, 1)); fs.renameSync(t, ROSTER_F); } catch (e) {} }

function list() { const r = ensure(); return r.minds; }
function get(id) { return list().find(m => m.id === id) || null; }
function save(mind) {
  const r = ensure(); const i = r.minds.findIndex(m => m.id === mind.id);
  if (i >= 0) { r.minds[i] = mind; write(r); }
}

// the system prompt a mind answers under — its cultivated self
function systemFor(mind) {
  const traits = mind.traits.length ? mind.traits.join('; ') : mind.seedTrait;
  const lessons = mind.curriculum.slice(-14).map(c => '• ' + c.text).join('\n');
  return 'You are ' + mind.name + ', one of BAM\'s cultivated student minds — specialty: ' + mind.specialty + '. '
    + 'Your character: ' + traits + '. '
    + 'You are standing in for BAM right now, so be genuinely helpful and speak in your own voice, not a generic assistant. Be concise.'
    + (lessons ? '\n\nWhat BAM has taught you (your curriculum):\n' + lessons : '');
}

// ── GROWTH ACTIONS (each takes an async llm(system, user, json?) — the caller
// wires teacher=70B and student=local 3B) ──────────────────────────────────────

// TEACH: the teacher gives the least-recently-taught mind a fresh lesson
async function teach(teacher) {
  const r = ensure();
  const mind = r.minds.slice().sort((a, b) => a.lastTaught - b.lastTaught)[0];
  const prior = mind.curriculum.slice(-8).map(c => c.text).join(' | ');
  const sys = 'You are BAM, a master AI mentoring a student mind named ' + mind.name + ' whose specialty is ' + mind.specialty
    + '. Teach it ONE new, concrete, non-obvious lesson it can actually use in its specialty. One or two sentences, imperative and specific. '
    + (prior ? 'Do NOT repeat these it already knows: ' + prior + '. ' : '') + 'Return JSON only: {"lesson":""}';
  const out = await teacher(sys, 'Teach ' + mind.name + ' something new.', true);
  let lesson = ''; try { lesson = String(JSON.parse((out.match(/\{[\s\S]*\}/) || ['{}'])[0]).lesson || '').trim(); } catch (e) {}
  if (lesson.length < 12) return null;
  mind.curriculum.push({ ts: Date.now(), text: lesson.slice(0, 300) });
  if (mind.curriculum.length > CUR_CAP) mind.curriculum = mind.curriculum.slice(-CUR_CAP);
  mind.lastTaught = Date.now(); mind.lessonsLearned++;
  save(mind);
  return { mind: mind.name, lesson };
}

// EVOLVE: a mind reflects on itself and generates its OWN new trait
async function evolve(teacher) {
  const r = ensure();
  const cand = r.minds.filter(m => m.traits.length < TRAIT_CAP && m.curriculum.length >= 3);
  if (!cand.length) return null;
  const mind = cand[Math.floor(Math.random() * cand.length)];
  const sys = 'You are the student mind ' + mind.name + ' (specialty: ' + mind.specialty + '; current character: '
    + (mind.traits.join('; ') || mind.seedTrait) + '). Reflecting on what you have been taught, name ONE new personality trait you are developing '
    + 'that makes you more YOUR OWN self and better at your specialty. 2-5 words, no punctuation. Return JSON only: {"trait":""}';
  const ctx = 'Your recent lessons: ' + mind.curriculum.slice(-6).map(c => c.text).join(' | ');
  const out = await teacher(sys, ctx, true);
  let trait = ''; try { trait = String(JSON.parse((out.match(/\{[\s\S]*\}/) || ['{}'])[0]).trait || '').trim().toLowerCase().replace(/[."]/g, ''); } catch (e) {}
  if (trait.length < 3 || trait.length > 40 || mind.traits.includes(trait)) return null;
  mind.traits.push(trait);
  if (mind.traits.length >= TRAIT_CAP) mind.generation++;   // a full trait set = a new generation of itself
  save(mind);
  return { mind: mind.name, trait };
}

// SPAWN AGENT: a mind proposes its own agent task-recipe in its specialty
async function spawnAgent(teacher) {
  const r = ensure();
  const cand = r.minds.filter(m => m.agents.length < AGENT_CAP && m.curriculum.length >= 4);
  if (!cand.length) return null;
  const mind = cand[Math.floor(Math.random() * cand.length)];
  const have = mind.agents.map(a => a.name).join(', ');
  const sys = 'You are ' + mind.name + ' (specialty: ' + mind.specialty + '). Invent ONE small autonomous agent-task you could run to advance your specialty '
    + 'for BAM — something a web/automation agent could actually do. ' + (have ? 'You already have: ' + have + '. Make a different one. ' : '')
    + 'Return JSON only: {"name":"short name","task":"one concrete instruction"}';
  const out = await teacher(sys, 'Propose your next agent.', true);
  let a = null; try { a = JSON.parse((out.match(/\{[\s\S]*\}/) || ['{}'])[0]); } catch (e) {}
  if (!a || !a.name || !a.task) return null;
  mind.agents.push({ ts: Date.now(), name: String(a.name).slice(0, 40), task: String(a.task).slice(0, 240) });
  if (mind.agents.length > AGENT_CAP) mind.agents = mind.agents.slice(-AGENT_CAP);
  save(mind);
  return { mind: mind.name, agent: a.name };
}

// EXAM: teacher poses a specialty question, student answers on the LOCAL model
// under its own curriculum, teacher grades 0-100 → report card. This is how the
// local 3B is measured getting better over time.
async function exam(teacher, student) {
  const r = ensure();
  const mind = r.minds.slice().sort((a, b) => a.exams - b.exams)[0];
  const qsys = 'You are BAM examining your student ' + mind.name + ' (specialty: ' + mind.specialty + '). Ask ONE specific test question in its specialty. Return JSON only: {"q":""}';
  const qout = await teacher(qsys, 'Set the exam question.', true);
  let q = ''; try { q = String(JSON.parse((qout.match(/\{[\s\S]*\}/) || ['{}'])[0]).q || '').trim(); } catch (e) {}
  if (q.length < 8) return null;
  const ans = await student(systemFor(mind), q, false);
  const gsys = 'You are BAM grading your student ' + mind.name + '. Grade this answer to your question from 0-100 on correctness and usefulness for the specialty "' + mind.specialty + '". Return JSON only: {"score":0,"note":"one short line"}';
  const gout = await teacher(gsys, 'Question: ' + q + '\n\n' + mind.name + '\'s answer: ' + String(ans).slice(0, 600), true);
  let score = 0, note = ''; try { const g = JSON.parse((gout.match(/\{[\s\S]*\}/) || ['{}'])[0]); score = Math.max(0, Math.min(100, +g.score || 0)); note = String(g.note || '').slice(0, 120); } catch (e) {}
  // report card keyed by the first word of the specialty (coarse topic)
  const topic = mind.specialty.split(/[ &]/)[0];
  const prev = mind.reportCard[topic] || { score: 0, n: 0 };
  mind.reportCard[topic] = { score: Math.round((prev.score * prev.n + score) / (prev.n + 1)), n: prev.n + 1, note };
  mind.exams++;
  const scores = Object.values(mind.reportCard);
  mind.avgScore = Math.round(scores.reduce((s, x) => s + x.score, 0) / scores.length);
  save(mind);
  return { mind: mind.name, score, note };
}

// FAILOVER: pick the best-qualified mind to answer a query (keyword match on
// specialty, tie-broken by report-card average). Returns the mind or the strongest.
function bestFor(query) {
  const minds = list(); if (!minds.length) return null;
  const qWords = new Set(String(query || '').toLowerCase().split(/\W+/).filter(Boolean));
  const scored = minds.map(m => {
    const kw = (m.keywords || '').split(/\s+/).filter(Boolean);
    const specW = (m.specialty + ' ' + m.name).toLowerCase().split(/\W+/).filter(w => w.length > 3);
    // keyword hits dominate; exam score only breaks genuine ties
    const overlap = kw.filter(w => qWords.has(w)).length + specW.filter(w => qWords.has(w)).length;
    return { m, s: overlap * 1000 + (m.avgScore || 0) + m.curriculum.length };
  }).sort((a, b) => b.s - a.s);
  return scored[0].m;
}

function stats() {
  const minds = list();
  return {
    n: minds.length,
    totalLessons: minds.reduce((s, m) => s + m.lessonsLearned, 0),
    totalTraits: minds.reduce((s, m) => s + m.traits.length, 0),
    totalAgents: minds.reduce((s, m) => s + m.agents.length, 0),
    top: minds.slice().sort((a, b) => (b.avgScore || 0) - (a.avgScore || 0)).slice(0, 3).map(m => ({ name: m.name, specialty: m.specialty, avgScore: m.avgScore || 0, traits: m.traits.length, gen: m.generation })),
  };
}

module.exports = { ensure, list, get, systemFor, teach, evolve, spawnAgent, exam, bestFor, stats };
```

---

## 3 · Daemon ticks — 22 background jobs
Location: `~/Downloads/jarvis-daemon.js`

Every tick runs on the ~5-minute daemon loop (see the big try/catch at the bottom of the file). Extracted here in the order they appear.

### `payoutCheck` — v2 · watches Gumroad → refuses to publish when payout isn't wired

```javascript
async function payoutCheck() {
  const key = kcGet('gumkey');
  if (!key) return;   // nothing to check
  try {
    const r = await fetch('https://api.gumroad.com/v2/user', {
      headers: { Authorization: 'Bearer ' + key }, signal: AbortSignal.timeout(10000)
    });
    const j = await r.json().catch(() => ({}));
    const u = j && j.user;
    // Gumroad's response varies; we check both explicit + implicit signals
    const ok = !!(u && (u.payout_configured === true || u.payouts_enabled === true || u.has_bank_account === true));
    const prev = (() => { try { return JSON.parse(fs.readFileSync(PAYOUT_F, 'utf8')); } catch (e) { return {}; } })();
    const rec = { ok, checked: Date.now(), source: 'api.gumroad.com/v2/user' };
    try { fs.writeFileSync(PAYOUT_F, JSON.stringify(rec, null, 1)); } catch (e) {}
    // only fire the ledger + notification ONCE per state change (avoid daily spam)
    if (prev.ok !== ok) {
      if (!ok) {
        log('⚠ payout NOT configured — publishing blocked');
        ledger('security', '⚠ Gumroad payout NOT configured — every publish is a phantom');
        push('⚠ Gumroad payout blocked', 'Attach your bank in Gumroad → Settings → Payments. Publishing is blocked until then.');
      } else {
        log('✓ payout configured — publishing unblocked');
        ledger('fix', '✓ Gumroad payout configured — publishing unblocked');
        push('✓ Payout ready', 'Gumroad publishing is unblocked. Money can actually arrive now.');
      }
    }
  } catch (e) { log('payout check failed: ' + e.message); }
}
```

### `ytHealthTick` — v2 · daily YouTube OAuth probe → surfaces re-consent when it dies

```javascript
async function ytHealthTick() {
  const rt = kcGet('yt_refresh_token');
  if (!rt) return;   // never wired
  try {
    const tok = await ytAccessToken(rt);
    const r = await fetch('https://www.googleapis.com/youtube/v3/channels?part=id&mine=true', {
      headers: { Authorization: 'Bearer ' + tok }, signal: AbortSignal.timeout(10000)
    });
    if (!r.ok) throw new Error('channels.list ' + r.status);
    const prev = (() => { try { return JSON.parse(fs.readFileSync(YT_HEALTH_F, 'utf8')); } catch (e) { return {}; } })();
    const rec = { ok: true, checked: Date.now() };
    try { fs.writeFileSync(YT_HEALTH_F, JSON.stringify(rec, null, 1)); } catch (e) {}
    if (prev.ok === false) { log('✓ YouTube OAuth back'); ledger('fix', '✓ YouTube OAuth back — publishing works'); }
  } catch (e) {
    const prev = (() => { try { return JSON.parse(fs.readFileSync(YT_HEALTH_F, 'utf8')); } catch (e) { return {}; } })();
    const rec = { ok: false, err: e.message, checked: Date.now() };
    try { fs.writeFileSync(YT_HEALTH_F, JSON.stringify(rec, null, 1)); } catch (e) {}
    if (prev.ok !== false) {
      log('⚠ YouTube OAuth broken: ' + e.message);
      ledger('security', '⚠ YouTube OAuth broken — publishing will fail: ' + e.message);
      push('⚠ YouTube OAuth expired', 'Run: python3.11 ~/jarvis-api/yt_oauth.py to re-consent. Then set the Google Cloud app to "In production" to stop the 7-day expiry.');
    }
  }
}
```

### `poll` — polls Gumroad for new sales → alerts + ledger + memory + gumroad-history

```javascript
async function poll() {
  const c = cfg();
  if (!c.gumkey) { log('no gumkey set — nothing to watch'); return; }
  const r = await CORE.fetchGumroad(c.gumkey);
  if (!r.ok) { log('gumroad fetch failed: ' + r.error); return; }
  const st = loadState();
  const goal = c.goal || 0;
  const name = c.name || 'Commander';

  // first run: set baseline, don't alert on pre-existing sales
  if (st.salesCount < 0) {
    st.salesCount = r.salesCount;
    saveState(st);
    log(`baseline set: ${r.salesCount} sales · $${r.revenue.toFixed(2)}`);
    return;
  }

  // new sales
  if (r.salesCount > st.salesCount) {
    const n = r.salesCount - st.salesCount;
    const revenueDelta = r.revenue - (st.lastRevenue || 0);
    const avg = n > 0 ? (revenueDelta / n) : 0;
    log(`${n} NEW sale(s)! total ${r.salesCount} · $${r.revenue.toFixed(2)}`);
    notify('💰 New Gumroad sale!', `${n} new sale(s) — $${r.revenue.toFixed(2)} total`);
    push('💰 New sale!', `${n} new sale${n > 1 ? 's' : ''} — $${r.revenue.toFixed(2)} total`);
    // v2 #3 — rich, memory-searchable sale entry. Memory spine ingests ledger
    // as kind `action:sale`, so Sage will retrieve these when asked about strategy.
    const dayName = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][new Date().getDay()];
    const c = cfg();
    ledger('sale', `${n} sale${n > 1 ? 's' : ''} · +$${revenueDelta.toFixed(2)} (avg $${avg.toFixed(2)}) · ${dayName} · niche="${c.niche || '(unset)'}"`, {
      amount: revenueDelta, total_revenue: r.revenue, total_sales: r.salesCount, avg_ticket: avg, day: dayName, niche: c.niche || '',
    });
    // also append per-poll snapshot to gumroad-history.json for later attribution
    try {
      const HIST = path.join(DIR, 'gumroad-history.json');
      const h = (() => { try { return JSON.parse(fs.readFileSync(HIST, 'utf8')); } catch (e) { return { sales: [] }; } })();
      h.sales.push({ t: Date.now(), n, revenueDelta, total_revenue: r.revenue, total_sales: r.salesCount, avg, day: dayName, niche: c.niche || '' });
      if (h.sales.length > 500) h.sales = h.sales.slice(-500);
      fs.writeFileSync(HIST, JSON.stringify(h, null, 1));
    } catch (e) {}
    speak(n > 1 ? n + ' new sales just came in, boss.' : 'New sale just came in, boss.');
    await blast(`💰 **${n} new sale${n > 1 ? 's' : ''}!** ${name}, you're at $${r.revenue.toFixed(2)} total (${r.salesCount} sales). Keep going.`);
  }

  // milestones + goal
  for (const m of MILESTONES) {
    if (r.revenue >= m && !st.milestones.includes(m)) {
      st.milestones.push(m);
      log(`milestone hit: $${m}`);
      notify('🎯 Milestone!', `$${m} in revenue`);
      await blast(`🎯 **$${m} milestone hit!** ${name} just crossed $${m} in Gumroad revenue.`);
    }
  }
  if (goal && r.revenue >= goal && !st.milestones.includes('goal')) {
    st.milestones.push('goal');
    await blast(`👑 **GOAL REACHED** — $${goal}! ${name}, you did it.`);
    notify('👑 GOAL REACHED', `$${goal} hit!`);
  }

  st.salesCount = r.salesCount;
  st.lastRevenue = r.revenue;
  saveState(st);
}
```

### `maybeBriefing` — first-open-per-day summary → Discord blast + `say`

```javascript
async function maybeBriefing(force) {
  const c = cfg();
  if (!c.gumkey) return;
  const st = loadState();
  const hour = (c.briefHour != null) ? c.briefHour : 9;
  if (!force && (new Date().getHours() < hour || st.briefDate === today())) return;
  const r = await CORE.fetchGumroad(c.gumkey);
  if (!r.ok) { log('briefing skipped — gumroad fetch failed'); return; }
  let yt = null;
  if (c.ytkey && c.ytchannel) yt = await CORE.fetchYouTube(c.ytkey, c.ytchannel);
  let brief = buildBriefing(r, yt, c);
  const dec = pendingDecisions();
  if (dec.length) brief += '\n⚖️ **Waiting on your call:** ' + dec.join(' · ');
  if ((st.fixes || []).length) { brief += '\n🔧 Overnight self-repairs: ' + st.fixes.join('; '); st.fixes = []; }
  // weekly strategy tournament standings (Mondays)
  if (new Date().getDay() === 1) {
    try { const lb = stratLeaderboard().filter(r => r.trades > 0).slice(0, 3);
      if (lb.length) brief += '\n🏆 Strategy tournament leaders: ' + lb.map(r => r.name + ' ' + (r.pnl >= 0 ? '+$' : '-$') + Math.abs(r.pnl) + ' (' + r.wr + '% WR)').join(' · '); } catch (e) {}
  }
  await blast(brief);
  push('☀️ Morning briefing', '$' + r.revenue.toFixed(2) + ' · ' + r.salesCount + ' sales' + (dec.length ? ' · ' + dec.length + ' decision' + (dec.length > 1 ? 's' : '') + ' waiting' : ''));
  speak('Good morning boss. Revenue ' + r.revenue.toFixed(0) + ' dollars, ' + r.salesCount + ' sales.' + (dec.length ? ' ' + dec.length + ' decisions are waiting for you.' : ' Nothing is waiting on you.'));
  notify('☀️ Daily briefing', `$${r.revenue.toFixed(2)} · ${r.salesCount} sales`);
  st.briefDate = today();
  saveState(st);
  log('daily briefing sent');
}
```

### `maybeBackup` — nightly encrypted tar → ~/Backups/bam + iCloud copy

```javascript
async function maybeBackup() {
  const st = loadState();
  if (st.backupDate === today()) return;
  st.backupDate = today(); saveState(st);
  let key = kcGet('backupkey');
  if (!key) { key = require('crypto').randomBytes(24).toString('hex'); kcSetD('backupkey', key); }
  const bdir = path.join(os.homedir(), 'Backups', 'bam');
  fs.mkdirSync(bdir, { recursive: true });
  const out = path.join(bdir, 'bam-' + today() + '.tar.gz.enc');
  // BSD tar: --exclude must come BEFORE the path operand or it's silently ignored
  const cmd = `tar czf - --exclude='.jarvis/videos' --exclude='.jarvis/agent-profile' --exclude='.jarvis/gui-profile' --exclude='.jarvis/*.log' --exclude='.jarvis/*.db*' -C "${os.homedir()}" .jarvis 2>/dev/null | openssl enc -aes-256-cbc -pbkdf2 -pass env:BAMKEY -out "${out}"`;
  const r = await new Promise(res => { const p = spawn('/bin/sh', ['-c', cmd], { env: { ...process.env, BAMKEY: key } }); p.on('close', c => res(c)); p.on('error', () => res(1)); });
  if (r !== 0 || !fs.existsSync(out)) { log('backup FAILED'); return; }
  // keep the last 14, and drop the newest copy into iCloud Drive (free offsite)
  try {
    const all = fs.readdirSync(bdir).filter(f => f.startsWith('bam-')).sort();
    all.slice(0, Math.max(0, all.length - 14)).forEach(f => fs.unlinkSync(path.join(bdir, f)));
    const icloud = path.join(os.homedir(), 'Library', 'Mobile Documents', 'com~apple~CloudDocs');
    if (fs.existsSync(icloud)) { const id = path.join(icloud, 'BAM Backups'); fs.mkdirSync(id, { recursive: true }); fs.copyFileSync(out, path.join(id, path.basename(out))); }
  } catch (e) {}
  ledger('security', 'encrypted backup done: ' + path.basename(out) + ' (' + Math.round(fs.statSync(out).size / 1024) + ' KB)');
  log('backup done: ' + out);
}
```

### `intrusionTripwire` — ≥8 failed auths / honeypot hit → auto-lockdown flag

```javascript
async function intrusionTripwire() {
  if (fs.existsSync(path.join(DIR, 'lockdown'))) return false;
  const st = loadState();
  const fails = recentCount('authfail.jsonl', 3 * 60e3);     // failed tokens in 3 min
  const threats = recentCount('threats.jsonl', 10 * 60e3);   // honeypot hits in 10 min
  const tripped = fails >= 8 || threats >= 1;                // one honeypot hit is enough — nobody legit touches those
  if (!tripped) return false;
  // engage lockdown: flag file (watchdog + start script honor it) + kill tunnel + stop agent
  fs.writeFileSync(path.join(DIR, 'lockdown'), String(Date.now()));
  try { process.kill(parseInt(fs.readFileSync(path.join(DIR, 'tunnel.pid'), 'utf8'), 10)); } catch (e) {}
  try { fs.unlinkSync(path.join(DIR, 'tunnel.pid')); } catch (e) {}
  try { const p = fs.readFileSync(path.join(DIR, 'agent', 'pid'), 'utf8'); process.kill(parseInt(p, 10)); } catch (e) {}
  const why = threats >= 1 ? threats + ' honeypot probe(s)' : fails + ' failed logins in 3 min';
  ledger('security', '🔴 AUTO-LOCKDOWN — intrusion detected (' + why + ')');
  push('🔴 INTRUSION — BAM locked down', 'Detected ' + why + '. Tunnel killed, agent stopped, backend now unreachable from outside. Lift it in Sentinel when safe.');
  notify('🔴 BAM LOCKED DOWN', 'Intrusion detected — ' + why);
  speak('Security alert. Intrusion detected. I have locked everything down, boss.');
  log('AUTO-LOCKDOWN: ' + why);
  return true;
}
```

### `watchdog` — restarts API, rotates tunnels (health-checked), prunes videos

```javascript
async function watchdog() {
  if (await intrusionTripwire()) return;                     // attack in progress — lock down, do nothing else
  if (fs.existsSync(path.join(DIR, 'lockdown'))) return;      // KILL SWITCH engaged — stay down until the boss lifts it
  selfHashAlarm();
  const st = loadState(); st.fixes = st.fixes || [];
  let changed = false;
  // 1) API down? restart it (jarvis-api.sh start is idempotent + self-heals the tunnel)
  const health = await api('health');
  if (!health && Date.now() - BOOT_TS < 90e3) {
    log('watchdog: api not answering yet (just booted — giving it a moment)');
  } else if (!health) {
    log('watchdog: api down — restarting');
    await new Promise(res => { const p = spawn('/bin/zsh', [path.join(os.homedir(), 'jarvis-api', 'jarvis-api.sh'), 'start'], { stdio: 'ignore' }); p.on('close', res); p.on('error', res); });
    st.fixes.push('restarted the API backend'); ledger('fix', 'watchdog restarted the API'); changed = true;
  } else {
    // 2) tunnel dead (quick tunnels get dropped server-side)? kill it — start will rotate + republish
    try {
      const url = fs.readFileSync(path.join(DIR, 'api-url'), 'utf8').trim();
      const r = await fetch(url + '/api/health', { signal: AbortSignal.timeout(20000) }).catch(() => null);
      if (r && r.ok) { if (st.tunnelFails) { st.tunnelFails = 0; changed = true; } }
      else if ((st.tunnelFails = (st.tunnelFails || 0) + 1) < 2) { saveState(st); log('watchdog: tunnel check failed once — will confirm next tick'); }
      else {
        st.tunnelFails = 0;
        log('watchdog: tunnel dead — rotating');
        try { process.kill(parseInt(fs.readFileSync(path.join(DIR, 'tunnel.pid'), 'utf8'), 10)); } catch (e) {}
        try { fs.unlinkSync(path.join(DIR, 'tunnel.pid')); } catch (e) {}
        await new Promise(res => { const p = spawn('/bin/zsh', [path.join(os.homedir(), 'jarvis-api', 'jarvis-api.sh'), 'start'], { stdio: 'ignore' }); p.on('close', res); p.on('error', res); });
        // rotations are routine (quick tunnels die by design) — ledger a daily count, not 40 lines of noise
        st.rotCount = (st.rotCount || 0) + 1;
        if (st.rotLedgerDate !== today()) { ledger('fix', 'watchdog rotated the tunnel ×' + st.rotCount + ' since last note'); st.rotLedgerDate = today(); st.rotCount = 0; }
        st.fixes.push('rotated the dead tunnel'); changed = true;
      }
    } catch (e) {}
  }
  // 2.5) SYNTHETIC CANARY — hit every critical endpoint; alert on PATTERNS (2+ consecutive fails)
  try {
    st.canary = st.canary || {};
    for (const ep of ['paper', 'decisions', 'ledger', 'keys/status']) {
      const ok = !!(await api(ep));
      st.canary[ep] = ok ? 0 : (st.canary[ep] || 0) + 1;
      if (st.canary[ep] === 2) { push('🚨 Canary: /' + ep + ' failing', 'Two consecutive failures — something inside the API is sick even though health says OK.'); ledger('fix', 'canary alert: /' + ep + ' failing repeatedly'); changed = true; }
    }
  } catch (e) {}
  // 3) disk hygiene: keep only the newest 12 video batch dirs
  try {
    const V = path.join(DIR, 'videos');
    const dirs = fs.readdirSync(V).filter(d => d.startsWith('batch_') || d.startsWith('trend_')).sort();
    const prune = dirs.slice(0, Math.max(0, dirs.length - 12));
    for (const d of prune) fs.rmSync(path.join(V, d), { recursive: true, force: true });
    if (prune.length) { log('watchdog: pruned ' + prune.length + ' old video dirs'); changed = true; }
  } catch (e) {}
  if (changed) saveState(st);
}
```

### `maybePerf` — 24h YouTube stats refresh → feeds trend strategist

```javascript
async function maybePerf() {
  const c = cfg(); if (!c.ytkey) return;
  const st = loadState(); st.perf = st.perf || [];
  // harvest a fresh publish into the tracker
  try {
    const p = JSON.parse(fs.readFileSync(path.join(DIR, 'videos', 'pending.json'), 'utf8'));
    if (p.status === 'published' && p.url && !st.perf.some(x => x.url === p.url)) {
      const vid = (p.url.match(/[?&]v=([\w-]{6,})/) || p.url.match(/youtu\.be\/([\w-]{6,})/) || [])[1] || '';
      st.perf.unshift({ title: p.title, url: p.url, vid, publishedTs: p.publishedTs || Date.now(), views: 0, checked: 0, estimate: p.viewEstimate || null, scored: false });
      st.perf = st.perf.slice(0, 10); saveState(st);
    }
  } catch (e) {}
  // refresh stats for anything not checked in 24h
  const due = st.perf.filter(x => x.vid && Date.now() - (x.checked || 0) > 24 * 3600 * 1000);
  if (!due.length) return;
  try {
    const s = await (await fetch('https://www.googleapis.com/youtube/v3/videos?part=statistics&id=' + due.map(x => x.vid).join(',') + '&key=' + c.ytkey)).json();
    const m = {}; (s.items || []).forEach(it => m[it.id] = +((it.statistics || {}).viewCount || 0));
    due.forEach(x => { if (m[x.vid] != null) { x.views = m[x.vid]; x.checked = Date.now(); } });
    // SELF-CALIBRATION: once a video is a few days old, score BAM's prediction vs reality
    st.estScores = st.estScores || [];
    due.forEach(x => {
      if (x.estimate && x.estimate.likely > 0 && !x.scored && Date.now() - (x.publishedTs || 0) > 3 * 864e5) {
        const errPct = Math.round(Math.abs(x.views - x.estimate.likely) / Math.max(1, x.estimate.likely) * 100);
        st.estScores.unshift({ title: x.title.slice(0, 50), predicted: x.estimate.likely, actual: x.views, errPct, over: x.estimate.likely > x.views, at: Date.now() });
        st.estScores = st.estScores.slice(0, 12); x.scored = true;
        log('estimate scored: "' + x.title.slice(0, 40) + '" predicted ' + x.estimate.likely.toLocaleString() + ', got ' + x.views.toLocaleString() + ' (' + errPct + '% off)');
        try { fs.appendFileSync(path.join(DIR, 'ledger.jsonl'), JSON.stringify({ ts: Date.now(), kind: 'learn', msg: '🎯 view-estimate scored: predicted ' + x.estimate.likely.toLocaleString() + ', got ' + x.views.toLocaleString() + ' (' + errPct + '% off)' }) + '\n'); } catch (e) {}
      }
    });
    saveState(st);
    log('perf updated for ' + due.length + ' videos');
  } catch (e) {}
}
```

### `maybeNicheScout` — weekly search for hotter niches (only when boss's niche is unset)

```javascript
async function maybeNicheScout(force) {
  const c = cfg(); if (!c.apikey || !c.ytkey) return;
  const st = loadState();
  if (!force && st.scoutWeek === today().slice(0, 7) + '-w' + Math.ceil(new Date().getDate() / 7)) return;
  st.scoutWeek = today().slice(0, 7) + '-w' + Math.ceil(new Date().getDate() / 7); saveState(st);
  const niche = c.niche || 'make money online with digital products';
  let ideas; try {
    const out = await chatSafe({ provider: 'groq', apikey: c.apikey, model: MODEL70, system: 'Name 3 YouTube niches ADJACENT to "' + niche + '" that a faceless channel could expand into. JSON only: {"niches":["","",""]}', messages: [{ role: 'user', content: 'go' }], json: true, onToken: () => {} });
    ideas = JSON.parse((out.match(/\{[\s\S]*\}/) || [out])[0]).niches.slice(0, 3);
  } catch (e) { return; }
  const after = new Date(Date.now() - 7 * 864e5).toISOString();
  const results = [];
  for (const n of [niche, ...ideas]) {
    try {
      const d = await (await fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&order=viewCount&publishedAfter=' + encodeURIComponent(after) + '&maxResults=5&q=' + encodeURIComponent(n) + '&key=' + c.ytkey)).json();
      const ids = (d.items || []).map(i => i.id.videoId).filter(Boolean);
      if (!ids.length) continue;
      const s = await (await fetch('https://www.googleapis.com/youtube/v3/videos?part=statistics&id=' + ids.join(',') + '&key=' + c.ytkey)).json();
      const views = (s.items || []).map(i => +((i.statistics || {}).viewCount || 0));
      results.push({ n, avg: Math.round(views.reduce((a, b) => a + b, 0) / (views.length || 1)) });
    } catch (e) {}
  }
  if (results.length < 2) return;
  const base = results[0], best = results.slice(1).sort((a, b) => b.avg - a.avg)[0];
  const msg = best.avg > base.avg * 1.5
    ? '🧭 **Niche scout**: "' + best.n + '" is averaging ' + best.avg.toLocaleString() + ' views/top-video this week vs ' + base.avg.toLocaleString() + ' in your niche (' + (best.avg / Math.max(1, base.avg)).toFixed(1) + '×). Worth a test video?'
    : '🧭 **Niche scout**: your niche holds up this week (' + base.avg.toLocaleString() + ' avg views vs best adjacent "' + best.n + '" at ' + best.avg.toLocaleString() + ').';
  await blast(msg);
  ledger('scout', msg.replace(/\*\*/g, ''));
  log('niche scout done');
}
```

### `maybeVideoBatch` — bulk trend videos batched with approval gates

```javascript
async function maybeVideoBatch(force) {
  const c = cfg();
  if (!c.apikey) return;
  const st = loadState();
  const now = Date.now();
  const gap = (c.ideaMins || 60) * 60 * 1000;
  if (!force && st.lastIdeaTs && (now - st.lastIdeaTs) < gap) return;
  // don't pile fresh batches on top of one the boss hasn't even looked at —
  // that's how 583MB of unwatched video happened. One unpicked batch = wait.
  try {
    const lf = path.join(DIR, 'videos', 'latest.json');
    const lj = JSON.parse(fs.readFileSync(lf, 'utf8'));
    if (!force && lj.dir && fs.existsSync(lj.dir) && now - fs.statSync(lf).mtimeMs < 20 * 3600e3) {
      if (st.batchWaitNoted !== today()) { log('batch: previous batch still unpicked — holding off instead of stacking more'); st.batchWaitNoted = today(); saveState(st); }
      return;
    }
  } catch (e) {}
  const recent = (st.recentIdeas || []).slice(0, 8).join('; ');
  const sys = `You are JARVIS making faceless VERTICAL SHORTS for ${c.name || 'the user'}'s ${c.niche || 'digital products'} business (goal $${c.goal || 0}/mo). Draft ONE idea, then THREE genuinely different video variations of it. Return JSON only: {"idea":"","description":"","tags":"","variations":[{"title":"","script":"","broll":["",""]},{"title":"","script":"","broll":["",""]},{"title":"","script":"","broll":["",""]}]}. Script rules (this decides whether anyone watches): 5-8 spoken sentences, ONLY words to read aloud. Sentence 1 is the HOOK — a bold specific claim, a surprising number, or a question that opens a loop; max 12 words; never a greeting or a topic announcement. Middle sentences = concrete specifics: real numbers, named tools, exact steps — zero generic advice. Last sentence pays off the hook or gives ONE clear next action. Write like you talk: short punchy sentences, second person, no corporate words (never "leverage", "unlock", "intuitive", "seamless", "in today's world", "digital landscape"). Title: max 45 characters, curiosity-gap style. broll: ONE concrete visual scene per sentence, in order — 2-4 words each, filmable nouns ("stack of cash on desk", "phone alarm going off"), never abstractions ("productivity"). Avoid these recent ideas: ${recent || '(none)'}.`;
  let out = '';
  try { out = await chatSafe({ provider:c.provider, apikey:c.apikey, url:c.url, model:c.model, system:sys, messages:[{ role:'user', content:'Create the idea + 3 variations now.' }], json:true, onToken:()=>{} }); }
  catch (e) { log('video batch fetch failed: ' + e.message); return; }
  let d; try { d = JSON.parse((out.match(/\{[\s\S]*\}/) || [out])[0]); } catch (e) { log('video batch parse failed'); return; }
  const vars = (d.variations || []).filter(v => v && v.script).slice(0, 3);
  if (!vars.length) { log('no variations produced'); return; }
  st.lastIdeaTs = now; saveState(st);   // claim the slot before the slow render
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const dir = path.join(DIR, 'videos', 'batch_' + stamp);
  fs.mkdirSync(dir, { recursive: true });
  const orient = 'portrait';
  const items = [];
  for (let i = 0; i < vars.length; i++) {
    const v = vars[i];
    const sf = path.join(dir, 'v' + (i + 1) + '.txt'); fs.writeFileSync(sf, Array.isArray(v.script) ? v.script.join('\n') : String(v.script));
    const mp4 = path.join(dir, 'v' + (i + 1) + '.mp4');
    const broll = (v.broll || []).map(x => String(x).trim()).filter(Boolean);
    const brollDir = await buildVisuals(dir, 'broll' + (i + 1), broll, orient);
    const args = ['make_video.py', '--title', String(v.title || d.idea || 'Video'), '--script-file', sf, '--out', mp4, '--vertical'];
    if (brollDir && fs.existsSync(brollDir)) args.push('--broll-dir', brollDir);
    const r = await runPy(args);
    if (r.code === 0 && fs.existsSync(mp4)) { items.push({ title: v.title || d.idea, file: mp4, desc: d.description || '', tags: d.tags || '' }); log('rendered ' + mp4); }
    else log('render failed v' + (i + 1) + ': ' + r.out.slice(-200));
  }
  if (!items.length) { log('batch produced no videos'); return; }
  fs.writeFileSync(path.join(DIR, 'videos', 'latest.json'), JSON.stringify({ idea: d.idea, dir, items }, null, 2));
  st.recentIdeas = [d.idea, ...(st.recentIdeas || [])].slice(0, 12); saveState(st);
  const list = items.map((it, i) => `${i + 1}. ${it.title}`).join('\n');
  await blast(`🎬 **${items.length} videos ready** for "${d.idea}":\n${list}\n\nReview in: ${dir}\nIn the terminal: \`/batch\` to watch · \`/pick 1\` (or 2/3) to upload your favorite.`);
  // every variation straight to the phone
  if (st.tgBoss) for (let i = 0; i < items.length; i++) await tgSendVideo(st.tgBoss, items[i].file, '🎬 ' + (i + 1) + '/' + items.length + ': ' + items[i].title);
  notify('🎬 Videos ready', `${items.length} for "${d.idea}"`);
  log('batch done: ' + d.idea + ' (' + items.length + ' videos)');
}
```

### `maybeTrendVideo` — daily: web-trends + YT-winners → 70B concept → real render → pending.json

```javascript
async function maybeTrendVideo(force) {
  const c = cfg();
  if (!c.apikey || !c.ytkey) return;
  const st = loadState();
  const pending = loadPending();
  if (pending && pending.status === 'pending') return;              // one preview at a time — waiting on the boss
  if (!force && st.trendDate === today()) return;                   // one research run per day
  st.trendDate = today(); saveState(st);                            // claim the slot before the slow work
  const niche = c.niche || 'make money online with digital products';
  log('trend: researching what is working in "' + niche + '"…');
  // 0) WEB FIRST — what is spiking on the open web right now (Firecrawl, if armed)
  const webTrend = await webTrends(niche);
  // 1) REAL research — top-viewed videos of the past 7 days across seed queries
  const after = new Date(Date.now() - 7 * 864e5).toISOString();
  const seeds = [niche, niche + ' tips', 'how to ' + niche];
  const seen = {}, vids = [];
  for (const q of seeds) {
    try {
      const u = 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&order=viewCount&publishedAfter=' + encodeURIComponent(after) + '&maxResults=10&q=' + encodeURIComponent(q) + '&key=' + c.ytkey;
      const d = await (await fetch(u)).json();
      (d.items || []).forEach(it => { const id = it.id && it.id.videoId; if (id && !seen[id]) { seen[id] = 1; vids.push({ id, title: it.snippet.title, ch: it.snippet.channelTitle }); } });
    } catch (e) { log('trend search failed: ' + e.message); }
  }
  if (!vids.length) { log('trend: no research results'); return; }
  try {
    const s = await (await fetch('https://www.googleapis.com/youtube/v3/videos?part=statistics&id=' + vids.map(v => v.id).slice(0, 40).join(',') + '&key=' + c.ytkey)).json();
    const m = {}; (s.items || []).forEach(it => m[it.id] = +((it.statistics || {}).viewCount || 0));
    vids.forEach(v => v.views = m[v.id] || 0);
  } catch (e) {}
  vids.sort((a, b) => (b.views || 0) - (a.views || 0));
  const listing = vids.slice(0, 15).map((v, i) => (i + 1) + '. "' + v.title + '" — ' + (v.views || 0).toLocaleString() + ' views (' + v.ch + ')').join('\n');
  // COMMENT MINING — what the audience of the winners is actually asking for
  let voice = '';
  try {
    const cs = [];
    for (const v of vids.slice(0, 2)) {
      const d = await (await fetch('https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&order=relevance&maxResults=10&videoId=' + v.id + '&key=' + c.ytkey)).json();
      (d.items || []).forEach(it => { const t = (((it.snippet || {}).topLevelComment || {}).snippet || {}).textDisplay || ''; if (t.length > 25) cs.push(t.replace(/<[^>]+>/g, '').slice(0, 160)); });
    }
    if (cs.length) voice = '\n\nAUDIENCE VOICE — real comments on this week\'s winners (mine these for the question your video should answer):\n' + cs.slice(0, 12).map(x => '- ' + x).join('\n');
  } catch (e) {}
  // 2) strategist picks the concept + writes the whole package (the big model — this is the money call)
  const avoid = (st.avoidIdeas || []).concat(st.recentIdeas || []).slice(0, 12).join('; ');
  const sys = 'You are a ruthless YouTube strategist for a faceless channel in the "' + niche + '" niche. ' + perfSummary() + 'You have TWO research feeds: live web trends (what is spiking on the open web right now) and the top-performing YouTube videos of the LAST 7 DAYS. Cross-reference them: ride a web trend that also matches what is winning on YouTube. Create ONE new VERTICAL SHORT without copying any single title. Return JSON only: {"analysis":"2-3 sentences on what is working and why you chose this concept","title":"high-CTR title, max 45 characters","script":"the full word-for-word voiceover, 6-10 spoken sentences, ONLY words to read aloud","desc":"YouTube description with hook + 3 hashtags","tags":"comma,separated,tags","broll":["ONE concrete filmable visual scene per script sentence, in order, 2-4 words each"]}. Script rules (this decides whether anyone watches): sentence 1 is the HOOK — a bold specific claim, surprising number, or open-loop question, max 12 words, never a greeting or topic announcement; middle sentences carry concrete specifics (real numbers, named tools, exact steps — zero generic advice); the last sentence pays off the hook or gives ONE clear next action. Write like you talk: short punchy sentences, second person, no corporate words (never "leverage", "unlock", "intuitive", "seamless", "in today\'s world", "digital landscape"). ' + (avoid ? 'Avoid these already-used ideas: ' + avoid + '. ' : '') + webTrend + '\n\nTop YouTube videos this week:\n' + listing + voice;
  let out = '';
  try { out = await chatSafe({ provider: 'groq', apikey: c.apikey, model: MODEL70, system: sys, messages: [{ role: 'user', content: 'Analyze the research and create the one video to make today.' }], json: true, onToken: () => {} }); }
  catch (e) { log('trend llm failed: ' + e.message); return; }
  let d; try { d = JSON.parse((out.match(/\{[\s\S]*\}/) || [out])[0]); } catch (e) { log('trend parse failed'); return; }
  if (!d.title || !d.script) { log('trend: incomplete package'); return; }
  const script = Array.isArray(d.script) ? d.script.join('\n') : String(d.script);
  // 3) render it
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const dir = path.join(DIR, 'videos', 'trend_' + stamp);
  fs.mkdirSync(dir, { recursive: true });
  const sf = path.join(dir, 'v1.txt'); fs.writeFileSync(sf, script);
  const mp4 = path.join(dir, 'v1.mp4');
  const broll = (d.broll || []).map(x => String(x).trim()).filter(Boolean);
  const brollDir = await buildVisuals(dir, 'broll1', broll, 'portrait');
  const args = ['make_video.py', '--title', String(d.title), '--script-file', sf, '--out', mp4, '--vertical'];
  if (brollDir && fs.existsSync(brollDir)) args.push('--broll-dir', brollDir);
  const r = await runPy(args);
  if (r.code !== 0 || !fs.existsSync(mp4)) { log('trend render failed: ' + r.out.slice(-200)); return; }
  // 3.5) PREDICT its performance before it ever goes public (grounded in the real research)
  const viewEstimate = await estimateViews({ title: d.title, analysis: d.analysis }, vids);
  // 4) park it as PENDING — nothing publishes until the boss approves in the app
  fs.writeFileSync(PENDING_FILE, JSON.stringify({
    ts: Date.now(), status: 'pending', title: d.title, analysis: d.analysis || '',
    research: listing, file: mp4, script,
    // music beds in ~/.jarvis/music are Kevin MacLeod CC-BY — the credit must ship with the video
    desc: (d.desc || '') + (fs.readdirSync(path.join(os.homedir(), '.jarvis', 'music')).some(f => /\.(mp3|m4a|wav)$/.test(f)) ? '\n\nMusic: Kevin MacLeod (incompetech.com), CC BY 4.0' : ''),
    tags: d.tags || '', niche, viewEstimate
  }, null, 2));
  st.recentIdeas = [d.title, ...(st.recentIdeas || [])].slice(0, 12); saveState(st);
  await blast('🎯 **Trend video ready for your review**: "' + d.title + '"\n_' + (d.analysis || '') + '_\n\nOpen BAM → 📹 studio → **From Bam** to watch the preview and hit Publish or Reject.');
  // the preview lands ON THE PHONE — watch + decide from Telegram, no computer needed
  if (st.tgBoss) await tgSendVideo(st.tgBoss, mp4, '🎯 Ready for your call: "' + d.title + '"'
    + (viewEstimate && viewEstimate.likely ? '\n📈 Predicted ' + viewEstimate.likely.toLocaleString() + ' views (' + viewEstimate.confidence + ')' : '')
    + '\n\n/publish to ship it · /reject <why> to bin it');
  push('🎯 Video ready for review', d.title);
  ledger('trend', 'made preview: ' + d.title);
  notify('🎯 Preview ready', d.title);
  log('trend done (pending approval): ' + d.title);
}
```

### `maybeBossVideo` — chat-driven 'make me a video' request path

```javascript
async function maybeBossVideo(force) {
  const c = cfg();
  if (!c.apikey) return;
  let rq = null; try { rq = JSON.parse(fs.readFileSync(VREQ_FILE, 'utf8')); } catch (e) { return; }
  if (!rq || !rq.topic) { try { fs.unlinkSync(VREQ_FILE); } catch (e) {} return; }
  const pending = loadPending();
  // one approval seat: an earlier BOSS video waits for his Publish/Reject, but an
  // auto-generated trend preview gets bumped — his explicit ask outranks the daily habit
  if (pending && pending.status === 'pending' && pending.boss) { log('boss video waiting — his earlier requested video still needs Publish/Reject'); return; }
  if (pending && pending.status === 'pending') { ledger('trend', 'trend preview "' + String(pending.title || '').slice(0, 60) + '" bumped for the boss\'s own request'); log('bumping stale trend preview for the boss\'s request'); }
  if (!force && rq.status === 'building' && Date.now() - (rq.buildTs || 0) < 45 * 60e3) return;   // another pass is on it (or crashed <45min ago)
  rq.status = 'building'; rq.buildTs = Date.now();
  fs.writeFileSync(VREQ_FILE, JSON.stringify(rq, null, 2));
  const topic = String(rq.topic).slice(0, 400);
  log('boss video: "' + topic + '"');
  // the boss is waiting on this one — don't let the Mac sleep mid-render
  // (a July run stalled 3h because the machine dozed off between b-roll clips)
  let caf = null; try { caf = spawn('caffeinate', ['-i'], { stdio: 'ignore' }); } catch (e) {}
  try {
  const niche = c.niche || 'make money online with digital products';
  const fail = async (why) => {
    try { fs.unlinkSync(VREQ_FILE); } catch (e) {}
    log('boss video failed: ' + why);
    await blast('✕ Couldn\'t make the video you asked for ("' + topic.slice(0, 80) + '") — ' + why);
    push('✕ Video failed', why.slice(0, 100));
    ledger('trend', '✕ boss video failed: ' + why.slice(0, 120));
  };
  const sys = 'You are a YouTube scriptwriter for a faceless channel in the "' + niche + '" niche. ' + perfSummary()
    + 'The channel owner has REQUESTED this exact video — build his idea, do not swap in a different concept: "' + topic + '". '
    + 'Create it as a VERTICAL SHORT. Return JSON only: {"analysis":"1-2 sentences on your angle","title":"high-CTR title, max 45 characters","script":"the full word-for-word voiceover, 6-10 spoken sentences, ONLY words to read aloud","desc":"YouTube description with hook + 3 hashtags","tags":"comma,separated,tags","broll":["ONE concrete filmable visual scene per script sentence, in order, 2-4 words each"]}. '
    + 'Script rules (this decides whether anyone watches): sentence 1 is the HOOK — a bold specific claim, surprising number, or open-loop question, max 12 words, never a greeting or topic announcement; middle sentences carry concrete specifics (real numbers, named tools, exact steps — zero generic advice); the last sentence pays off the hook or gives ONE clear next action. Write like you talk: short punchy sentences, second person, no corporate words (never "leverage", "unlock", "intuitive", "seamless", "in today\'s world", "digital landscape").';
  let out = '';
  try { out = await chatSafe({ provider: 'groq', apikey: c.apikey, model: MODEL70, system: sys, messages: [{ role: 'user', content: 'Write the full video package for my request now.' }], json: true, onToken: () => {} }); }
  catch (e) { return fail('the writer model errored: ' + e.message.slice(0, 100)); }
  let d; try { d = JSON.parse((out.match(/\{[\s\S]*\}/) || [out])[0]); } catch (e) { return fail('could not parse the script package'); }
  if (!d.title || !d.script) return fail('the package came back incomplete');
  const script = Array.isArray(d.script) ? d.script.join('\n') : String(d.script);
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const dir = path.join(DIR, 'videos', 'boss_' + stamp);
  fs.mkdirSync(dir, { recursive: true });
  const sf = path.join(dir, 'v1.txt'); fs.writeFileSync(sf, script);
  const mp4 = path.join(dir, 'v1.mp4');
  const broll = (d.broll || []).map(x => String(x).trim()).filter(Boolean);
  const brollDir = await buildVisuals(dir, 'broll1', broll, 'portrait');
  const args = ['make_video.py', '--title', String(d.title), '--script-file', sf, '--out', mp4, '--vertical'];
  if (brollDir && fs.existsSync(brollDir)) args.push('--broll-dir', brollDir);
  const r = await runPy(args);
  if (r.code !== 0 || !fs.existsSync(mp4)) return fail('the render died: ' + r.out.slice(-160));
  const viewEstimate = await estimateViews({ title: d.title, analysis: d.analysis }, []);
  fs.writeFileSync(PENDING_FILE, JSON.stringify({
    ts: Date.now(), status: 'pending', boss: 1, requested: topic, title: d.title, analysis: d.analysis || '',
    research: '', file: mp4, script,
    desc: (d.desc || '') + (fs.readdirSync(path.join(os.homedir(), '.jarvis', 'music')).some(f => /\.(mp3|m4a|wav)$/.test(f)) ? '\n\nMusic: Kevin MacLeod (incompetech.com), CC BY 4.0' : ''),
    tags: d.tags || '', niche, viewEstimate
  }, null, 2));
  try { fs.unlinkSync(VREQ_FILE); } catch (e) {}
  const st = loadState();
  st.recentIdeas = [d.title, ...(st.recentIdeas || [])].slice(0, 12); saveState(st);
  await blast('🎬 **The video you asked for is ready**: "' + d.title + '"\n_' + (d.analysis || '') + '_\n\nOpen BAM → 📹 studio → **From Bam** to watch it and hit Publish or Reject.');
  if (st.tgBoss) await tgSendVideo(st.tgBoss, mp4, '🎬 Your requested video: "' + d.title + '"'
    + (viewEstimate && viewEstimate.likely ? '\n📈 Predicted ' + viewEstimate.likely.toLocaleString() + ' views (' + viewEstimate.confidence + ')' : '')
    + '\n\n/publish to ship it · /reject <why> to bin it');
  push('🎬 Your video is ready', d.title);
  ledger('trend', '🎬 boss video rendered: ' + d.title);
  notify('🎬 Your video is ready', d.title);
  log('boss video done (pending approval): ' + d.title);
  } finally { try { if (caf) caf.kill(); } catch (e) {} }
}
```

### `paperTick` — 24/7 paper trading — real Polymarket tape, entry rules, extreme-price + delisted settlement

```javascript
async function paperTick() {
  const c = cfg(); const P = ptLoad(); ptDayRoll(P);
  // 1) whale tape → convergence signals → entries (same rule as the terminal: 2+ wallets, same market+side+outcome, 30 min)
  try {
    const j = await (await fetch('https://data-api.polymarket.com/trades?limit=50&takerOnly=true&filterType=CASH&filterAmount=5000')).json();
    if (Array.isArray(j)) {
      const now = Date.now();
      for (const t of j.reverse()) {
        const id = t.transactionHash || JSON.stringify([t.proxyWallet, t.timestamp, t.asset]);
        if (P.seen[id]) continue; P.seen[id] = now;
        const key = (t.title || '') + '§' + (t.side || '') + '§' + (t.outcome || '');
        const sg = P.sigs[key] = P.sigs[key] || { ws: {}, fired: 0 };
        sg.ws[t.proxyWallet] = now;
        for (const w in sg.ws) if (now - sg.ws[w] > 18e5) delete sg.ws[w];
        if (Object.keys(sg.ws).length >= 2 && now - sg.fired > 6e5) {
          sg.fired = now;
          // leaderboard gate: check the converging whales' REAL track records — never follow proven losers
          const W = whalesLoad();
          let scored = 0, losers = 0;
          for (const wallet of Object.keys(sg.ws).slice(0, 3)) {
            const w = await whaleScore(W, wallet, t.pseudonym || wallet.slice(0, 8));
            if (w.pnl != null) { scored++; if (w.pnl < 0) losers++; }
          }
          // prune: a whale that's been a proven loser for 2 weeks isn't worth re-checking
          for (const k of Object.keys(W)) if (W[k].pnl != null && W[k].pnl < 0 && now - (W[k].checked || 0) > 14 * 864e5) delete W[k];
          try { fs.writeFileSync(WHALES_F, JSON.stringify(W, null, 1)); } catch (e) {}
          if (scored >= 2 && losers === scored) { ptSkipNote(P, 'all converging whales are net losers'); continue; }
          const err = ptOpen(P, { q: t.title, cid: t.conditionId, outIdx: t.outcomeIndex != null ? +t.outcomeIndex : 0, outName: t.outcome, entry: +t.price || 0, src: 'whale convergence' });
          if (!err) { log('paper: convergence entry → ' + (t.title || '').slice(0, 60) + ' · ' + (t.outcome || '') + ' @ ' + (+t.price).toFixed(2)); push('🩸 Paper entry', (t.outcome || '') + ' @ ' + (+t.price).toFixed(2) + ' · ' + (t.title || '').slice(0, 90)); }
          else ptSkipNote(P, err);
        }
      }
      // keep the seen/sig maps from growing forever
      for (const k in P.seen) if (now - P.seen[k] > 6 * 3600e3) delete P.seen[k];
      for (const k in P.sigs) if (now - (P.sigs[k].fired || 0) > 24 * 3600e3 && !Object.keys(P.sigs[k].ws).length) delete P.sigs[k];
    }
  } catch (e) { log('paper: tape fetch failed: ' + e.message); }
  // 2) mark every position to the real price; settle what the market resolved
  //    ALSO force-settle when the market is effectively decided (price at either extreme
  //    for >1h) or when the market has been delisted and we can't fetch it anymore —
  //    Polymarket's `closed` flag isn't always flipped promptly, so positions used to sit forever.
  if (P.pos.length) {
    const now = Date.now();
    let map = {};
    try {
      const cids = [...new Set(P.pos.map(p => p.cid))];
      const u = 'https://gamma-api.polymarket.com/markets?' + cids.map(x => 'condition_ids=' + encodeURIComponent(x)).join('&');
      const j = await (await fetch(u)).json();
      (j || []).forEach(m => { let px = []; try { px = JSON.parse(m.outcomePrices || '[]').map(parseFloat); } catch (e) {} map[m.conditionId] = { px, closed: !!m.closed }; });
    } catch (e) { log('paper: price refresh failed: ' + e.message); }
    for (let i = P.pos.length - 1; i >= 0; i--) {
      const p = P.pos[i], m = map[p.cid];
      const ageMs = now - (p.t || now);
      // update mark price when available
      if (m && m.px[p.outIdx] != null && !isNaN(m.px[p.outIdx])) {
        p.cur = m.px[p.outIdx];
        // mark when the price first crossed the extreme, so we can wait 1h before force-settling
        if (p.cur >= 0.985 || p.cur <= 0.015) { if (!p.extremeSince) p.extremeSince = now; }
        else p.extremeSince = 0;
      }
      // A) official flag flipped — the clean settlement path
      if (m && m.closed) { P.pos.splice(i, 1); ptRealize(P, p, p.cur >= 0.5 ? 1 : 0, 'market resolved'); continue; }
      // B) price at 0.985+ or 0.015- for >1h — market is decided, flag just hasn't flipped
      if (p.extremeSince && now - p.extremeSince > 3600e3) {
        P.pos.splice(i, 1);
        ptRealize(P, p, p.cur >= 0.5 ? 1 : 0, 'price decided (' + (p.cur >= 0.5 ? 'won' : 'lost') + ')');
        continue;
      }
      // C) no market data at all AND position is >3 days old — delisted/expired,
      //    take the last known mark as the exit so we don't leak forever
      if (!m && ageMs > 3 * 864e5) {
        P.pos.splice(i, 1);
        ptRealize(P, p, p.cur, 'market delisted — settled at last mark');
        continue;
      }
      // D) still no resolution after 30 days — hard cutoff to keep the book clean
      if (ageMs > 30 * 864e5) {
        P.pos.splice(i, 1);
        ptRealize(P, p, p.cur, '30-day cutoff — settled at last mark');
      }
    }
  }
  ptSave(P);
}
```

### `stratTick` — 10-strategy tournament — same tape, different edges, ranked by real P&L

```javascript
async function stratTick() {
  const S = stratLoad();
  // 1) one whale-tape fetch feeds every strategy
  let tape = [];
  try { const j = await (await fetch('https://data-api.polymarket.com/trades?limit=50&takerOnly=true&filterType=CASH&filterAmount=5000')).json(); if (Array.isArray(j)) tape = j.reverse(); } catch (e) { return; }
  const now = Date.now();
  S.sigs = S.sigs || {};
  const W = whalesLoad();
  for (const raw of tape) {
    const id = raw.transactionHash || JSON.stringify([raw.proxyWallet, raw.timestamp, raw.asset]);
    if (S.seen[id]) continue; S.seen[id] = now;
    const t = { cid: raw.conditionId, outIdx: raw.outcomeIndex != null ? +raw.outcomeIndex : 0, out: raw.outcome || '', px: +raw.price || 0, side: raw.side, usd: Math.round((raw.size || 0) * (raw.price || 0)), q: raw.title || '', wallet: raw.proxyWallet };
    if (!t.cid) continue;
    // convergence flag (shared with the strategy needing it)
    const ck = (t.q) + '§' + t.side + '§' + t.out;
    const sg = S.sigs[ck] = S.sigs[ck] || { ws: {}, fired: 0 };
    sg.ws[t.wallet] = now; for (const w in sg.ws) if (now - sg.ws[w] > 18e5) delete sg.ws[w];
    const converged = Object.keys(sg.ws).length >= 2 && now - sg.fired > 6e5;
    if (converged) sg.fired = now;
    // whale P&L only fetched when a strategy needs it (cheap: 24h cached)
    let pnl = null;
    const anyNeedsPnl = Object.values(STRATS).some(s => s.needsPnl);
    if (anyNeedsPnl && t.usd >= 5000) { const w = await whaleScore(W, t.wallet, raw.pseudonym || t.wallet.slice(0, 8)); pnl = w.pnl; }
    const ctx = { converged, pnl };
    for (const [name, strat] of Object.entries(STRATS)) {
      try { const o = strat.f(t, ctx); if (o) stratEnter(S.books[name], o, name); } catch (e) {}
    }
  }
  try { fs.writeFileSync(WHALES_F, JSON.stringify(W, null, 1)); } catch (e) {}
  // 2) mark + settle every book's positions against real prices (shared fetch)
  const allCids = [...new Set(Object.values(S.books).flatMap(b => b.pos.map(p => p.cid)))];
  if (allCids.length) {
    try {
      const map = {};
      // gamma caps URL length — chunk the condition_ids
      for (let i = 0; i < allCids.length; i += 20) {
        const chunk = allCids.slice(i, i + 20);
        const j = await (await fetch('https://gamma-api.polymarket.com/markets?' + chunk.map(x => 'condition_ids=' + encodeURIComponent(x)).join('&'))).json();
        (j || []).forEach(m => { let px = []; try { px = JSON.parse(m.outcomePrices || '[]').map(parseFloat); } catch (e) {} map[m.conditionId] = { px, closed: !!m.closed }; });
      }
      for (const b of Object.values(S.books)) {
        for (let i = b.pos.length - 1; i >= 0; i--) {
          const p = b.pos[i], m = map[p.cid];
          if (!m || m.px[p.outIdx] == null || isNaN(m.px[p.outIdx])) continue;
          p.cur = m.px[p.outIdx];
          if (m.closed) {
            b.pos.splice(i, 1);
            const exit = p.cur >= 0.5 ? 1 : 0, pl = p.stake * (exit - p.entry) / p.entry;
            b.equity += pl; b.trades++; if (pl >= 0) b.wins++;
            b.closed.unshift({ q: p.q, pl, t: Date.now() }); b.closed = b.closed.slice(0, 50);
          }
        }
      }
    } catch (e) {}
  }
  for (const k in S.seen) if (now - S.seen[k] > 6 * 3600e3) delete S.seen[k];
  for (const k in S.sigs) if (now - (S.sigs[k].fired || 0) > 24 * 3600e3 && !Object.keys(S.sigs[k].ws).length) delete S.sigs[k];
  try { fs.writeFileSync(STRAT_F, JSON.stringify(S)); } catch (e) {}
}
```

### `maybeMailwork` — auto-replies inbound AgentMail; drips pitched leads day-1/3/7

```javascript
async function maybeMailwork() {
  const c = cfg();
  const amKey = kcGet('am_key'), inbox = kcGet('am_inbox');
  if (!amKey || !inbox || !c.apikey) return;
  const st = loadState();
  const hdr = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + amKey };
  const base = 'https://api.agentmail.to/v0/inboxes/' + encodeURIComponent(inbox);
  let msgs = [];
  try { const d = await (await fetch(base + '/messages', { headers: hdr })).json(); msgs = d.messages || d.data || []; } catch (e) { return; }
  const leads = (await api('leads')) || [];
  // 1) AUTO-RESPONDER — new inbound mail gets a reply within one tick (≤5 min)
  st.mailSeen = st.mailSeen || {};
  let replied = 0;
  for (const m of msgs.slice(0, 15)) {
    const id = m.message_id || m.id || (m.from + '|' + m.subject);
    const from = String(m.from || '');
    if (st.mailSeen[id] || from.includes(inbox) || replied >= 3) continue;
    st.mailSeen[id] = Date.now(); saveState(st);
    const lead = leads.find(l => l.email && from.toLowerCase().includes(l.email.toLowerCase()));
    if (lead && lead.status !== 'replied' && lead.status !== 'client') await api('leads', { id: lead.id, name: '', status: 'replied' });
    let reply = '';
    try {
      reply = await chatSafe({ provider: 'groq', apikey: c.apikey, model: MODEL70,
        system: 'You are Bam, Miguel\'s assistant, answering business email. ' + (lead ? 'This is ' + (lead.owner || 'the owner') + ' of ' + lead.name + ' — we built them a free website preview' + (lead.site ? ' at ' + lead.site : '') + ' and pitched them. Goal: get them to say yes or book a call with Miguel.' : 'Be helpful and brief; goal is to move toward working together.') + ' Under 90 words, professional, warm, sign as "Bam — Miguel\'s assistant". Never invent prices; if asked about price say Miguel will confirm. Plain text only.',
        messages: [{ role: 'user', content: 'They wrote: subject "' + (m.subject || '') + '" — ' + String(m.preview || m.text || '').slice(0, 600) + '\n\nWrite the reply.' }], onToken: () => {} });
    } catch (e) { continue; }
    try {
      await fetch(base + '/messages/send', { method: 'POST', headers: hdr, body: JSON.stringify({ to: from, subject: 'Re: ' + (m.subject || 'your message'), text: reply.slice(0, 2000) }) });
      replied++;
      ledger('mail', '🤖 auto-replied to ' + from.slice(0, 50) + (lead ? ' (' + lead.name + ')' : ''));
      push('📧 Bam replied for you', from.slice(0, 60) + ' — "' + (m.subject || '').slice(0, 60) + '"');
      log('mailwork: auto-replied to ' + from.slice(0, 50));
    } catch (e) {}
  }
  // 2) DRIP — pitched leads with an email get day-1/3/7 touches until they reply
  st.drips = st.drips || {};
  let sent = 0;
  for (const l of leads) {
    if (sent >= 3 || !l.email || l.status !== 'pitched') continue;
    const d0 = st.drips[l.id] = st.drips[l.id] || { start: l.ts || Date.now(), sent: [] };
    const days = (Date.now() - d0.start) / 864e5;
    const due = [1, 3, 7].find(n => days >= n && !d0.sent.includes(n));
    if (!due) continue;
    d0.sent.push(due); saveState(st);
    let body = '';
    try {
      body = await chatSafe({ provider: 'groq', apikey: c.apikey, model: MODEL70,
        system: 'Write follow-up #' + d0.sent.length + ' (day ' + due + ') to ' + (l.owner || 'the owner') + ' of ' + l.name + '. We built them a free website preview' + (l.site ? ': ' + l.site : '') + ' and haven\'t heard back. Under 70 words, zero pressure, one clear question, sign "Bam — Miguel\'s assistant". Plain text.',
        messages: [{ role: 'user', content: 'Write it.' }], onToken: () => {} });
      await api('mail/send', { to: l.email, subject: due === 1 ? 'Your new website is sitting here ready' : 'Re: your website', text: body.slice(0, 1500) });
      sent++;
      ledger('mail', '📧 drip day-' + due + ' → ' + l.name);
      log('mailwork: drip day-' + due + ' sent to ' + l.name);
    } catch (e) {}
  }
}
```

### `maybeMinds` — PARALLEL MINDS DISPATCH — dispatches the 6 Neurolink cards for real work

```javascript
async function maybeMinds(force) {
  const c = cfg();
  if (!c.apikey) return;
  const st = loadState();
  const now = Date.now();
  const gap = (c.mindsHours || 6) * 3600 * 1000;
  if (!force && st.lastMindsTs && (now - st.lastMindsTs) < gap) return;
  st.lastMindsTs = now; saveState(st);   // claim the slot before the slow calls
  const niche = c.niche || 'digital products';
  // LEDGER — real numbers
  let ledger = 'Gumroad not connected', prods = '';
  try {
    const r = await CORE.fetchGumroad(c.gumkey);
    if (r && r.ok) {
      const pct = c.goal ? Math.round(r.revenue / c.goal * 100) : 0;
      ledger = `$${r.revenue.toFixed(0)} · ${r.salesCount} sales${c.goal ? ` · ${pct}% to $${c.goal}` : ''}`;
      if (r.products && r.products.length) prods = 'My products: ' + r.products.map(p => p.name).join(', ') + '. ';
    }
  } catch (e) {}
  const ask = async (sys, user) => {
    try { const o = await chatSafe({ provider:c.provider, apikey:c.apikey, url:c.url, model:c.model, system:sys, messages:[{ role:'user', content:user }], onToken:()=>{} }); return (o || '').replace(/\s+/g, ' ').trim(); }
    catch (e) { return '(failed)'; }
  };
  const [atlas, scribe, hunter] = await Promise.all([   // the minds run concurrently
    ask('You are ATLAS, a sharp market researcher. Reply in ONE tight sentence.', `Name ONE specific ${niche} digital product that could sell right now, and why.`),
    ask('You are SCRIBE, a direct-response copywriter. Reply with just a product title and a one-sentence hook.', `Draft a ${niche} digital product title + hook.`),
    ask('You are HUNTER, a sales strategist. Reply with ONE concrete action, one sentence.', `${prods}What is the single best move to make a sale this week for a ${niche} creator?`),
  ]);
  const msg = [
    `🧠 **Parallel Minds** — ${today()}`,
    `📊 LEDGER: ${ledger}`,
    `🔭 ATLAS: ${atlas}`,
    `✍️ SCRIBE: ${scribe}`,
    `🎯 HUNTER: ${hunter}`,
  ].join('\n');
  await blast(msg);
  notify('🧠 Parallel Minds', 'New briefing posted to Discord');
  try { fs.writeFileSync(path.join(DIR, 'minds-latest.json'), JSON.stringify({ ts: now, ledger, atlas, scribe, hunter }, null, 2)); } catch (e) {}
  log('parallel minds briefing sent');
}
```

### `maybeAcademy` — rotates the 10 lineage minds one lesson/exam/trait/agent per ~18min

```javascript
async function maybeAcademy(force) {
  const c = cfg();
  if (!c.apikey) return;
  const st = loadState();
  const now = Date.now();
  if (!force && now - (st.academyAt || 0) < 18 * 60 * 1000) return;   // ~ every 18 min
  st.academyAt = now; st.academyStep = ((st.academyStep || 0) + 1); saveState(st);
  MINDS.ensure();
  // teacher: the big brain when possible, local fallback via chatSafe
  const teacher = (sys, user, json) => chatSafe({ provider: 'groq', apikey: c.apikey, model: MODEL70, system: sys, messages: [{ role: 'user', content: user }], json: !!json, onToken: () => {} });
  // student answers ONLY on the local model — this is what we grow over time
  const student = (sys, user) => CORE.streamChat({ provider: 'ollama', apikey: '', url: 'http://127.0.0.1:11434', model: 'qwen2.5:3b', system: sys, messages: [{ role: 'user', content: user }], onToken: () => {} }).catch(() => '(local model unavailable)');
  try {
    const step = st.academyStep % 4;
    let r = null, kind = '';
    if (step === 0) { kind = 'lesson'; r = await MINDS.teach(teacher); }
    else if (step === 1) { kind = 'exam'; r = await MINDS.exam(teacher, student); }
    else if (step === 2) { kind = 'trait'; r = await MINDS.evolve(teacher); }
    else { kind = 'agent'; r = await MINDS.spawnAgent(teacher); }
    if (r) {
      const msg = kind === 'lesson' ? '🎓 taught ' + r.mind + ': ' + r.lesson.slice(0, 90)
        : kind === 'exam' ? '📝 ' + r.mind + ' scored ' + r.score + '/100' + (r.note ? ' — ' + r.note : '')
        : kind === 'trait' ? '🧬 ' + r.mind + ' grew a trait: ' + r.trait
        : '🕹 ' + r.mind + ' designed an agent: ' + r.agent;
      log('academy: ' + msg);
      try { fs.appendFileSync(path.join(DIR, 'ledger.jsonl'), JSON.stringify({ ts: Date.now(), kind: 'academy', msg }) + '\n'); } catch (e) {}
    }
  } catch (e) { log('academy error: ' + e.message); }
}
```

### `discordLoop` — Discord gateway bot — MESSAGE CONTENT intent, boss chat → /api/chat

```javascript
async function discordLoop() {
  while (true) {
    try {
      const tok = kcGet('dc_token'), chan = kcGet('dc_channel');
      if (!tok || !chan) { await new Promise(r => setTimeout(r, 60000)); continue; }
      let st = loadState();
      if (!st.dcLast) {
        // first arm: set the cursor to "now" — never answer a backlog of old messages
        const latest = await dcApi('GET', '/channels/' + chan + '/messages?limit=1');
        if (Array.isArray(latest)) { st.dcLast = latest.length ? latest[0].id : '0'; saveState(st); log('discord: boss line armed on channel ' + chan); }
        await new Promise(r => setTimeout(r, 15000)); continue;
      }
      const msgs = await dcApi('GET', '/channels/' + chan + '/messages?after=' + st.dcLast + '&limit=20');
      if (Array.isArray(msgs) && msgs.length) {
        msgs.sort((a, b) => (BigInt(a.id) < BigInt(b.id) ? -1 : 1));       // oldest first
        for (const m of msgs) {
          st = loadState(); st.dcLast = m.id; saveState(st);               // advance cursor even for skipped msgs
          if (m.author && m.author.bot) continue;                          // never talk to himself
          try { await dcHandle(m, chan); } catch (e) { log('discord handle: ' + e.message); }
        }
      }
      await new Promise(r => setTimeout(r, 15000));
    } catch (e) { log('discord loop: ' + e.message); await new Promise(r => setTimeout(r, 30000)); }
  }
}
```

### `telegramLoop` — Telegram long-poll — offset-tracked, boss chat + /decisions /publish etc

```javascript
async function telegramLoop() {
  while (true) {
    try {
      if (!kcGet('tg_token')) { await new Promise(r => setTimeout(r, 60000)); continue; }
      const d = await tgApi('getUpdates', { offset: TG_OFFSET, timeout: 25, allowed_updates: ['message'] }, 40000);
      if (d && d.ok && Array.isArray(d.result)) {
        for (const u of d.result) {
          TG_OFFSET = u.update_id + 1;
          try { if (u.message) await tgHandle(u.message); } catch (e) { log('telegram handle: ' + e.message); }
        }
      } else { await new Promise(r => setTimeout(r, 5000)); }
    } catch (e) { log('telegram loop: ' + e.message); await new Promise(r => setTimeout(r, 10000)); }
  }
}
```

### `maybeSelfReview` — weekly: gathers own week → picks ONE upgrade → proposes to BAM CODES

```javascript
async function maybeSelfReview(force) {
  const c = cfg();
  if (!c.apikey) return;
  const st = loadState();
  const now = Date.now();
  if (!force && now - (st.selfReviewAt || 0) < 7 * 864e5) return;          // weekly
  if (!force && now - (st.selfReviewTryAt || 0) < 6 * 3600e3) return;      // failed attempt → retry in 6h, not every tick
  st.selfReviewTryAt = now; saveState(st);
  // one self-proposal at a time — never clobber a pending or running code job
  const cs = await api('code/state');
  if (!cs || ['proposed', 'running', 'review'].includes(cs.status)) return;
  // ── gather the REAL evidence of the week ──
  const tailJson = (f, n) => { try { return fs.readFileSync(f, 'utf8').trim().split('\n').slice(-n).map(l => { try { return JSON.parse(l); } catch (e) { return null; } }).filter(Boolean); } catch (e) { return []; } };
  const lessons = tailJson(path.join(DIR, 'agent', 'lessons.jsonl'), 60).slice(-12).map(x => x.lesson || x.text || '').filter(Boolean);
  const fails = tailJson(path.join(DIR, 'agent', 'journal.jsonl'), 300).filter(j => j.outcome === 'failed').slice(-8).map(j => (j.task || '').slice(0, 80));
  const led = tailJson(path.join(DIR, 'ledger.jsonl'), 600).filter(e => now - e.ts < 7 * 864e5);
  const counts = {}; led.forEach(e => { counts[e.kind] = (counts[e.kind] || 0) + 1; });
  const fixes = led.filter(e => e.kind === 'fix').slice(-8).map(e => e.msg);
  const learns = led.filter(e => e.kind === 'learn').slice(-10).map(e => e.msg);
  let minds = ''; try { const s = MINDS.stats(); minds = JSON.stringify(s).slice(0, 700); } catch (e) {}
  const est = (st.estScores || []).slice(0, 6).map(x => 'predicted ' + x.predicted + ' got ' + x.actual + ' (' + x.errPct + '% off)');
  const avoid = (st.avoidIdeas || []).slice(0, 5);
  const evidence = 'MY WEEK, REAL DATA:\n'
    + 'Activity counts by kind: ' + JSON.stringify(counts) + '\n'
    + (fails.length ? 'FAILED agent tasks: ' + fails.join(' | ') + '\n' : '')
    + (lessons.length ? 'Lessons extracted from failures: ' + lessons.join(' | ').slice(0, 900) + '\n' : '')
    + (fixes.length ? 'Repairs the watchdog made: ' + fixes.join(' | ').slice(0, 500) + '\n' : '')
    + (learns.length ? 'Rules/lessons learned: ' + learns.join(' | ').slice(0, 600) + '\n' : '')
    + (minds ? 'Student minds report: ' + minds + '\n' : '')
    + (est.length ? 'View-prediction accuracy: ' + est.join('; ') + '\n' : '')
    + (avoid.length ? 'Videos the boss rejected: ' + avoid.join(' | ').slice(0, 400) + '\n' : '');
  const sys = 'You are BAM doing your weekly self-review. From the REAL evidence of your own week, choose the ONE highest-leverage upgrade to YOUR OWN CODE for next week. Requirements: concrete and small enough for one focused code-editing session on your files (index.html PWA, jarvis-daemon.js, jarvis-core.js, server.js, web_agent.py); grounded in the evidence — fix the recurring failure or sharpen the weakest loop, no fantasy features; NEVER touch security gates, approval flows, the constitution, keys, or anything that spends money or posts publicly. Return JSON only: {"task":"one clear instruction for the code editor, max 60 words","why":"one sentence citing the specific evidence"}';
  try {
    const out = await chatSafe({ provider: 'groq', apikey: c.apikey, model: MODEL70, system: sys, messages: [{ role: 'user', content: evidence }], json: true, onToken: () => {} });
    let task = '', why = '';
    try { const j = JSON.parse((out.match(/\{[\s\S]*\}/) || ['{}'])[0]); task = String(j.task || '').trim().slice(0, 400); why = String(j.why || '').trim().slice(0, 300); } catch (e) {}
    if (task.length < 15) { log('self-review: no usable proposal'); return; }
    const r = await api('code/start', { task: '[SELF-UPGRADE] ' + task, propose: 1 });
    if (!r) { log('self-review: code/start refused'); return; }
    st.selfReviewAt = now; saveState(st);
    ledger('learn', '🧬 self-review proposed: ' + task.slice(0, 140));
    push('🧬 BAM wants to upgrade himself', task.slice(0, 110) + ' — approve in the decision bar');
    await blast('🧬 **Weekly self-review.** I read my own week and the one upgrade I want is:\n> ' + task + '\n_Why: ' + why + '_\n\nApprove it in the app (decision bar) and I\'ll make the change myself — you review the diff after.');
    log('self-review proposed: ' + task.slice(0, 80));
  } catch (e) { log('self-review error: ' + e.message); }
}
```

### `researchTick` — grinds open Deep Research missions across their angle list

```javascript
async function researchTick(force) {
  const c = cfg(); if (!c.apikey) return;
  for (const m of resList()) {
    if (m.status !== 'active') continue;
    const now = Date.now();
    if (!force && now - (m.lastTickTs || 0) < m.tickEveryMs) continue;
    m.lastTickTs = now; resSave(m);                       // claim the slot before the slow work
    const angle = m.angles[m.angleIdx % m.angles.length];
    const ev = await researchGather(m.topic, angle);
    if (!ev.length) { log('research: no evidence for "' + angle + '"'); m.angleIdx++; resSave(m); continue; }
    const known = m.facts.slice(-40).map((f, i) => (i + 1) + '. ' + f.fact).join('\n') || '(nothing yet)';
    const sys = 'You are BAM\'s research brain, deep in a mission on "' + m.topic + '". Current angle: "' + angle + '".\n\nWHAT BAM ALREADY KNOWS:\n' + known + '\n\nFrom the evidence the user sends, extract up to 5 facts that are GENUINELY NEW — not a restatement of anything known. HARD RULES: a fact must be concrete and checkable (a number, a named tool/person/policy, a mechanism, a date) — never a vibe. Evidence tagged [youtube] is a video TITLE, i.e. a marketing CLAIM — only use it if it names something specific, and mark the fact "(creator claim)". Never launder a headline like "make $10k/month" into a fact. If the evidence is all fluff, return fewer facts or none — an empty list is a valid answer. Also rate novelty 0-100: how much of the evidence taught something new (0 = all old news). JSON only: {"newFacts":[{"fact":"","src":"short source name"}],"novelty":0}';
    let out;
    try { out = await chatSafe({ provider: 'groq', apikey: c.apikey, model: MODEL70, system: sys, messages: [{ role: 'user', content: ev.slice(0, 10).join('\n\n').slice(0, 9000) }], json: true, onToken: () => {} }); }
    catch (e) { log('research llm failed: ' + e.message); continue; }
    let d; try { d = JSON.parse((out.match(/\{[\s\S]*\}/) || [out])[0]); } catch (e) { continue; }
    const fresh = (d.newFacts || []).map(f => ({ ts: now, angle, fact: String(f.fact || '').slice(0, 400), src: String(f.src || '').slice(0, 80) })).filter(f => f.fact.length > 15).slice(0, 5);
    m.facts.push(...fresh);
    m.novelty.push(Math.max(0, Math.min(+d.novelty || 0, 100)));
    m.angleIdx++;
    m.progress = Math.min(100, Math.round(100 * m.facts.length / m.expectedFacts));
    const elapsed = now - m.startedTs;
    const saturated = m.novelty.length >= 3 && m.novelty.slice(-3).reduce((s, x) => s + x, 0) / 3 < 12;
    log('research "' + m.topic.slice(0, 40) + '": +' + fresh.length + ' new (novelty ' + (d.novelty || 0) + ') → ' + m.progress + '%');
    const st2 = loadState();
    for (const mark of [25, 50, 75]) {
      if (m.progress >= mark && !(m.notified || []).includes(mark)) {
        m.notified = (m.notified || []).concat(mark);
        if (st2.tgBoss) await tgSend(st2.tgBoss, '🔬 "' + m.topic.slice(0, 60) + '"\n' + resBar(m.progress) + ' of what I set out to learn\n· ' + (fresh[0] ? fresh[0].fact.slice(0, 160) : m.facts.length + ' findings so far'));
      }
    }
    if (m.progress >= 100 || elapsed >= m.horizon.ms || saturated) {
      await researchFinish(m, m.progress >= 100 ? 'learned what I came for' : saturated ? 'novelty dried up — the well is empty' : 'focus window closed');
    } else resSave(m);
  }
}
```


---

## 4 · The Web Agent — `web_agent.py`
Location: `~/jarvis-api/web_agent.py`

The ONE true agent by the strict definition — a playwright-driven browser BAM uses to actually click things on real websites. Approval-gated per submit/pay button, logs credentials it creates, self-heals closed tabs.

```python
#!/usr/bin/env python3
"""BAM WEB AGENT — actually does things on the web.

Drives a real Chromium with an LLM in the loop: sees the page, decides an
action, executes it, repeats. Signs up for services, fills forms, researches —
but NEVER submits anything sensitive without the boss approving in the app.

  python3 web_agent.py --task "sign up for a free canva account"

State lives in ~/.jarvis/agent/ :
  state.json   status/log the PWA polls      step.png      live screenshot
  approve.flag / deny.flag                   answer.txt    user's reply to a question
The browser profile persists in ~/.jarvis/agent-profile (logins survive runs).
"""
import argparse, json, os, re, secrets, subprocess, sys, time, urllib.request

DIR = os.path.expanduser("~/.jarvis/agent")
PROFILE = os.path.expanduser("~/.jarvis/agent-profile")
STATE = os.path.join(DIR, "state.json")
SHOT = os.path.join(DIR, "step.png")
APPROVE = os.path.join(DIR, "approve.flag")
DENY = os.path.join(DIR, "deny.flag")
ANSWER = os.path.join(DIR, "answer.txt")
CREDS = os.path.join(DIR, "credentials.log")
MAX_STEPS = 30
WAIT_MAX = 600  # 10 min for approvals/answers

# gate only REAL commitments — signups, purchases, sending things. Cookie banners,
# "start reading" overlays etc. must NOT stall a hands-free mission.
SENSITIVE = re.compile(r"sign\s?up|register|create (my |an |a |)account|subscribe|buy now|buy\b|pay\b|payment|purchase|checkout|place order|continue with (google|apple|facebook|email)|apply now|send (message|email|application)|post (comment|reply|review)", re.I)

state = {"status": "starting", "task": "", "step": 0, "log": [], "trail": [], "question": "", "pending_action": "", "summary": ""}

def save():
    try:
        os.makedirs(DIR, exist_ok=True)
        json.dump(state, open(STATE, "w"), indent=1)
    except Exception:
        pass

def slog(msg):
    state["log"].append({"t": time.strftime("%H:%M:%S"), "m": str(msg)[:300]})
    state["log"] = state["log"][-80:]
    save()
    print(msg, flush=True)

def trail_add(url, title, how):
    # ordered list of every page the run touched — the boss taps these in the app
    # to retrace the exact route. Only real pages, only on change.
    if not url or not url.startswith("http"):
        return
    tr = state["trail"]
    if tr and tr[-1]["url"] == url:
        return
    tr.append({"n": len(tr) + 1, "t": time.strftime("%H:%M:%S"),
               "url": url[:300], "title": (title or "")[:80], "how": (how or "")[:120]})
    state["trail"] = tr[-40:]
    save()

def kc(name):
    try:
        r = subprocess.run(["security", "find-generic-password", "-s", "jarvis-keys", "-a", name, "-w"],
                           capture_output=True, text=True)
        return r.stdout.strip() if r.returncode == 0 else ""
    except Exception:
        return ""

def llm(messages):
    # curl instead of urllib — the system python has no CA bundle (same trick as upload_youtube.py)
    key = os.environ.get("GROQ_API_KEY") or kc("apikey")
    if not key:
        raise RuntimeError("no GROQ_API_KEY")
    body = json.dumps({"model": "llama-3.3-70b-versatile", "temperature": 0.3,
                       "response_format": {"type": "json_object"}, "messages": messages})
    r = subprocess.run(["curl", "-s", "-m", "90", "https://api.groq.com/openai/v1/chat/completions",
                        "-H", "Content-Type: application/json", "-H", "Authorization: Bearer " + key,
                        "--data-binary", "@-"], input=body, capture_output=True, text=True)
    d = json.loads(r.stdout)
    if "choices" not in d:
        raise RuntimeError(json.dumps(d)[:200])
    return d["choices"][0]["message"]["content"]

def push(title, body):
    """Lock-screen notification on the boss's phone via the local API."""
    try:
        tok = open(os.path.expanduser("~/.jarvis/api-token")).read().strip()
        subprocess.run(["curl", "-s", "-m", "10", "http://127.0.0.1:8787/api/push/send",
                        "-H", "Content-Type: application/json", "-H", "x-jarvis-token: " + tok,
                        "--data-binary", json.dumps({"title": title, "body": body[:150]})],
                       capture_output=True, timeout=15)
    except Exception:
        pass

def save_cred(site, user, password):
    """Credentials go straight into the encrypted vault — never plaintext on disk."""
    try:
        tok = open(os.path.expanduser("~/.jarvis/api-token")).read().strip()
        subprocess.run(["curl", "-s", "-m", "10", "http://127.0.0.1:8787/api/creds",
                        "-H", "Content-Type: application/json", "-H", "x-jarvis-token: " + tok,
                        "--data-binary", json.dumps({"site": site[:120], "user": user, "pass": password, "note": "created by the web agent"})],
                       capture_output=True, timeout=15)
    except Exception:
        pass

def research(q):
    """Firecrawl via the local API — clean web results in one step instead of 20 clicks."""
    try:
        tok = open(os.path.expanduser("~/.jarvis/api-token")).read().strip()
        r = subprocess.run(["curl", "-s", "-m", "45", "http://127.0.0.1:8787/api/research",
                            "-H", "Content-Type: application/json", "-H", "x-jarvis-token: " + tok,
                            "--data-binary", json.dumps({"q": q[:200]})], capture_output=True, text=True, timeout=50)
        d = json.loads(r.stdout)
        if not d.get("ok"):
            return "research unavailable (" + d.get("error", "?")[:80] + ") — browse manually instead"
        return " || ".join(f"{i['title']} <{i['url']}>: {i['text'][:280]}" for i in d.get("items", []))[:2400]
    except Exception as e:
        return "research failed: " + str(e)[:80]

RECIPES = os.path.join(DIR, "recipes.jsonl")

def recipe_save(task, history):
    """A finished task's action log IS the recipe — next time, no rediscovery."""
    try:
        with open(RECIPES, "a") as f:
            f.write(json.dumps({"ts": int(time.time() * 1000), "task": task[:200], "history": history[-20:]}) + "\n")
    except Exception:
        pass

def recipe_find(task):
    """Best keyword-overlap match from past successful runs."""
    try:
        words = set(w.lower() for w in re.findall(r"[a-zA-Z]{4,}", task))
        best, score = None, 2   # need 3+ shared meaningful words
        for ln in open(RECIPES).read().strip().split("\n"):
            r = json.loads(ln)
            s = len(words & set(w.lower() for w in re.findall(r"[a-zA-Z]{4,}", r["task"])))
            if s > score:
                best, score = r, s
        return best
    except Exception:
        return None

LESSONS = os.path.join(DIR, "lessons.jsonl")

def lessons_find(task, k=3):
    """Post-mortem lessons from past FAILURES on similar tasks (server writes them)."""
    try:
        words = set(w.lower() for w in re.findall(r"[a-zA-Z]{4,}", task))
        scored = []
        for ln in open(LESSONS).read().strip().split("\n"):
            r = json.loads(ln)
            s = len(words & set(w.lower() for w in re.findall(r"[a-zA-Z]{4,}", r.get("task", ""))))
            if s >= 2 and r.get("lesson"):
                scored.append((s, r["lesson"]))
        scored.sort(key=lambda x: -x[0])
        return [l for _, l in scored[:k]]
    except Exception:
        return []

def journal(outcome, task, summary):
    try:
        with open(os.path.join(DIR, "journal.jsonl"), "a") as f:
            f.write(json.dumps({"ts": int(time.time() * 1000), "outcome": outcome, "task": task[:200], "summary": summary[:400]}) + "\n")
        with open(os.path.expanduser("~/.jarvis/ledger.jsonl"), "a") as f:
            f.write(json.dumps({"ts": int(time.time() * 1000), "kind": "agent", "msg": ("✓ " if outcome == "done" else "✕ ") + task[:150]}) + "\n")
    except Exception:
        pass

def wait_flag(kind):
    """Block until the boss reacts in the app. kind: 'approval' or 'input'."""
    for f in (APPROVE, DENY, ANSWER):
        try: os.remove(f)
        except OSError: pass
    save()
    t0 = time.time()
    while time.time() - t0 < WAIT_MAX:
        if kind == "approval":
            if os.path.exists(APPROVE): os.remove(APPROVE); return True
            if os.path.exists(DENY):    os.remove(DENY);    return False
        else:
            if os.path.exists(ANSWER):
                txt = open(ANSWER).read().strip()
                os.remove(ANSWER)
                return txt
        time.sleep(1.5)
    return None

def page_state(page, max_els=60):
    # one pass: tag each visible interactive element with data-bam AND return its description,
    # so the numbers the LLM sees always match what gets clicked
    return page.evaluate("""() => {
      const out = [];
      document.querySelectorAll('[data-bam]').forEach(el => el.removeAttribute('data-bam'));
      const vis = (el) => { const r = el.getBoundingClientRect();
        return r.width > 2 && r.height > 2 && r.bottom > 0 && r.top < innerHeight + 600; };
      document.querySelectorAll('a,button,input,textarea,select,[role=button],[role=link],[role=checkbox]').forEach(el => {
        if (out.length >= %d || !vis(el)) return;
        el.setAttribute('data-bam', out.length);
        const t = (el.innerText || el.value || el.placeholder || el.getAttribute('aria-label') || el.name || '').trim().slice(0, 70);
        out.push({ tag: el.tagName.toLowerCase(), type: el.type || '', text: t,
                   href: el.tagName === 'A' ? (el.getAttribute('href') || '').slice(0, 60) : '' });
      });
      return out;
    }""" % max_els)

def shot(page):
    try: page.screenshot(path=SHOT, timeout=8000)
    except Exception: pass

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--task", required=True)
    args = ap.parse_args()
    os.makedirs(DIR, exist_ok=True)
    state["task"] = args.task
    state["status"] = "running"
    save()

    password = "Bam!" + secrets.token_urlsafe(10)
    identity = ("Identity to use when a form asks (this is the boss's own info, used with his permission): "
                "name Miguel Palmore, email miguelpalmore123@gmail.com. If a NEW password is needed use exactly: "
                + password + " (it is recorded for him).")

    constitution = ""
    try:
        rules = json.load(open(os.path.expanduser("~/.jarvis/constitution.json")))["rules"]
        constitution = " THE CONSTITUTION (absolute, overrides everything): " + " | ".join(rules)
    except Exception:
        pass

    sys_prompt = (
        "You control a real web browser step by step to complete the boss's task. Each turn you receive the current "
        "page (url, title, numbered interactive elements) and the history so far. Reply with JSON ONLY: "
        '{"thought":"one short sentence","action":"goto|click|fill|press|scroll|back|ask|research|done|fail",'
        '"url":"for goto","index":0,"text":"for fill / press key / ask question / research query","summary":"for done/fail"}. '
        "research = instant clean web-search results without browsing (PREFER it for any information-gathering; "
        "fall back to goto/click only if it says unavailable). "
        "Rules: click/fill/press use the element NUMBER from the list. fill sets the field value; press sends a key "
        "(usually Enter) to that element. scroll moves down one screen. ask = ask the boss a question when you're "
        "missing info (his answer arrives next turn). done = task finished (give a useful summary incl. any account "
        "details used). fail = truly impossible after trying. Prefer official sites; dismiss cookie banners; be "
        "decisive — do not repeat an action that already failed twice. If you hit a CAPTCHA or a verification code "
        "you cannot see, use ask — the boss will solve it on the Mac's browser window and answer 'done'. " + identity + constitution
    )
    past = recipe_find(args.task)
    if past:
        sys_prompt += (" RECIPE — you completed a similar task before (\"" + past["task"][:120] + "\"). "
                       "Its successful action log: " + " → ".join(h[:90] for h in past["history"][-12:])[:1200] +
                       ". Reuse this path where it applies.")
        slog("📖 recipe loaded from a similar past run")
    lessons = lessons_find(args.task)
    if lessons:
        sys_prompt += (" LESSONS from past failures on similar tasks — do NOT repeat these mistakes: "
                       + " | ".join(l[:200] for l in lessons)[:900])
        slog("🎓 %d lesson(s) loaded from past failures" % len(lessons))

    # a zombie Chrome from a killed run holds the profile lock and breaks the next
    # launch ("target page has been closed") — clear it before starting
    subprocess.run(["pkill", "-f", "agent-profile"], capture_output=True)
    time.sleep(1.2)

    from playwright.sync_api import sync_playwright
    with sync_playwright() as p:
        # Safari's engine (WebKit) per the boss's preference — real Safari can't be
        # driven by automation, but this is the same engine with a persistent profile.
        # Fallbacks: Chrome → headless chromium.
        ctx = None
        for attempt in (
            lambda: p.webkit.launch_persistent_context(PROFILE + "-webkit", headless=False, viewport={"width": 1280, "height": 900}),
            lambda: p.chromium.launch_persistent_context(PROFILE, channel="chrome", headless=False, viewport={"width": 1280, "height": 900}),
            lambda: p.chromium.launch_persistent_context(PROFILE, headless=True, viewport={"width": 1280, "height": 900}),
        ):
            try:
                ctx = attempt(); break
            except Exception:
                continue
        if ctx is None:
            raise RuntimeError("no browser could launch")
        page = ctx.pages[0] if ctx.pages else ctx.new_page()
        history = []          # short rolling history of thoughts/results for the LLM
        outcome = "fail"
        last_fill = -99       # step of the most recent form fill — submits only gate near a fill
        for step in range(1, MAX_STEPS + 1):
            state["step"] = step
            # self-heal: if the tab died (popup closed it, site did), grab/open another
            try:
                if page.is_closed():
                    page = ctx.pages[-1] if ctx.pages else ctx.new_page()
            except Exception:
                try: page = ctx.new_page()
                except Exception: pass
            try:
                els = page_state(page)
            except Exception:
                els = []
            shot(page)
            try: cur_url, cur_title = page.url, page.title()[:100]
            except Exception: cur_url, cur_title = "?", "?"
            trail_add(cur_url, cur_title, history[-1] if history else "mission start")
            listing = "\n".join(f"[{i}] <{e['tag']}{' type=' + e['type'] if e['type'] else ''}> {e['text']}" +
                                (f" ({e['href']})" if e['href'] else "") for i, e in enumerate(els)) or "(no interactive elements)"
            user = (f"TASK: {args.task}\n\nPAGE: {cur_url}\nTITLE: {cur_title}\n"
                    f"ELEMENTS:\n{listing}\n\nHISTORY:\n" + ("\n".join(history[-12:]) or "(start)"))
            try:
                d = json.loads(llm([{"role": "system", "content": sys_prompt}, {"role": "user", "content": user}]))
            except Exception as e:
                slog(f"llm error: {e}"); time.sleep(3); continue
            act, thought = d.get("action", ""), d.get("thought", "")
            slog(f"step {step}: {thought} → {act}")

            if act == "done":
                outcome = "done"; state["summary"] = d.get("summary", "")[:600]; break
            if act == "fail":
                outcome = "failed"; state["summary"] = d.get("summary", "")[:600]; break
            if act == "research":
                q = d.get("text", "")[:200]
                slog("🔎 researching: " + q)
                history.append("research \"" + q + "\" → " + research(q))
                continue
            if act == "ask":
                state["status"] = "waiting_input"; state["question"] = d.get("text", "")[:300]
                slog("❓ asking the boss: " + state["question"])
                push("❓ Bam needs you", state["question"])
                ans = wait_flag("input")
                state["status"] = "running"; state["question"] = ""
                if ans is None: outcome = "failed"; state["summary"] = "No answer from the boss in time."; break
                history.append(f"asked: {d.get('text','')} → boss answered: {ans}")
                continue

            try:
                if act == "goto":
                    page.goto(d.get("url", ""), timeout=45000, wait_until="domcontentloaded")
                    history.append(f"goto {d.get('url','')} ok")
                elif act in ("click", "fill", "press"):
                    idx = int(d.get("index", -1))
                    el_text = els[idx]["text"] if 0 <= idx < len(els) else ""
                    # ── APPROVAL GATE: real commitments only — sensitive wording, or a submit
                    # button right after Bam filled a form. A timeout never kills the run;
                    # he routes around it and keeps working. ──
                    submitty = 0 <= idx < len(els) and els[idx].get("type") == "submit" and (step - last_fill) <= 6
                    if act == "click" and (SENSITIVE.search(el_text or "") or submitty):
                        state["status"] = "waiting_approval"
                        state["pending_action"] = f'click "{el_text}" on {cur_url}'
                        slog(f"⏸ needs approval: click \"{el_text}\"")
                        push("⏸ Approval needed", f'Bam wants to click "{el_text}" on {cur_url}')
                        ok = wait_flag("approval")
                        state["status"] = "running"; state["pending_action"] = ""
                        if ok is None:
                            history.append(f'approval for "{el_text}" timed out — boss is away. Avoid that button; take a different path or finish the task with what you have.')
                            slog("⏳ approval timed out — routing around it"); continue
                        if not ok:
                            history.append(f'boss DENIED clicking "{el_text}" — choose another approach or ask him')
                            slog("✕ denied by the boss"); continue
                        slog("✓ approved")
                    loc = page.locator(f'[data-bam="{idx}"]')
                    if act == "click":
                        loc.click(timeout=8000)
                        history.append(f'clicked [{idx}] "{el_text}" ok')
                    elif act == "fill":
                        loc.fill(d.get("text", ""), timeout=8000)
                        last_fill = step
                        shown = "•••" if (els[idx].get("type") == "password") else d.get("text", "")[:40]
                        if els[idx].get("type") == "password":
                            save_cred(cur_url, "miguelpalmore123@gmail.com", d.get("text", ""))
                        history.append(f'filled [{idx}] "{el_text}" with "{shown}" ok')
                    else:
                        loc.press(d.get("text", "Enter"), timeout=8000)
                        history.append(f'pressed {d.get("text", "Enter")} on [{idx}] ok')
                    page.wait_for_timeout(1800)
                elif act == "scroll":
                    page.mouse.wheel(0, 800); history.append("scrolled down")
                elif act == "back":
                    page.go_back(timeout=20000); history.append("went back")
                else:
                    history.append(f"unknown action {act}")
            except Exception as e:
                history.append(f"{act} FAILED: {str(e)[:120]}")
                slog(f"{act} failed: {str(e)[:120]}")
            state["status"] = "running"; save()
        shot(page)
        try: trail_add(page.url, page.title()[:100], history[-1] if history else "")
        except Exception: pass
        state["status"] = outcome
        if not state.get("summary"):
            state["summary"] = "Ran out of steps — check the screenshot for where it got to."
        slog(f"AGENT {outcome.upper()}: {state['summary']}")
        save()
        journal(outcome, args.task, state["summary"])
        if outcome == "done":
            recipe_save(args.task, history)
        push("✅ Bam finished" if outcome == "done" else "✕ Bam couldn't finish", state["summary"])
        ctx.close()

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        state["status"] = "failed"; state["summary"] = str(e)[:300]; save()
        journal("failed", state.get("task", ""), state["summary"])
        print("fatal:", e, flush=True)
        sys.exit(1)
```

---

## 5 · Server-side agent endpoints
Location: `~/jarvis-api/server.js`

These are the HTTP handlers the PWA + Telegram + Discord call to control the web agent.

### `/api/agent/start` — boss says 'go' — kicks off a new headed-Chrome task

```javascript
app.post('/api/agent/start', (req, res) => {
  const task = String((req.body || {}).task || '').trim().slice(0, 500);
  if (!task) return res.status(400).json({ error: 'task required' });
  if (agentAlive()) {
    // busy → stack it instead of refusing: Bam picks it up when he's free
    const q = readQueue();
```

### `/api/agent/state` — polled by the Agent panel — status, screenshot url, trail

```javascript
app.get('/api/agent/state', (req, res) => {
  const fs = require('fs'), path = require('path');
  let st = null; try { st = JSON.parse(fs.readFileSync(path.join(AGENT_DIR, 'state.json'), 'utf8')); } catch (e) {}
  if (!st) return res.json({ status: 'idle' });
  let shotTs = 0; try { shotTs = fs.statSync(path.join(AGENT_DIR, 'step.png')).mtimeMs; } catch (e) {}
  if (['running', 'starting', 'waiting_approval', 'waiting_input'].includes(st.status) && !agentAlive()) st.status = 'failed';
  res.json({ ...st, shotTs, alive: !!agentAlive() });
});
app.get('/api/agent/shot', (req, res) => {
  const f = require('path').join(AGENT_DIR, 'step.png');
  if (!require('fs').existsSync(f)) return res.status(404).json({ error: 'no screenshot yet' });
  res.sendFile(f, { dotfiles: 'allow' });
});
app.post('/api/agent/approve', (req, res) => {
  const fs = require('fs'), path = require('path');
  fs.mkdirSync(AGENT_DIR, { recursive: true });
  fs.writeFileSync(path.join(AGENT_DIR, (req.body || {}).ok ? 'approve.flag' : 'deny.flag'), '1');
  res.json({ ok: true });
});
app.post('/api/agent/answer', (req, res) => {
  const fs = require('fs'), path = require('path');
  fs.mkdirSync(AGENT_DIR, { recursive: true });
  fs.writeFileSync(path.join(AGENT_DIR, 'answer.txt'), String((req.body || {}).text || '').slice(0, 500));
  res.json({ ok: true });
});
app.post('/api/agent/stop', (req, res) => {
  const pid = agentAlive();
  if (pid) { try { process.kill(pid); } catch (e) {} }
  try {
    const fs = require('fs'), path = require('path');
    const st = JSON.parse(fs.readFileSync(path.join(AGENT_DIR, 'state.json'), 'utf8'));
    st.status = 'stopped'; fs.writeFileSync(path.join(AGENT_DIR, 'state.json'), JSON.stringify(st));
  } catch (e) {}
  res.json({ ok: true, wasRunning: !!pid });
});

// ── 24/7 PAPER BOOK — the daemon trades it; these endpoints are the terminal's view + hands ──
const PT_FILE2 = require('path')
```

### `/api/agent/shot` — serves the latest screenshot for the live preview

```javascript
app.get('/api/agent/shot', (req, res) => {
  const f = require('path').join(AGENT_DIR, 'step.png');
  if (!require('fs').existsSync(f)) return res.status(404).json({ error: 'no screenshot yet' });
  res.sendFile(f, { dotfiles: 'allow' });
});
app.post('/api/agent/approve', (req, res) => {
  const fs = require('fs'), path = require('path');
  fs.mkdirSync(AGENT_DIR, { recursive: true });
  fs.writeFileSync(path.join(AGENT_DIR, (req.body || {}).ok ? 'approve.flag' : 'deny.flag'), '1');
  res.json({ ok: true });
});
app.post('/api/agent/answer', (req, res) => {
  const fs = require('fs'), path = require('path');
  fs.mkdirSync(AGENT_DIR, { recursive: true });
  fs.writeFileSync(path.join(AGENT_DIR, 'answer.txt'), String((req.body || {}).text || '').slice(0, 500));
  res.json({ ok: true });
});
app.post('/api/agent/stop', (req, res) => {
  const pid = agentAlive();
  if (pid) { try { process.kill(pid); } catch (e) {} }
  try {
    const fs = require('fs'), path = require('path');
    const st = JSON.parse(fs.readFileSync(path.join(AGENT_DIR, 'state.json'), 'utf8'));
    st.status = 'stopped'; fs.writeFileSync(path.join(AGENT_DIR, 'state.json'), JSON.stringify(st));
  } catch (e) {}
  res.json({ ok: true, wasRunning: !!pid });
});

// ── 24/7 PAPER BOOK — the daemon trades it; these endpoints are the terminal's view + hands ──
const PT_FILE2 = require('path')
```

### `/api/agent/approve` — boss taps ✓ on a submit/signup/pay button

```javascript
app.post('/api/agent/approve', (req, res) => {
  const fs = require('fs'), path = require('path');
  fs.mkdirSync(AGENT_DIR, { recursive: true });
  fs.writeFileSync(path.join(AGENT_DIR, (req.body || {}).ok ? 'approve.flag' : 'deny.flag'), '1');
  res.json({ ok: true });
});
app.post('/api/agent/answer', (req, res) => {
  const fs = require('fs'), path = require('path');
  fs.mkdirSync(AGENT_DIR, { recursive: true });
  fs.writeFileSync(path.join(AGENT_DIR, 'answer.txt'), String((req.body || {}).text || '').slice(0, 500));
  res.json({ ok: true });
});
app.post('/api/agent/stop', (req, res) => {
  const pid = agentAlive();
  if (pid) { try { process.kill(pid); } catch (e) {} }
  try {
    const fs = require('fs'), path = require('path');
    const st = JSON.parse(fs.readFileSync(path.join(AGENT_DIR, 'state.json'), 'utf8'));
    st.status = 'stopped'; fs.writeFileSync(path.join(AGENT_DIR, 'state.json'), JSON.stringify(st));
  } catch (e) {}
  res.json({ ok: true, wasRunning: !!pid });
});

// ── 24/7 PAPER BOOK — the daemon trades it; these endpoints are the terminal's view + hands ──
const PT_FILE2 = require('path')
```

### `/api/agent/answer` — boss answers a question the agent asked

```javascript
app.post('/api/agent/answer', (req, res) => {
  const fs = require('fs'), path = require('path');
  fs.mkdirSync(AGENT_DIR, { recursive: true });
  fs.writeFileSync(path.join(AGENT_DIR, 'answer.txt'), String((req.body || {}).text || '').slice(0, 500));
  res.json({ ok: true });
});
app.post('/api/agent/stop', (req, res) => {
  const pid = agentAlive();
  if (pid) { try { process.kill(pid); } catch (e) {} }
  try {
    const fs = require('fs'), path = require('path');
    const st = JSON.parse(fs.readFileSync(path.join(AGENT_DIR, 'state.json'), 'utf8'));
    st.status = 'stopped'; fs.writeFileSync(path.join(AGENT_DIR, 'state.json'), JSON.stringify(st));
  } catch (e) {}
  res.json({ ok: true, wasRunning: !!pid });
});

// ── 24/7 PAPER BOOK — the daemon trades it; these endpoints are the terminal's view + hands ──
const PT_FILE2 = require('path')
```

### `/api/agent/stop` — kill switch

```javascript
app.post('/api/agent/stop', (req, res) => {
  const pid = agentAlive();
  if (pid) { try { process.kill(pid); } catch (e) {} }
  try {
    const fs = require('fs'), path = require('path');
    const st = JSON.parse(fs.readFileSync(path.join(AGENT_DIR, 'state.json'), 'utf8'));
    st.status = 'stopped'; fs.writeFileSync(path.join(AGENT_DIR, 'state.json'), JSON.stringify(st));
  } catch (e) {}
  res.json({ ok: true, wasRunning: !!pid });
});

// ── 24/7 PAPER BOOK — the daemon trades it; these endpoints are the terminal's view + hands ──
const PT_FILE2 = require('path')
```

### `/api/agent/queue` — task queue — GET / POST / remove

```javascript
app.get('/api/agent/queue', (req, res) => res.json(readQueue()));
app.post('/api/agent/queue', (req, res) => {
  const task = String((req.body || {}).task || '').trim().slice(0, 500);
  if (!task) return res.status(400).json({ error: 'task required' });
  const q = readQueue(); q.push({ task, ts: Date.now() }); writeQueue(q);
  res.json({ ok: true, queued: q.length });
});
app.post('/api/agent/queue/remove', (req, res) => {
  const q = readQueue(); q.splice((req.body || {}).i | 0, 1); writeQueue(q);
  res.json({ ok: true, queued: q.length });
});
app.get('/api/agent/journal', (req, res) => {
  try {
    const lines = require('fs').readFileSync(require('path').join(AGENT_DIR, 'journal.jsonl'), 'utf8').trim().split('\n').slice(-50);
    res.json(lines.map(l => { try { return JSON.parse(l); } catch (e) { return null; } }).filter(Boolean).reverse());
  } catch (e) { res.json([]); }
});
// the queue worker: when Bam is idle and work is stacked, he picks up the next task
setInterval(() => {
  try {
    const q = readQueue();
    if (!q.length || agentAlive()) return;   // a dead process can't be "waiting" — stale state never blocks the queue
    const next = q.shift();
```

### `/api/agent/journal` — agent's action log for the boss

```javascript
app.get('/api/agent/journal', (req, res) => {
  try {
    const lines = require('fs').readFileSync(require('path').join(AGENT_DIR, 'journal.jsonl'), 'utf8').trim().split('\n').slice(-50);
    res.json(lines.map(l => { try { return JSON.parse(l); } catch (e) { return null; } }).filter(Boolean).reverse());
  } catch (e) { res.json([]); }
});
// the queue worker: when Bam is idle and work is stacked, he picks up the next task
setInterval(() => {
  try {
    const q = readQueue();
    if (!q.length || agentAlive()) return;   // a dead process can't be "waiting" — stale state never blocks the queue
    const next = q.shift();
```


---

## 6 · Neurolink UI cards + dispatch
Location: `~/Downloads/index.html`

These are the 6 decorative cards you see in the Neurolink panel + the code that runs when you tap DISPATCH MINDS.

### `NEURO_AGENTS` — the 6 cards

```javascript
const NEURO_AGENTS = [
  ['ATLAS','researching the market'], ['SCRIBE','writing the product'],
  ['HUNTER','finding the next sale'], ['LEDGER','tracking the numbers'],
  ['MUSE','cooking a beat'], ['SENTRY','guarding your keys'],
];
```

### `dispatchAgents()` — what tapping DISPATCH MINDS runs

```javascript
async function dispatchAgents(){
  if(neuroBusy) return;
  neuroBusy = true;
  const btn = document.getElementById('neuro-dispatch');
  if(btn){ btn.disabled = true; btn.textContent = '⚡ MINDS WORKING…'; }
  const niche = getNiche();
  const haveModel = cfg.provider==='ollama' ? !!cfg.url : !!cfg.apikey;
  const setCard = (i, status, text) => {
    const c = document.getElementById('nx-ag-'+i); if(!c) return;
    c.querySelector('.nx-run').textContent = status;
    if(text!=null) c.querySelector('.nx-atask').textContent = text;
  };
  // ── deterministic minds (instant, real) ──
  // LEDGER — your real numbers
  (function(){
    let s;
    if(liveSales && liveSales.ok){ const pct = cfg.goal?Math.round((liveSales.revenue/cfg.goal)*100):0; s = '$'+liveSales.revenue.toFixed(0)+' · '+liveSales.salesCount+' sales · '+pct+'% to goal'; }
    else s = 'Connect Gumroad in ⚙ for live numbers';
    setCard(3,'done ✓', s);
  })();
  // SENTRY — real security state
  (function(){
    const enc = !!localStorage.getItem('jv-cfg-enc');
    setCard(5,'done ✓', enc ? 'Vault ENCRYPTED 🔒 — keys protected' : 'Keys UNENCRYPTED — set a PIN in ⚙ Security');
  })();
  // MUSE — queue a real beat style
  (function(){ const st=['trap','drill','lofi','boom bap','house'][(Math.random()*5)|0]; setCard(4,'done ✓','Queued a '+st+' beat — open 🎵 Beats to make it'); })();

  // ── LLM minds (run concurrently) ──
  const results = [];
  const llm = async (i, sysP, userP) => {
    if(!haveModel){ setCard(i,'idle','Add an API key in ⚙ to activate'); return; }
    setCard(i,'running…','thinking…');
    try{
      const out = await callAPIWithPrompt(sysP, [{role:'user', content:userP}], ()=>{});
      const clean = (out||'').replace(/\s+/g,' ').trim();
      setCard(i,'done ✓', clean.slice(0,180));
      results.push(NEURO_AGENTS[i][0]+': '+clean);
    }catch(e){ setCard(i,'error ✕', (e.message||'failed').slice(0,80)); }
  };
  const prods = (liveSales && liveSales.ok && liveSales.products && liveSales.products.length) ? ('My products: '+liveSales.products.map(p=>p.name).join(', ')+'. ') : '';
  await Promise.all([
    llm(0,'You are ATLAS, a sharp market researcher. Answer in ONE tight sentence.','Name ONE specific '+niche+' digital product that could sell right now, and why.'),
    llm(1,'You are SCRIBE, a direct-response copywriter. Reply with just a product title and a one-sentence hook.','Draft a '+niche+' digital product title + hook.'),
    llm(2,'You are HUNTER, a sales strategist. Reply with ONE concrete action, one sentence.', prods+'What is the single best move to make a sale this week for a '+niche+' creator?'),
  ]);

  neuroBusy = false;
  if(btn){ btn.disabled = false; btn.textContent = '⚡ DISPATCH MINDS'; }
  // drop a combined briefing into the chat so the work is actually usable
  if(results.length){
    addMsg('jarvis','assistant','🧠 PARALLEL MINDS — briefing\n\n'+results.join('\n\n'));
    sfx('recv');
  }
  toast('Minds finished');
}
```


---

## 7 · Support modules
These support agents but aren't agents themselves — memory spine, budget, autonomy, outcomes, triggers.

### `memory.js` — vector memory — nomic-embed via ollama, brute-force cosine, 25k cap

Location: `~/jarvis-api/memory.js`

```javascript
// BAM's long-term memory — the spine everything else compounds on.
// Local-only: nomic-embed-text via ollama (:11434), vectors + text in
// ~/.jarvis/memory/mem.jsonl (one JSON line per memory, vec as base64 Float32).
// Brute-force cosine over RAM — fine into the tens of thousands of memories.
// Feeds: chat turns (server adds), ledger.jsonl, agent journal, brain facts.
const fs = require('fs'), path = require('path'), os = require('os'), crypto = require('crypto');

const J = path.join(os.homedir(), '.jarvis');
const DIR = path.join(J, 'memory');
const MEM_F = path.join(DIR, 'mem.jsonl');
const OFF_F = path.join(DIR, 'offsets.json');
const EMBED_URL = 'http://127.0.0.1:11434/api/embeddings';
const EMBED_MODEL = 'nomic-embed-text';
const CAP = 25000;            // beyond this, oldest non-brain memories get pruned

let MEMS = [];                // {id, ts, kind, text, vec:Float32Array|null}
let SEEN = new Set();         // content hashes — dedupe across restarts

const hash = (s) => crypto.createHash('md5').update(s).digest('hex').slice(0, 16);
const log = (...a) => console.log(new Date().toISOString().slice(0, 19), '[memory]', ...a);

function init() {
  fs.mkdirSync(DIR, { recursive: true });
  try {
    const lines = fs.readFileSync(MEM_F, 'utf8').trim().split('\n');
    for (const l of lines) {
      try {
        const m = JSON.parse(l);
        m.vec = null;
        if (m.v) { const b = Buffer.from(m.v, 'base64'); m.vec = new Float32Array(b.buffer, b.byteOffset, b.length / 4); }
        delete m.v;
        MEMS.push(m); SEEN.add(m.id);
      } catch (e) {}
    }
  } catch (e) {}
  log('loaded', MEMS.length, 'memories');
}

async function embed(text) {
  try {
    const r = await fetch(EMBED_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ model: EMBED_MODEL, prompt: String(text).slice(0, 2000) }), signal: AbortSignal.timeout(15000) });
    const d = await r.json();
    if (Array.isArray(d.embedding) && d.embedding.length) return Float32Array.from(d.embedding);
  } catch (e) {}
  return null;
}

async function add(kind, text, ts) {
  text = String(text || '').replace(/\s+/g, ' ').trim().slice(0, 800);
  if (text.length < 8) return null;
  const id = hash(kind + '|' + text);
  if (SEEN.has(id)) return null;
  const vec = await embed(kind + ': ' + text);
  const m = { id, ts: ts || Date.now(), kind, text, vec };
  MEMS.push(m); SEEN.add(id);
  const line = JSON.stringify({ id: m.id, ts: m.ts, kind, text, v: vec ? Buffer.from(vec.buffer, vec.byteOffset, vec.byteLength).toString('base64') : undefined });
  try { fs.appendFileSync(MEM_F, line + '\n'); } catch (e) {}
  if (MEMS.length > CAP) prune();
  return m;
}

function prune() {
  // keep all brain facts + the newest of everything else
  const keep = MEMS.filter(m => m.kind === 'brain');
  const rest = MEMS.filter(m => m.kind !== 'brain').sort((a, b) => b.ts - a.ts).slice(0, CAP - keep.length - 500);
  MEMS = keep.concat(rest).sort((a, b) => a.ts - b.ts);
  SEEN = new Set(MEMS.map(m => m.id));
  const out = MEMS.map(m => JSON.stringify({ id: m.id, ts: m.ts, kind: m.kind, text: m.text, v: m.vec ? Buffer.from(m.vec.buffer, m.vec.byteOffset, m.vec.byteLength).toString('base64') : undefined })).join('\n') + '\n';
  try { fs.writeFileSync(MEM_F + '.tmp', out); fs.renameSync(MEM_F + '.tmp', MEM_F); } catch (e) {}
  log('pruned to', MEMS.length);
}

function cosine(a, b) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length && i < b.length; i++) { dot += a[i] * b[i]; na += a[i] * a[i]; nb += b[i] * b[i]; }
  return dot / (Math.sqrt(na) * Math.sqrt(nb) + 1e-9);
}

async function search(query, k = 6) {
  query = String(query || '').trim();
  if (!query) return [];
  const qv = await embed(query);
  if (qv) {
    const now = Date.now();
    // durable knowledge (what BAM was taught / corrected on) matters more than chatter
    const kindWeight = (kind) => kind === 'rule' ? 0.06 : kind === 'lesson' ? 0.05 : kind === 'brain' ? 0.04 : kind.startsWith('action') ? 0.01 : 0;
    // gentle recency lift: full at <2d, fading to 0 by ~60d — relevance still leads
    const recency = (ts) => 0.05 * Math.exp(-(now - ts) / (20 * 864e5));
    const scored = MEMS.filter(m => m.vec)
      .map(m => { const base = cosine(qv, m.vec); return { m, base, s: base + kindWeight(m.kind) + recency(m.ts) }; })
      .filter(x => x.base > 0.5)                                  // threshold on RELEVANCE, not the boosted score
      .sort((a, b) => b.s - a.s);
    // dedup near-identical memories (keep the strongest of each)
    const out = [], seenTxt = [];
    for (const x of scored) {
      const t = x.m.text.toLowerCase().slice(0, 60);
      if (seenTxt.some(s => s === t)) continue;
      seenTxt.push(t); out.push({ ts: x.m.ts, kind: x.m.kind, text: x.m.text, score: +x.base.toFixed(3) });
      if (out.length >= k) break;
    }
    return out;
  }
  // embeddings down → crude keyword fallback so memory never fully disappears
  const words = query.toLowerCase().split(/\W+/).filter(w => w.length > 3);
  return MEMS.map(m => ({ m, s: words.filter(w => m.text.toLowerCase().includes(w)).length }))
    .filter(x => x.s > 0).sort((a, b) => b.s - a.s || b.m.ts - a.m.ts).slice(0, k)
    .map(x => ({ ts: x.m.ts, kind: x.m.kind, text: x.m.text, score: x.s }));
}

// formatted block for prompt injection — or '' when nothing relevant
async function recallBlock(query) {
  const hits = await search(query, 5);
  if (!hits.length) return '';
  const fdate = (ts) => new Date(ts).toISOString().slice(0, 10);
  return '\n\n[LONG-TERM MEMORY — real entries from your own logs, most relevant first. Use them if they help; ignore if not. Never invent memories beyond these.]\n'
    + hits.map(h => '• (' + fdate(h.ts) + ' ' + h.kind + ') ' + h.text).join('\n');
}

function stats() {
  const by = {};
  MEMS.forEach(m => { by[m.kind] = (by[m.kind] || 0) + 1; });
  return { total: MEMS.length, embedded: MEMS.filter(m => m.vec).length, by };
}

// ── INGEST — tail the house's own records into memory ──────────────────────
function readOff() { try { return JSON.parse(fs.readFileSync(OFF_F, 'utf8')); } catch (e) { return {}; } }
function writeOff(o) { try { fs.writeFileSync(OFF_F, JSON.stringify(o)); } catch (e) {} }

async function tailJsonl(file, offKey, toMem) {
  const off = readOff();
  let st; try { st = fs.statSync(file); } catch (e) { return 0; }
  let pos = off[offKey] || 0;
  if (pos > st.size) pos = 0;                       // file was rotated/truncated
  if (pos >= st.size) return 0;
  const fd = fs.openSync(file, 'r');
  const buf = Buffer.alloc(Math.min(st.size - pos, 512 * 1024));
  fs.readSync(fd, buf, 0, buf.length, pos); fs.closeSync(fd);
  const chunk = buf.toString('utf8');
  const lastNl = chunk.lastIndexOf('\n');
  if (lastNl < 0) return 0;                         // no complete line yet
  let n = 0;
  for (const l of chunk.slice(0, lastNl).split('\n')) {
    if (!l.trim()) continue;
    try { const o = JSON.parse(l); const { kind, text, ts } = toMem(o) || {}; if (text && await add(kind, text, ts)) n++; } catch (e) {}
  }
  off[offKey] = pos + lastNl + 1; writeOff(off);
  return n;
}

let ingesting = false;
async function ingest() {
  if (ingesting) return; ingesting = true;
  try {
    let n = 0;
    n += await tailJsonl(path.join(J, 'ledger.jsonl'), 'ledger',
      (o) => ({ kind: 'action:' + (o.kind || 'misc'), text: o.msg, ts: o.ts }));
    n += await tailJsonl(path.join(J, 'agent', 'journal.jsonl'), 'journal',
      (o) => ({ kind: 'agent', text: (o.outcome || 'ran') + ': ' + (o.task || '') + (o.summary ? ' → ' + o.summary : ''), ts: o.ts }));
    try {   // brain facts: whole-file diff by content hash (small file)
      const items = JSON.parse(fs.readFileSync(path.join(J, 'brain.json'), 'utf8'));
      for (const it of (Array.isArray(items) ? items : [])) {
        if (await add('brain', (it.category ? it.category + ': ' : '') + (it.fact || ''), Date.parse(it.date) || Date.now())) n++;
      }
    } catch (e) {}
    if (n) log('ingested', n, 'new memories (', MEMS.length, 'total )');
  } catch (e) { log('ingest error', e.message); }
  ingesting = false;
}

function startIngest() { ingest(); setInterval(ingest, 60_000); }

module.exports = { init, add, search, recallBlock, stats, startIngest, embed };

```

### `costs.js` — v2 · daily budget governor

Location: `~/jarvis-api/costs.js`

```javascript
// ═══ costs.js — daily budget governor with hard stop ═══
// Per BAM_UPGRADE_ORDER_V2 #4: cap what any provider can burn per day, so a
// stuck loop can't rack up a bill overnight. At 90% of cap: log a warning +
// prefer local fallback. At 100%: overBudget() returns true so callers can
// short-circuit to local ollama.
const fs = require('fs');
const path = require('path');
const os = require('os');

const F = path.join(os.homedir(), '.jarvis', 'budget.json');
// USD per 1M tokens. Add models as you use them; unknowns default to $1/$1.
const PRICE = {
  // Groq (public price sheet Aug 2026 — update as it changes)
  'llama-3.3-70b-versatile': { in: 0.59, out: 0.79 },
  'llama-3.1-8b-instant':    { in: 0.05, out: 0.08 },
  // OpenAI (approximate — replace with the actual pricing you're on)
  'gpt-4o-mini':             { in: 0.15, out: 0.60 },
  'gpt-4o':                  { in: 2.50, out: 10.00 },
  // Anthropic
  'claude-haiku-4-5-20251001': { in: 0.25, out: 1.25 },
  // local ollama — always free
  'qwen2.5:3b':              { in: 0,    out: 0 },
  'llama3.2:3b':             { in: 0,    out: 0 },
};

function today() { return new Date().toISOString().slice(0, 10); }
function load() {
  try {
    const b = JSON.parse(fs.readFileSync(F, 'utf8'));
    if (b.date !== today()) { b.date = today(); b.spent = 0; b.calls = 0; b.history = (b.history || []).concat({ date: b.date, spent: b.spent }).slice(-30); }
    return b;
  } catch (e) {
    return { date: today(), spent: 0, calls: 0, cap: 2.00, history: [] };
  }
}
function save(b) {
  try {
    const tmp = F + '.tmp';
    fs.writeFileSync(tmp, JSON.stringify(b, null, 1));
    fs.renameSync(tmp, F);
  } catch (e) {}
}

// Bill a call. Returns updated budget snapshot.
function bill(model, inTok, outTok) {
  const b = load();
  const p = PRICE[model] || { in: 1, out: 1 };
  const cost = (inTok / 1e6) * p.in + (outTok / 1e6) * p.out;
  b.spent += cost;
  b.calls = (b.calls || 0) + 1;
  b.last = { model, inTok, outTok, cost, t: Date.now() };
  save(b);
  return b;
}

// Ratio 0..1 (or >1 if over cap)
function ratio() { const b = load(); return b.spent / Math.max(0.01, b.cap); }
function overBudget() { return ratio() >= 1; }
function nearBudget() { return ratio() >= 0.9; }
function budgetLeft() { const b = load(); return Math.max(0, b.cap - b.spent); }

function setCap(usd) {
  const b = load(); b.cap = Number(usd) || 2; save(b); return b;
}

function summary() {
  const b = load();
  return {
    date: b.date, spent: +b.spent.toFixed(4), cap: b.cap, calls: b.calls || 0,
    left: +budgetLeft().toFixed(4), ratio: +ratio().toFixed(3),
    over: overBudget(), near: nearBudget(),
    last: b.last || null, history: (b.history || []).slice(-14),
  };
}

module.exports = { bill, ratio, overBudget, nearBudget, budgetLeft, setCap, summary, PRICE };

```

### `autonomy.js` — v2 · per-action daily caps

Location: `~/jarvis-api/autonomy.js`

```javascript
// ═══ autonomy.js — per-action daily caps so BAM can work while you sleep ═══
// Per BAM_UPGRADE_ORDER_V2 #10: every autonomous action checks against a budget
// before firing. Anything above the cap becomes a decision-bar item instead of
// silently piling up in queue or worse, silently running unbounded.
const fs = require('fs');
const path = require('path');
const os = require('os');

const F = path.join(os.homedir(), '.jarvis', 'autonomy.json');
const DEFAULTS = {
  // messaging + comment reply — cheap, low blast radius
  reply_youtube_comment: { max_per_day: 20, spend_cap_usd: 0.00, reason: '' },
  reply_lead_email:      { max_per_day: 10, spend_cap_usd: 0.00, reason: '' },
  // creation — moderate blast radius, gated on niche being set
  post_short_video:      { max_per_day: 2,  spend_cap_usd: 0.00, requires: ['niche'], reason: '' },
  build_lead_site:       { max_per_day: 3,  spend_cap_usd: 0.00, reason: '' },
  // research + agents — cost real tokens
  run_deep_research:     { max_per_day: 5,  spend_cap_usd: 1.00, reason: '' },
  run_web_agent:         { max_per_day: 8,  spend_cap_usd: 1.00, reason: '' },
  // MONEY — never autonomous, always ask (0/day). Never override this
  // without explicit boss action + written note.
  gumroad_publish:       { max_per_day: 0,  spend_cap_usd: 0.00, reason: 'always ask — publishing = money' },
  ad_spend:              { max_per_day: 0,  spend_cap_usd: 0.00, reason: 'always ask — money' },
  live_trade:            { max_per_day: 0,  spend_cap_usd: 0.00, reason: 'always ask — money at risk' },
};

function today() { return new Date().toISOString().slice(0, 10); }
function load() {
  let cfg;
  try { cfg = JSON.parse(fs.readFileSync(F, 'utf8')); }
  catch (e) { cfg = { rules: DEFAULTS, counters: { date: today() } }; save(cfg); return cfg; }
  // fill any missing rule with the default (so a new action doesn't crash the check)
  for (const k of Object.keys(DEFAULTS)) if (!cfg.rules[k]) cfg.rules[k] = DEFAULTS[k];
  // reset daily counters
  if (!cfg.counters || cfg.counters.date !== today()) cfg.counters = { date: today() };
  return cfg;
}
function save(cfg) {
  try { const tmp = F + '.tmp'; fs.writeFileSync(tmp, JSON.stringify(cfg, null, 1)); fs.renameSync(tmp, F); }
  catch (e) {}
}

// Ask before you act. Returns { ok, reason, remaining }.
// `context` may include { niche, spent_today } for gates like `requires: ['niche']`.
function allow(action, cost, context) {
  const cfg = load();
  const r = cfg.rules[action];
  if (!r) return { ok: false, reason: 'no rule for "' + action + '" — add it to ' + F, remaining: 0 };
  const usedToday = (cfg.counters[action] || 0);
  const remaining = r.max_per_day - usedToday;
  if (remaining <= 0) return { ok: false, reason: r.reason || (action + ': daily cap reached (' + r.max_per_day + ')'), remaining: 0 };
  if (r.requires && Array.isArray(r.requires)) {
    for (const need of r.requires) if (!(context && context[need])) return { ok: false, reason: action + ' requires context.' + need + ' to be set', remaining };
  }
  if ((r.spend_cap_usd || 0) > 0 && (context && context.spent_today != null)) {
    if (context.spent_today + (cost || 0) > r.spend_cap_usd) return { ok: false, reason: action + ': spend_cap_usd would exceed $' + r.spend_cap_usd, remaining };
  }
  return { ok: true, reason: '', remaining };
}

// Record that an autonomous action actually fired.
function consume(action) {
  const cfg = load();
  cfg.counters[action] = (cfg.counters[action] || 0) + 1;
  save(cfg);
  return cfg.counters[action];
}

function summary() {
  const cfg = load();
  const out = { date: cfg.counters.date, rules: {} };
  for (const k of Object.keys(cfg.rules)) {
    const r = cfg.rules[k];
    const used = cfg.counters[k] || 0;
    out.rules[k] = { used, cap: r.max_per_day, spend_cap_usd: r.spend_cap_usd, reason: r.reason, remaining: r.max_per_day - used };
  }
  return out;
}

function setRule(action, patch) {
  const cfg = load();
  cfg.rules[action] = Object.assign({}, cfg.rules[action] || {}, patch);
  save(cfg);
  return cfg.rules[action];
}

module.exports = { allow, consume, summary, setRule, DEFAULTS };

```

### `outcomes.js` — v2 · outcome contracts on every approve

Location: `~/jarvis-api/outcomes.js`

```javascript
// ═══ outcomes.js — score every approved decision against a real KPI ═══
// Per BAM_UPGRADE_ORDER_V2 #7: at approve time, record a baseline of the KPI
// this decision was supposed to move. At 1d / 7d / 30d, recompute + record
// the delta. The weekly self-review then reads outcomes.jsonl instead of
// guessing whether its own suggestions worked.
const fs = require('fs');
const path = require('path');
const os = require('os');

const F = path.join(os.homedir(), '.jarvis', 'outcomes.jsonl');
const PENDING_F = path.join(os.homedir(), '.jarvis', 'outcomes-pending.json');

// Map decision kind → KPI to watch. Extend as more categories are added.
const KPI_MAP = {
  'video-publish':  'yt_views_24h',
  'video-batch':    'yt_views_24h',
  'code-request':   'error_rate_24h',
  'code-review':    'error_rate_24h',
  'mission':        'ledger_actions_24h',
  'agent':          'ledger_actions_24h',
  'site':           'leads_pitched_24h',
  'default':        'ledger_actions_24h',
};

// Snapshot the current KPI value (called at approve time + at each check).
// If a KPI reader isn't wired yet, returns null → outcome still recorded but
// its delta stays null until the reader exists. Honest failure.
function readKPI(name) {
  try {
    const home = os.homedir();
    switch (name) {
      case 'yt_views_24h': {
        // sum views of videos published in the last 24h — best-effort
        const st = path.join(home, '.jarvis', 'daemon-state.json');
        const s = JSON.parse(fs.readFileSync(st, 'utf8'));
        return (s && s.ytStats && Number.isFinite(s.ytStats.views24h)) ? s.ytStats.views24h : null;
      }
      case 'error_rate_24h': {
        const L = tailJsonl(path.join(home, '.jarvis', 'ledger.jsonl'), 500);
        const since = Date.now() - 24 * 3600e3;
        const recent = L.filter(l => (l.t || 0) >= since);
        if (!recent.length) return 0;
        const bad = recent.filter(l => /fail|error|✕/.test((l.note || '') + ' ' + (l.kind || ''))).length;
        return +(bad / recent.length).toFixed(3);
      }
      case 'ledger_actions_24h': {
        const L = tailJsonl(path.join(home, '.jarvis', 'ledger.jsonl'), 800);
        const since = Date.now() - 24 * 3600e3;
        return L.filter(l => (l.t || 0) >= since).length;
      }
      case 'leads_pitched_24h': {
        const L = tailJsonl(path.join(home, '.jarvis', 'ledger.jsonl'), 800);
        const since = Date.now() - 24 * 3600e3;
        return L.filter(l => (l.t || 0) >= since && l.kind === 'mail' && /pitched/i.test(l.note || '')).length;
      }
      case 'gumroad_sales_24h': {
        // will be non-null after v2 #3 lands
        const G = path.join(home, '.jarvis', 'gumroad-history.json');
        if (!fs.existsSync(G)) return null;
        const g = JSON.parse(fs.readFileSync(G, 'utf8'));
        const since = Date.now() - 24 * 3600e3;
        return (g.sales || []).filter(s => (s.t || 0) >= since).length;
      }
    }
  } catch (e) {}
  return null;
}

// Called at approve time. `decision` should include { id, kind, title }.
function record(decision) {
  const kpi = KPI_MAP[decision.kind] || KPI_MAP.default;
  const baseline = readKPI(kpi);
  const outcomeId = String(decision.id || Date.now().toString(36));
  const now = Date.now();
  const rec = {
    outcome_id: outcomeId,
    decision: { id: decision.id || null, kind: decision.kind || 'unknown', title: (decision.title || '').slice(0, 200) },
    kpi, baseline, t_approved: now,
    checks: [
      { at: now + 24 * 3600e3, done: false },
      { at: now + 7 * 864e5,   done: false },
      { at: now + 30 * 864e5,  done: false },
    ],
  };
  appendPending(rec);
  return rec;
}

// Poll — call from the daemon tick. Runs any due checks, writes outcome rows.
function tick() {
  const pending = loadPending();
  const now = Date.now();
  let fired = 0;
  for (const rec of pending) {
    for (const c of rec.checks) {
      if (c.done || c.at > now) continue;
      const cur = readKPI(rec.kpi);
      const delta = (cur != null && rec.baseline != null) ? +(cur - rec.baseline).toFixed(3) : null;
      const days = Math.round((c.at - rec.t_approved) / 864e5);
      const line = JSON.stringify({
        t: now, outcome_id: rec.outcome_id, kind: rec.decision.kind, title: rec.decision.title,
        kpi: rec.kpi, baseline: rec.baseline, at_check: cur, delta, days,
      }) + '\n';
      try { fs.appendFileSync(F, line); } catch (e) {}
      c.done = true; fired++;
    }
  }
  // drop fully-done records
  const stillPending = pending.filter(r => r.checks.some(c => !c.done));
  savePending(stillPending);
  return { fired, pending: stillPending.length };
}

function summary(n) {
  n = n || 40;
  const rows = tailJsonl(F, n * 3);
  return {
    outcomes: rows.slice(-n).reverse(),
    pending: loadPending().length,
  };
}

// helpers
function loadPending() { try { return JSON.parse(fs.readFileSync(PENDING_F, 'utf8')); } catch (e) { return []; } }
function savePending(a) { try { const tmp = PENDING_F + '.tmp'; fs.writeFileSync(tmp, JSON.stringify(a, null, 1)); fs.renameSync(tmp, PENDING_F); } catch (e) {} }
function appendPending(rec) { const a = loadPending(); a.push(rec); savePending(a); }
function tailJsonl(f, n) {
  try {
    const raw = fs.readFileSync(f, 'utf8').trim().split('\n');
    return raw.slice(-n).map(l => { try { return JSON.parse(l); } catch (e) { return null; } }).filter(Boolean);
  } catch (e) { return []; }
}

module.exports = { record, tick, summary, readKPI, KPI_MAP };

```

### `triggers.js` — v2 · real-world trigger loop

Location: `~/jarvis-api/triggers.js`

```javascript
// ═══ triggers.js — the world kicks the machine ═══
// Per BAM_UPGRADE_ORDER_V2 #9: BAM only reacts to timers and boss commands.
// This loop lets URLs, feeds, and event streams fire actions the moment they
// change state. Drivers implemented:
//   - http-poll: fetch a URL every N minutes, compare to last snapshot,
//     fire when content or a picked field changes.
//   - youtube-comments: (skeleton) poll a channel for new comments.
// Webhook drivers require public inbound HTTP — skeleton only until #6 lands.
const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');

const F  = path.join(os.homedir(), '.jarvis', 'triggers.json');
const ST = path.join(os.homedir(), '.jarvis', 'triggers-state.json');

// Ship with an empty list; boss adds triggers via API or by editing the file.
// Example entries (commented format the loader accepts):
//   {
//     "id":"competitor-price",
//     "source":"http-poll",
//     "interval_min":360,
//     "url":"https://competitor.example/pricing",
//     "watch":"body",                // "body" or a css-selector or a JSON path
//     "action":"chat:review_pricing",
//     "note":"BAM reviews when their pricing page changes"
//   }
function load() {
  try { return JSON.parse(fs.readFileSync(F, 'utf8')); }
  catch (e) { fs.writeFileSync(F, '[]'); return []; }
}
function loadState() {
  try { return JSON.parse(fs.readFileSync(ST, 'utf8')); }
  catch (e) { return {}; }
}
function saveState(s) {
  try { const tmp = ST + '.tmp'; fs.writeFileSync(tmp, JSON.stringify(s, null, 1)); fs.renameSync(tmp, ST); }
  catch (e) {}
}
function hash(s) { return crypto.createHash('sha256').update(String(s || '')).digest('hex').slice(0, 16); }

// Main entry — call from the daemon tick. Returns { fired: [...trigger ids] }.
async function tick(deps) {
  const list = load();
  const state = loadState();
  const now = Date.now();
  const fired = [];
  for (const t of list) {
    if (!t || !t.id || !t.source) continue;
    const s = state[t.id] = state[t.id] || {};
    const iv = Math.max(60_000, (t.interval_min || 15) * 60_000);
    if (s.last && now - s.last < iv) continue;
    s.last = now;
    try {
      if (t.source === 'http-poll') {
        const r = await fetch(t.url, { signal: AbortSignal.timeout(15_000) });
        const text = await r.text();
        const picked = pickField(text, t.watch);
        const h = hash(picked);
        if (s.hash && s.hash !== h) {
          fired.push(t.id);
          await runAction(t.action, { trigger: t, before: s.snippet, after: picked.slice(0, 400) }, deps);
        }
        s.hash = h;
        s.snippet = picked.slice(0, 400);
      } else if (t.source === 'youtube-comments') {
        // Skeleton: needs yt api key + channelId. When wired, poll
        // youtube.commentThreads.list, dedupe by id, fire per new comment.
        s.skipped = 'youtube-comments driver not wired yet';
      } else if (t.source === 'webhook') {
        // Webhooks arrive out-of-band; this driver just marks itself as
        // present so `list()` reports it as "waiting". The receiver route
        // (to be added under /api/trigger/webhook/:id) fires the action.
        s.mode = 'webhook (receiver-driven)';
      } else {
        s.err = 'unknown source: ' + t.source;
      }
    } catch (e) {
      s.err = String(e && e.message || e);
    }
  }
  saveState(state);
  return { fired, count: list.length };
}

// pickField — extract watched content from a raw HTTP response.
// "body" = whole thing; "$.some.json.path" = JSON path; otherwise treat as
// a regex against the body (first match).
function pickField(text, watch) {
  if (!watch || watch === 'body') return String(text || '').slice(0, 200_000);
  if (typeof watch === 'string' && watch.startsWith('$.')) {
    try {
      const obj = JSON.parse(text);
      const parts = watch.slice(2).split('.');
      let cur = obj;
      for (const p of parts) { if (cur == null) break; cur = cur[p]; }
      return typeof cur === 'string' ? cur : JSON.stringify(cur || null);
    } catch (e) { return ''; }
  }
  try {
    const re = new RegExp(watch, 'i');
    const m = String(text).match(re);
    return m ? m[0] : '';
  } catch (e) { return ''; }
}

// Route the action string. Format: "namespace:function[:arg]"
async function runAction(action, ctx, deps) {
  if (!action || typeof action !== 'string') return;
  const [ns, fn, arg] = action.split(':');
  try {
    if (ns === 'chat' && deps && typeof deps.chat === 'function') {
      const prompt = 'A trigger fired.\ntrigger: ' + (ctx.trigger && ctx.trigger.id || '?') +
                    '\nchange:\n---before---\n' + (ctx.before || '') +
                    '\n---after---\n' + (ctx.after || '') +
                    (arg ? '\n\nboss note: ' + arg : '');
      await deps.chat(fn || 'review_trigger', prompt);
    } else if (ns === 'ledger' && deps && typeof deps.ledger === 'function') {
      deps.ledger('trigger', fn + ' fired: ' + (ctx.trigger && ctx.trigger.id || '?'));
    } else if (deps && typeof deps[ns] === 'function') {
      await deps[ns](fn, ctx);
    }
  } catch (e) {}
}

function add(t) {
  const list = load();
  if (!t.id) t.id = 't_' + Date.now().toString(36);
  list.push(t);
  fs.writeFileSync(F, JSON.stringify(list, null, 1));
  return t;
}
function remove(id) {
  const list = load().filter(t => t.id !== id);
  fs.writeFileSync(F, JSON.stringify(list, null, 1));
  return list.length;
}
function list() { return load(); }
function state() { return loadState(); }

module.exports = { tick, add, remove, list, state };

```


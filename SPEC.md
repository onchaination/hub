# ▣ Onchaination — Implementation Specification v0.1

**Status:** Staged implementation; phase 1 foundation implemented
**Project:** Onchaination  
**Canonical repository:** `github.com/onchaination/hub`  
**Website:** `onchaination.org`

## Multichain content rule

Content MUST be chain-neutral by default. Where examples depend on a network, name it explicitly and cover at least Ethereum and Solana when both are relevant. Document differences in assets, identifiers, execution, fees, token identities, and finality. A network-specific tool must clearly state its scope. Other chains can be added through ordinary content and explicit calculator formulas; the content schema does not impose a chain enum.

## Current implementation boundary

This repository implements **Phase 1 — Knowledge plane** (§57), with one useful item per path, language representations, and an Ethereum/Solana `network-fee` calculator. The four-path model is:

```text
Learn       → understand something
Tools       → use an interface
Strategies  → pursue an outcome
Skills      → perform a procedure
```

The rest of v0.1 remains the target architecture. Phase 2 identity, passkeys, claims, D1, attribution, and reward destinations are **not implemented** and the current site must not imply otherwise. No cloud directory, provider secrets, or nonfunctional identity UI is needed for this foundation. §58 is the full v0.1 acceptance target, not a claim that every checkbox has shipped.

Concrete phase 1 choices:

- Astro renders static pages; React hydrates only pages containing a widget. Plain CSS and system fonts keep the design small and readable.
- `web/src/lib/content.ts` reads root Markdown, validates metadata and local references, and renders with Markdown-it and Shiki. No content database or generated source registry is maintained.
- Section `README.md` files are plain index content, exempt from knowledge-item metadata. The root README owns the homepage introduction and Constitution through named HTML comment blocks.
- Standard Markdown remains canonical. Safe portable HTML supports details/summary and simple inline primitives; arbitrary HTML is rejected. Standalone widget comments are parsed as Markdown tokens, so code examples are never executed as widgets.
- Clean language `.md` representations preserve the source, including front matter and inert widget comments, at its relative path. Section indexes and nearby assets are published too.
- Canonical tag pages connect all paths; alias URLs redirect to canonical tags. Pagefind indexes only knowledge articles and offers a type filter. `fees`, `#fees`, and the configured alias `gas` share search behavior.
- AI provider links and the copyable context are centralized under `web/src/integrations/ai/`. Three one-line providers share the same reliable copy-and-open behavior; separate adapters can be introduced when behavior differs.
- Telegram uses its documented channel-level discussion widget with a clean canonical URL. Embeds load on reader request. A maintainer must configure the linked discussion group and manually publish clean canonical URLs once; local builds do not create Telegram posts. A forum/channel link is available if comments cannot load.
- A checked-in GitHub Actions workflow validates pull requests and can deploy the static site after Pages is enabled. DNS and channel administration are operational setup, not part of a local build.

See [web/README.md](./web/README.md) for the file map, commands, and publishing setup. No claim is made here that the site has been deployed or that Telegram channels have been configured.

---

## 1. Purpose

**▣ Onchaination**

> **An open group learning, building and sharing value onchain.**

Onchaination is an open knowledge and contribution hub for humans and agents.

The canonical knowledge lives in GitHub as Markdown. `onchaination.org` is the primary web interface over that knowledge.

Onchaination SHOULD remain:

```text
open
simple
transparent
GitHub-native
Markdown-first
static-first
chain-neutral
AI-readable
searchable
interactive where useful
cryptographically verifiable where trust matters
```

The core product consists of:

```text
Learn       → understand something
Tools       → use something
Strategies  → achieve an outcome
Skills      → do something
```

Onchaination also provides a minimal chain-neutral identity layer so contributions, referrals, claims, and future rewards can be attributed without conventional user accounts.

---

# 2. Core Principles

The implementation SHOULD follow:

> **Static for knowledge. Cryptographic proofs for identity. Cloud only where necessary.**

And:

> **Files are knowledge.  
> IDs identify it.  
> Folders classify it.  
> Hashtags connect it.  
> Widgets make it interactive.  
> AI makes it conversational.  
> Telegram makes it social.  
> GitHub makes contribution transparent.  
> Proofs make attribution verifiable.**

Infrastructure SHOULD NOT be introduced unless it solves a concrete requirement.

---

# 3. Contribution Flywheel

v0.1 SHOULD establish this loop:

```text
Learn
  ↓
Contribute
  ↓
Identify contributor
  ↓
Attribute contribution / referral
  ↓
Reward
  ↓
More contribution
```

The primitive path required from v0.1 is:

```text
Onchaination ID
       ↓
proof
       ↓
attribution
       ↓
reward destination
```

Sophisticated reputation, scoring, leaderboards, and automated payouts are not required.

---

# 4. Repository Structure

The canonical repository MUST be:

```text
github.com/onchaination/hub
```

Structure:

```text
hub/
├── README.md
├── CONTRIBUTING.md
├── SPEC.md
│
├── learn/
│   ├── README.md
│   └── ...
│
├── tools/
│   ├── README.md
│   └── ...
│
├── strategies/
│   ├── README.md
│   └── ...
│
├── skills/
│   ├── README.md
│   └── ...
│
├── web/
│   ├── src/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── widgets/
│   │   ├── integrations/
│   │   │   └── ai/
│   │   ├── lib/
│   │   └── styles/
│   ├── public/
│   ├── astro.config.mjs
│   ├── package.json
│   └── tsconfig.json
│
├── cloud/
│   ├── src/
│   │   ├── identity/
│   │   ├── claims/
│   │   ├── verification/
│   │   ├── attribution/
│   │   └── index.ts
│   ├── migrations/
│   ├── package.json
│   └── wrangler.jsonc
│
├── .onchaination/
│   └── tags.yml
│
└── .github/
    └── workflows/
        ├── pages.yml
        └── cloud.yml
```

The four knowledge directories MUST remain top-level:

```text
learn/
tools/
strategies/
skills/
```

They MUST NOT be hidden under `/web`, `/src`, `/content`, or another implementation directory.

`web/` renders knowledge.

`cloud/` provides the minimal identity, verification, and attribution services that cannot be implemented statically.

---

# 5. Project Foundation Files

## 5.1 `README.md`

`README.md` is the human-readable foundation of Onchaination.

It SHOULD contain a lightweight **Onchaination Constitution**.

This is a project charter, not a legal or governmental document.

It SHOULD explain simply:

- what Onchaination is;
- open knowledge;
- transparent contribution;
- user-controlled identity;
- verifiable claims;
- chain neutrality;
- humans and agents;
- attribution;
- rewards for contribution;
- simplicity.

It MUST NOT use unnecessary legal-style language.

The Constitution SHOULD change rarely.

The README SHOULD link to:

```text
Learn
Tools
Strategies
Skills
CONTRIBUTING.md
SPEC.md
Telegram
GitHub
```

---

## 5.2 `CONTRIBUTING.md`

`CONTRIBUTING.md` defines how people contribute.

It SHOULD explain:

- choosing Learn / Tools / Strategies / Skills;
- front matter;
- IDs;
- hashtags;
- links;
- images;
- YouTube;
- code;
- questions;
- widgets;
- pull requests;
- contribution attribution;
- optional association of GitHub identity with an Onchaination ID.

The default workflow SHOULD remain:

```text
Find something useful to improve
        ↓
Edit Markdown
        ↓
Open PR
        ↓
Review
        ↓
Merge
        ↓
Automatic deployment
```

Guiding rule:

> **Make the smallest useful contribution you can.**

Editorial rules SHOULD remain simple:

```text
Learn
→ explains a concept

Tool
→ describes or exposes something useful to use

Strategy
→ combines concepts, tools, and skills toward an outcome

Skill
→ describes a concrete capability
```

A knowledge page SHOULD solve one clear information need, be useful on its own, avoid unnecessary duplication and promotional copy, and prefer clarity over length.

---

## 5.3 `SPEC.md`

`SPEC.md` is this technical specification.

It defines the current implementation and MAY evolve independently from the high-level Constitution.

---

# 6. Technology

## Web

```text
Astro
TypeScript
React
Markdown
Pagefind
GitHub Actions
GitHub Pages
```

## Minimal cloud layer

```text
Cloudflare Workers
Cloudflare D1
WebAuthn / Passkeys
Ed25519 attestations
```

Architecture:

```text
GitHub Markdown
      ↓
Astro static build
      ↓
Pagefind
      ↓
GitHub Pages
      ↓
onchaination.org
```

Separately:

```text
cloud/
   ↓
Cloudflare Worker
   ↓
D1
```

The knowledge site MUST remain usable if the cloud identity service is unavailable.

---

# 7. Content Types

## Learn

Primary question:

> **What is this and how does it work?**

Examples:

```text
learn/blockchains/en.md
learn/wallets/en.md
learn/stablecoins/en.md
learn/collateral/en.md
learn/liquidation/en.md
```

## Tools

Primary question:

> **What can I use?**

Examples:

```text
tools/aave/en.md
tools/uniswap/en.md
tools/basescan/en.md
tools/health-factor-calculator/en.md
```

Tools MAY be informational, interactive, or both.

## Strategies

Primary question:

> **How can I achieve this outcome?**

Examples:

```text
strategies/borrow-without-selling/en.md
strategies/manage-liquidation-risk/en.md
strategies/generate-defi-cashflow/en.md
```

## Skills

Primary question:

> **How do I do this?**

Examples:

```text
skills/send-usdc/en.md
skills/read-smart-contract/en.md
skills/sign-message/en.md
skills/check-health-factor/en.md
```

A Skill describes a capability, not its performer.

Where relevant:

```text
Send USDC

Human
→ connect wallet
→ enter recipient
→ review
→ sign

Agent
→ resolve recipient
→ validate policy
→ construct action
→ authorize
→ submit
→ verify
```

Human and agent Skills MUST NOT be separated into different top-level folders.

---

# 8. Markdown Is Canonical

Every knowledge item MUST be a standard `.md` file.

The Markdown MUST remain useful when viewed directly on GitHub.

The website MAY enhance it, but the content MUST NOT depend on Astro, React, or JavaScript to be understandable.

Supported primitives include:

```text
headings
paragraphs
links
lists
tables
images
blockquotes
inline code
fenced code blocks
GitHub callouts
<details>
YouTube URLs
widget directives
```

---

# 9. Content Metadata

Every knowledge document MUST contain YAML front matter.

Example:

```yaml
---
schema: 1
id: stablecoins
title: What Is a Stablecoin?
description: Understand how stablecoins work onchain.
tags:
  - stablecoins
  - usdc
  - defi
---
```

Required:

```text
schema
id
title
description
tags
```

Optional:

```yaml
level: beginner

authors:
  - oc1...

updated: 2026-09-10

related:
  - wallets
  - collateral
```

`schema` MUST initially equal:

```yaml
schema: 1
```

The content type MUST be derived from its top-level folder rather than duplicated in front matter.

The following metadata MUST NOT be required:

```text
type
route
url
discussion
telegram post id
telegram chat id
```

These values are derived from repository structure, canonical URLs, or external systems.

---

# 10. Stable Content IDs and Languages

One item folder represents one globally unique stable content ID. Its name and every language file's `id` MUST match. Keep the folder name and ID when moving an item between sections. Translation filenames identify languages, never new content IDs.

```text
learn/
  transactions/
    en.md
    de.md
    uk.md
    images/
```

`en.md` is required and is the canonical/default representation. English contains the full metadata schema. Translations contain `schema`, the same `id`, translated `title` and `description`, and optional language-specific `updated` and `authors`. Tags, level, and related IDs are inherited from English. Do not translate or duplicate classification metadata.

Languages are discovered from lowercase language-tag filenames, such as `uk.md` or `pt-br.md`. No language registry or i18n framework is required. A translation must have a nonempty body; incomplete placeholders must not be published as available translations.

Canonical English HTML is `/learn/transactions`; German HTML is `/learn/transactions/de`. Canonical Markdown sources retain their repository paths: `/learn/transactions/en.md` and `/learn/transactions/de.md`. The same convention applies to Tools, Strategies, and Skills. The four section `README.md` files remain plain index content, not knowledge items.

For every language discovered anywhere in the repository, each item has a static language route. If that item lacks the requested translation, render `en.md`, display an English fallback notice, use English `lang` and canonical metadata, and exclude the duplicate fallback from indexing. Unknown language tags fall back to English in the content resolver and search selector; arbitrary undiscovered URL paths remain 404 on static hosting.

Only actual translations appear in `hreflang`, the sitemap, and the Pagefind language indexes. Search combines the selected language with English for untranslated items, returning one result per stable ID. Home, section lists, tag counts, and related content count items, never language files. `/llms.txt` groups language representations beneath each stable ID. AI context links to the actual selected source, including its language.

The navigation shell and widget labels remain English in this foundation; content localization does not require a site-wide interface translation framework. Every locale route exposes the discussion interface and points its canonical metadata to the clean English/default route, giving all representations one shared Telegram discussion identity.

---

# 11. Hashtags

Folders describe **what kind of knowledge** something is.

Hashtags describe **what it is about**.

Example:

```yaml
tags:
  - defi
  - lending
  - aave
  - collateral
```

Website rendering:

```text
#defi  #lending  #aave  #collateral
```

Each hashtag MUST be clickable.

Canonical routes:

```text
/tags/defi
/tags/lending
/tags/aave
```

Hashtags MUST connect all content types.

For example, `#aave` MAY show:

```text
What Is DeFi Lending?      Learn
Aave                       Tool
Borrow Without Selling     Strategy
Borrow USDC                Skill
```

Searching `aave` and `#aave` SHOULD behave equivalently.

---

# 12. Tag Aliases

Canonical aliases MAY live in:

```text
.onchaination/tags.yml
```

Example:

```yaml
ethereum:
  aliases:
    - eth

stablecoins:
  aliases:
    - stablecoin

liquidity:
  aliases:
    - lp
```

This prevents unnecessary tag fragmentation.

---

# 13. Website Routes

Primary routes:

```text
/
/learn
/tools
/strategies
/skills
/search
/tags/:tag
```

Markdown mapping:

```text
learn/stablecoins/en.md
→ /learn/stablecoins

tools/aave/en.md
→ /tools/aave

strategies/borrow-without-selling/en.md
→ /strategies/borrow-without-selling

skills/send-usdc/en.md
→ /skills/send-usdc
```

Each section's `README.md` SHOULD provide the canonical content for its section index.

## Canonical URLs

Every published page MUST have one clean canonical URL.

Example:

```text
https://onchaination.org/learn/stablecoins
```

The page MUST expose:

```html
<link rel="canonical" href="https://onchaination.org/learn/stablecoins" />
```

Tracking and referral parameters MUST NOT change the canonical URL. A visitor MAY arrive through a referral URL, but the canonical URL remains clean.

```text
Canonical URL → content identity and Telegram discussion identity
UTM URL       → attribution only
```

## Social previews

Every real content representation MUST expose Open Graph and Twitter/X card
metadata with a localized 1200×630 PNG. The image MUST be generated at build
time from Markdown metadata using the shared Onchaination template and
published as a static Astro route. Social preview generation MUST NOT depend on
an external image service or a runtime server.

English and translated images follow the content routes:

```text
/og/learn/transactions.png
/og/learn/transactions/de.png
```

Untranslated locale fallbacks MUST reuse the English social image, matching the
English content and canonical metadata they render.

---

# 14. Clean Markdown Routes

Every knowledge page MUST also expose a clean Markdown representation.

Example:

```text
/learn/stablecoins
/learn/stablecoins/en.md
```

The `.md` representation MUST exclude:

```text
website navigation
Telegram UI
generated buttons
interactive widget UI
presentation-only markup
```

The HTML page SHOULD advertise it:

```html
<link
  rel="alternate"
  type="text/markdown"
  href="https://onchaination.org/learn/stablecoins/en.md"
/>
```

---

# 15. Images, Video, Code, Questions

## Images

Assets SHOULD live close to their content:

```text
learn/
├── lending.md
└── images/
    └── lending-flow.png
```

Usage:

```md
![DeFi lending flow](./images/lending-flow.png)
```

## YouTube

A standalone YouTube URL SHOULD become a lazy-loaded embedded player on the website.

```md
https://www.youtube.com/watch?v=VIDEO_ID
```

It MUST remain a normal clickable link on GitHub.

Timestamp URLs SHOULD work.

## Code

Standard fenced code blocks MUST work.

````md
```ts
const balance = await publicClient.getBalance({
  address,
});
```
````

The web renderer SHOULD add:

```text
syntax highlighting
copy button
```

## Questions

Use portable `<details>`:

```md
<details>
<summary>❓ What is a health factor?</summary>

A health factor indicates how close a lending position is to liquidation.

</details>
```

## Callouts

GitHub-compatible callouts SHOULD work:

```md
> [!TIP]
> Check the network before sending funds.
```

---

# 16. Widget System

Markdown MAY inject reusable widgets:

```md
<!-- widget:health-factor -->
```

Parameters MAY be supplied:

```md
<!-- widget:health-factor protocol=aave chain=base -->
```

GitHub ignores the directive.

The web renderer replaces it with an interactive component.

Widgets MAY appear in:

```text
Learn
Tools
Strategies
Skills
```

They MUST NOT be tied exclusively to `/tools`.

---

# 17. Widget Registry

Widgets MUST use stable IDs registered centrally.

```ts
const widgets = {
  "health-factor": HealthFactor,
  "ltv-calculator": LtvCalculator,
};
```

Markdown MUST NOT import React or reference implementation paths.

Widget parameters SHOULD be defined by a small typed schema per widget. Unknown widget names or invalid parameters MUST fail content validation.

Astro SHOULD hydrate React only when the page actually requires the widget.

The widget architecture SHOULD leave room for later:

```text
calculators
visualizations
wallet connection
blockchain reads
transactions
verification
```

Wallet and transaction widgets are not required for v0.1.

---

# 18. Search and Related Knowledge

Pagefind MUST provide completely static search.

Index:

```text
title
description
body
hashtags
content type
```

Filters SHOULD include:

```text
All
Learn
Tools
Strategies
Skills
```

Related knowledge SHOULD primarily be generated from common hashtags.

Explicit front-matter relationships MAY override or supplement generated relationships:

```yaml
related:
  - collateral
  - aave
  - borrow-usdc
```

---

# 19. Telegram Architecture

Telegram roles are intentionally separated:

```text
@onchaination_info
→ publishing / updates

@onchaination_chat
→ discussion backend for published content

@onchaination_group
→ main forum with Topics
```

`@onchaination_group` MUST remain separate from the content-comment system so page comments do not pollute the main forum.

`@onchaination_chat` SHOULD function mostly as discussion infrastructure and does not need prominent navigation.

---

# 20. Embedded Telegram Comments

Embedded Telegram comments are REQUIRED in v0.1.

Telegram MUST be the canonical source of truth for page comments. The website MUST only embed the corresponding Telegram discussion thread.

Onchaination MUST NOT implement a separate website comment store. v0.1 MUST NOT require:

```text
comments in Markdown
GitHub Issues as page comments
D1 comments table
Markdown → Telegram mapping table
stored Telegram chat IDs per page
stored Telegram post IDs per page
comment synchronization logic
```

`@onchaination_chat` MUST be the linked discussion group of `@onchaination_info`.

Every newly published knowledge page MUST be posted once to `@onchaination_info` using the **clean canonical URL**.

Correct official publish URL:

```text
https://onchaination.org/learn/stablecoins
```

The official channel post MUST NOT use referral or tracking parameters. Referral parameters belong only on links shared by contributors, users, campaigns, or other referral surfaces.

Conceptually:

```text
learn/stablecoins/en.md
        ↓
https://onchaination.org/learn/stablecoins
        ↓
posted once to @onchaination_info
        ↓
discussion thread in @onchaination_chat
        ↕
same comments embedded on the web page
```

The canonical page URL is the mapping key. No manual Markdown-file-to-Telegram-post mapping SHOULD be maintained.

A comment written through the website is a Telegram comment. A comment written in Telegram appears in the same discussion embedded on the website.

Normal page edits MUST NOT create new canonical Telegram posts.

Publishing MAY remain manual in v0.1.

---

# 21. Content Flywheel

The Telegram integration intentionally creates:

```text
Create knowledge
      ↓
GitHub
      ↓
onchaination.org
      ↓
@onchaination_info
      ↓
comments
      ↓
questions / corrections / ideas
      ↓
GitHub contributions
      ↓
better knowledge
      ↺
```

---

# 22. AI-Friendly Content

The build MUST generate:

```text
/llms.txt
```

It SHOULD provide:

- a concise description of Onchaination;
- section indexes;
- links to canonical `.md` representations;
- short descriptions.

Example:

```md
# Onchaination

> An open group of people learning, building, and sharing value onchain.

Prefer clean Markdown versions when reading Onchaination content.

## Learn

- [What Is a Stablecoin?](https://onchaination.org/learn/stablecoins/en.md)
- [What Is Collateral?](https://onchaination.org/learn/collateral/en.md)

## Tools

- [Aave](https://onchaination.org/tools/aave/en.md)
```

Pages SHOULD also advertise:

```html
<link rel="describedby" href="https://onchaination.org/llms.txt" />
```

Important knowledge MUST be available in static HTML and Markdown and MUST NOT require client-side JavaScript to read.

---

# 23. Learn with AI

Every knowledge page MUST contain:

**✦ Learn with AI**

Initial providers:

```text
ChatGPT
Claude
Gemini
Copy context
```

The generated context MUST contain at least:

```text
title
canonical page URL
Markdown URL
learning instruction
```

Example:

```text
Use this Onchaination page as the primary source for our conversation:

What Is a Stablecoin?
https://onchaination.org/learn/stablecoins

Clean Markdown:
https://onchaination.org/learn/stablecoins/en.md

Teach me this topic interactively.

Use the Onchaination material as context, answer my questions,
and help me verify my understanding.
```

For Skills:

> Help me understand and perform this skill step by step.

For Strategies:

> Help me understand this strategy, including its assumptions, risks, trade-offs and steps.

---

# 24. AI Provider Adapters

Provider-specific behavior MUST remain outside the content model:

```text
web/src/integrations/ai/
├── context.ts
├── chatgpt.ts
├── claude.ts
└── gemini.ts
```

Conceptually:

```ts
interface AIProvider {
  id: string;
  name: string;
  open(context: AIContext): void;
}
```

Provider-specific deep links MAY be used where reliable.

The guaranteed fallback MUST remain:

```text
Generate context
      ↓
Copy to clipboard
      ↓
Open AI provider
      ↓
Continue conversation
```

Onchaination MUST NOT depend on undocumented provider URL behavior.

---

# 25. GitHub Is the Contribution Record

GitHub is the canonical source of knowledge contribution history.

Onchaination MUST NOT duplicate that history into a conventional contribution database.

Contribution evidence includes:

```text
commits
pull requests
reviews
issues
file history
Git authorship
```

Knowledge pages SHOULD expose:

```text
Edit on GitHub
View source
```

`View history` MAY also be provided.

The identity layer MAY map GitHub activity to an Onchaination ID using a verified GitHub claim.

---

# 26. Onchaination Identity

Onchaination MUST provide a simple, chain-neutral identity primitive in v0.1.

The root identity MUST NOT depend on:

```text
Ethereum
Base
Solana
Bitcoin
ENS
email
social login
a centralized identity provider
```

An Onchaination identity is rooted in a participant-controlled cryptographic public key.

For humans, a passkey / WebAuthn credential is the default control mechanism.

External services and blockchain accounts are claims about the identity, not the identity itself.

---

# 27. Onchaination ID

An Onchaination ID SHOULD be deterministically derived from the identity public key.

Conceptually:

```text
Passkey public key
      ↓
canonical public-key representation
      ↓
SHA-256
      ↓
lowercase base32 without padding
      ↓
oc1...
```

The canonical public-key representation MUST be frozen and covered by deterministic test vectors before production identities are issued.

For WebAuthn keys, v0.1 SHOULD derive this representation from the normalized public JWK using deterministic RFC 7638-style public-key member canonicalization.

The complete digest MUST be retained. IDs MUST NOT use unsafe short truncation.

Example:

```text
oc1...
```

Canonical identity route:

```text
/id?i=oc1...
```

---

# 28. Names

Human-readable names are profile metadata.

They MUST NOT be globally unique.

Example:

```json
{
  "id": "oc1...",
  "name": "Dima"
}
```

Multiple identities MAY use the same name.

The unique identifier is always the Onchaination ID.

v0.1 MUST NOT introduce a globally unique username/handle namespace.

Optional unique aliases MAY be considered separately later.

---

# 29. Passkey Registration and Control

Identity creation requires:

```text
request WebAuthn challenge
        ↓
create passkey
        ↓
verify registration
        ↓
derive Onchaination ID
        ↓
store public identity material
```

Onchaination MUST NEVER receive the passkey private key.

v0.1 treats the root passkey public key as the identity root.

Complex key rotation and recovery are out of scope for v0.1.

---

# 30. Public Profile

Each identity MAY publish a public profile.

Example:

```json
{
  "id": "oc1...",
  "version": 1,
  "name": "Dima",
  "bio": "...",
  "contacts": [
    {
      "type": "github",
      "value": "freelook"
    },
    {
      "type": "telegram",
      "value": "@dima"
    }
  ],
  "rewardDestinations": []
}
```

Profile updates MUST be authorized by the identity passkey.

Profiles MUST contain a monotonically increasing version.

An older or equal version MUST NOT replace a newer accepted version.

---

# 31. Profile Authorization

WebAuthn assertions SHOULD bind a profile update to the exact profile content.

Conceptually:

```text
canonical profile JSON
       ↓
SHA-256
       ↓
operation + ID + version + profile hash
       ↓
WebAuthn challenge
       ↓
passkey assertion
```

Server verification MUST check:

```text
challenge
origin
RP ID
registered public key
signature
profile ID
profile version
```

This authorization proof MAY be stored alongside the profile.

---

# 32. Contacts and Claims

Contacts and external accounts SHOULD use one generic structure.

Self-declared claim:

```json
{
  "type": "github",
  "value": "freelook"
}
```

Verified claim:

```json
{
  "type": "github",
  "value": "freelook",
  "proof": {
    "type": "onchaination-attestation",
    "kid": "validator-v1",
    "signature": "..."
  }
}
```

A contact without proof is self-declared.

A contact with a valid proof is verified.

Clients MUST NOT rely on:

```json
{
  "verified": true
}
```

as authority.

Canonical rule:

```text
valid proof   → verified
no proof      → self-declared
invalid proof → unverified
```

---

## Claim Types and Trust Model

Claims MAY use different proof mechanisms.

Direct cryptographic claims include wallet/account ownership signatures where the external system supports portable signing.

Provider-mediated claims such as GitHub, Telegram, or X use an **Onchaination validator attestation**. Such an attestation means that the Onchaination validator observed successful provider verification and signed the normalized claim for the Onchaination ID.

A validator attestation MUST NOT be described as if GitHub, Telegram, X, or another provider cryptographically signed the claim itself.

---

# 33. Claim Normalization

Each claim type MUST define deterministic normalization before it can be signed or verified.

Examples:

```text
github
→ normalized username

telegram
→ normalized username without @

eip155
→ canonical network namespace + address

solana
→ canonical public key representation
```

The original display value MAY also be retained.

Proofs MUST bind the normalized value.

---

# 34. Verification

Onchaination SHOULD expose a generic verification entry point:

```text
POST /api/verify
```

Provider-specific adapters MAY implement:

```text
Ethereum / Base → wallet ownership signature
Solana          → wallet ownership signature
Bitcoin         → supported ownership proof
GitHub          → provider verification + Onchaination attestation
Telegram        → provider verification + Onchaination attestation
X               → provider verification + Onchaination attestation
```

External provider authentication is used **only to prove a claim**.

It MUST NOT become the root Onchaination login or identity authority.

Verification is only necessary when Onchaination relies on a claim for:

```text
contribution attribution
referral attribution
permissions
rewards
other trusted behavior
```

Normal public contact information requires no verification.

---

# 35. v0.1 Verification Scope

The verification architecture MUST be generic.

For the initial implementation, the priority SHOULD be:

```text
GitHub
Telegram
```

because GitHub provides contribution attribution and Telegram provides community/social identity.

Additional providers MAY be introduced without changing the identity model.

---

# 36. Validator

Claims that cannot provide portable cryptographic ownership proofs MAY be attested by the Onchaination validator.

The validator MUST use a chain-neutral signing key.

v0.1 SHOULD use:

```text
Ed25519
```

Architecture:

```text
provider verification
       ↓
validator
       ↓
Ed25519 attestation
       ↓
public claim proof
```

The validator MUST NOT use an Ethereum, Solana, Bitcoin, or other blockchain wallet as its signing identity.

---

# 37. Attestation Format

Validator attestations MUST bind the claim to the Onchaination ID.

Conceptually:

```json
{
  "version": 1,
  "subject": "oc1...",
  "type": "github",
  "value": "freelook",
  "issuedAt": "2026-09-10T17:00:00Z",
  "kid": "validator-v1"
}
```

Optional:

```json
{
  "expiresAt": "..."
}
```

The signature covers the canonical serialized payload.

At minimum the proof MUST bind:

```text
Onchaination ID
claim type
normalized value
proof version
issued-at time
validator key ID
optional expiration
```

Canonical serialization MUST be deterministic.

---

# 38. Validator Key Discovery

Validator public keys MUST be publicly discoverable.

Recommended endpoint:

```text
/.well-known/onchaination-validator.json
```

Example:

```json
{
  "version": 1,
  "keys": [
    {
      "kid": "validator-v1",
      "alg": "Ed25519",
      "publicKey": "..."
    }
  ]
}
```

Attestations MUST reference `kid`.

Previous public validator keys SHOULD remain discoverable after rotation so historical proofs remain verifiable.

---

# 39. Storage

Cloudflare D1 MAY initially store:

```text
identity public keys
credential metadata
versioned profiles
claims
proofs
validator attestations
temporary verification state
```

D1 MUST NOT be considered the authority over identity.

The distinction is:

```text
cryptographic proof → authority

D1
→ indexing
→ lookup
→ availability
```

Changing a database row MUST NOT make an invalid proof valid.

---

# 40. Storage Portability

Public identity records MUST use portable formats.

They SHOULD be exportable to:

```text
GitHub
static JSON
IPFS
another database
other future storage
```

A public dataset dump MAY be maintained in the Onchaination GitHub organization for transparency.

Secrets MUST NOT be included.

This includes:

```text
OAuth access tokens
temporary challenges
session data
validator private keys
provider secrets
```

---

# 41. Referral Attribution

Onchaination MUST support standard UTM referral attribution.

Canonical format:

```text
?utm_source=<onchaination-id>&utm_medium=referral
```

Example:

```text
/learn/defi?utm_source=oc1abc...&utm_medium=referral
```

The referrer MUST be identified by Onchaination ID rather than a blockchain address or mutable social username.

This allows the contributor to change contacts or reward destinations without breaking historical attribution.

Referral parameters belong on links shared by contributors, users, campaigns, or other referral surfaces. They MUST NOT be added to the official canonical URL published by `@onchaination_info`.

---

# 42. Referral Analytics

The website SHOULD recognize valid-looking Onchaination IDs supplied through `utm_source`.

Google Analytics MAY initially provide reporting.

Analytics data MUST NOT itself be treated as cryptographic proof of reward eligibility.

If reward-eligible referral events later require stronger verification, first-party signed or server-recorded events MAY be added without changing the public UTM scheme.

---

# 43. Contribution Attribution

External activity MAY resolve to an Onchaination ID through verified claims.

GitHub:

```text
GitHub contribution
       ↓
GitHub username
       ↓
verified GitHub claim
       ↓
Onchaination ID
```

Social:

```text
Telegram account
       ↓
verified Telegram claim
       ↓
Onchaination ID
```

Future wallet activity:

```text
wallet
   ↓
ownership proof
   ↓
Onchaination ID
```

Identity answers:

> **Who controls or is associated with this identifier?**

It MUST NOT answer:

> **How valuable was this contribution?**

Contribution/reward calculation remains a separate concern.

---

# 44. Rewards

Rewards MUST be attributed to the Onchaination ID rather than directly to a single wallet.

An identity MAY expose multiple reward destinations.

Conceptually:

```text
Onchaination ID
       ↓
reward destinations
       ├── EVM
       ├── Solana
       ├── Bitcoin
       └── future networks
```

A reward destination is associated with an identity.

It MUST NOT become the identity itself.

Before a destination is used for meaningful automated payout, ownership SHOULD be cryptographically verified.

---

# 45. v0.1 Reward Scope

v0.1 MUST support the data path:

```text
contribution / referral
        ↓
Onchaination ID
        ↓
reward destination
```

v0.1 does NOT require:

```text
automatic payouts
reward smart contracts
points
leaderboards
token economics
complex reputation
automatic reward scoring
```

Rewards MAY initially be calculated and distributed manually.

---

# 46. Identity Privacy and Security

Public profiles are public by design.

The system SHOULD minimize personal data.

Email is not required for Onchaination identity.

Provider tokens and private verification data MUST NOT be published.

Verification flows MUST use:

```text
short-lived challenges
nonces
state binding
origin validation
deterministic claim normalization
signature verification
```

Proof validation SHOULD fail closed.

The validator private key MUST remain secret.

Clients SHOULD be able to independently verify public attestations using the published validator public key.

---

# 47. Visual Direction

Onchaination MUST use a minimal black-and-white design.

Direction:

> **ChatGPT-level readability + Vercel-level simplicity + GitHub-level openness.**

It SHOULD feel:

```text
clean
technical
calm
open
fast
content-first
```

It SHOULD NOT resemble a typical crypto marketing site.

Avoid:

```text
gradients
neon colors
glass effects
animated backgrounds
token imagery
excessive cards
decorative Web3 graphics
```

---

# 48. Color System

The site MUST offer System, Light, and Dark modes. System is the default and
follows the operating system preference, including changes during a visit.
An explicit choice persists locally across pages and visits when browser storage
is available. Without JavaScript, the site follows the system preference.

Light theme:

```text
Background       #FFFFFF
Primary text     #111111
Secondary text   #666666
Borders          #E5E5E5
Muted background #F7F7F7
Code background  #F5F5F5
```

No brand accent color is required.

Hashtags SHOULD remain monochrome.

Color SHOULD primarily communicate meaningful state such as warnings and errors.

Dark mode uses a near-black background, light text, and muted gray surfaces and
borders. Both modes MUST keep controls, code blocks, and content readable.

---

# 49. Typography and Layout

Use a neutral modern sans-serif such as Inter or a high-quality system stack.

Suggested scale:

```text
Page title      36–44px
Section title   26–30px
Subheading      20–22px
Body            16–18px
Meta            13–14px
```

Body line-height SHOULD be approximately `1.6`.

Normal knowledge content SHOULD use a reading width around:

```text
720–800px
```

Widgets MAY be wider when useful.

Whitespace SHOULD provide structure instead of excessive cards and containers.

---

# 50. Navigation

Desktop SHOULD remain approximately:

```text
Onchaination     Learn  Tools  Strategies  Skills     Search
```

GitHub and Telegram SHOULD remain easily reachable.

Mobile SHOULD use a minimal collapsed navigation.

Hashtags are the primary cross-content navigation mechanism.

---

# 51. Homepage

`README.md` SHOULD provide the core homepage content.

Example structure:

```text
Onchaination

An open group of people learning,
building, and sharing value onchain.

[ Start learning ]   [ Join Telegram ]

Learn        Tools        Strategies        Skills
Understand   Use          Achieve            Do

Search Onchaination...

Latest
...
```

Footer:

```text
GitHub · Telegram · X
```

The homepage MUST remain simple.

No speculative roadmap, token section, or generic crypto marketing is required.

---

# 52. Knowledge Page Layout

A typical page SHOULD resemble:

```text
Learn / DeFi

How DeFi Lending Works

Understand how collateral, borrowing and liquidation work.

#defi  #lending  #collateral  #aave

[ ✦ Learn with AI ]   [ Edit on GitHub ]


─────────────────────────────────────

Knowledge content

Images
Video
Code
Questions
Widgets


─────────────────────────────────────

Related

What Is Collateral?              Learn
Aave                             Tool
Borrow USDC                      Skill


─────────────────────────────────────

Discussion

[ Telegram comments ]
```

Reading is the visual priority.

---

# 53. UI Principles

Content lists SHOULD generally use simple rows rather than large card grids.

Hashtags SHOULD look like lightweight text links.

Primary actions:

```text
black background
white text
6–8px radius
```

Secondary actions:

```text
white background
thin gray border
black text
```

Widgets MUST visually belong to Onchaination and use the same minimal visual language.

Guiding rule:

> **If an element does not improve reading, navigation, learning, contribution, verification, or interaction, remove it.**

And:

> **Onchaination should look like knowledge infrastructure, not a crypto landing page.**

---

# 54. Accessibility and Responsive Design

Mobile is a first-class experience.

Priority order:

```text
reading
search
hashtags
Learn with AI
interaction
comments
```

The implementation SHOULD provide:

```text
semantic HTML
keyboard navigation
visible focus states
sufficient contrast
meaningful headings
image alt text
accessible controls
responsive widgets
```

---

# 55. CI Validation

Every pull request MUST validate applicable parts of:

```text
Markdown
front matter
schema version
unique content IDs
hashtags
tag aliases
internal links
images
widget IDs
widget parameters
Astro build
.md generation
llms.txt generation
Pagefind indexing
Cloud TypeScript
D1 migrations
Onchaination ID derivation
claim normalization
profile authorization
attestation serialization
validator signatures
proof verification
```

Cryptographic formats MUST have deterministic test vectors.

---

# 56. Deployment

Web:

```text
checkout
   ↓
validate
   ↓
Astro build
   ↓
generate clean .md routes
   ↓
generate llms.txt
   ↓
Pagefind
   ↓
GitHub Pages
```

Cloud:

```text
checkout
   ↓
test identity / proof code
   ↓
migrations
   ↓
Cloudflare Worker
```

Web and cloud deployments SHOULD remain independently deployable.

---

# 57. Recommended Implementation Order

The v0.1 specification defines the required architecture, but implementation SHOULD be staged so useful knowledge ships first.

### Phase 1 — Knowledge plane

```text
repository structure
README / Constitution
CONTRIBUTING
Markdown schema
Learn / Tools / Strategies / Skills
hashtags
search
clean .md routes
llms.txt
Learn with AI
Telegram comments
visual design
GitHub Pages
```

### Phase 2 — Minimal identity plane

```text
public-key / passkey identity root
Onchaination ID
public profile
GitHub verification
Telegram verification
Ed25519 validator
D1 indexing
UTM attribution
reward destinations
```

Identity work SHOULD NOT block publishing useful knowledge unless a shipped feature depends on it.

---

# 58. v0.1 Definition of Done

### Knowledge

```text
✓ README.md / lightweight Constitution
✓ CONTRIBUTING.md
✓ SPEC.md

✓ learn/
✓ tools/
✓ strategies/
✓ skills/

✓ Markdown schema v1
✓ stable content IDs
✓ hashtags
✓ tag aliases
✓ tag pages

✓ images
✓ YouTube embeds
✓ code blocks
✓ callouts
✓ collapsible questions
✓ reusable widget architecture
✓ at least one example widget
```

### Discovery and AI

```text
✓ Pagefind
✓ clean .md routes
✓ /llms.txt
✓ static AI-readable content

✓ Learn with AI
✓ ChatGPT option
✓ Claude option
✓ Gemini option
✓ Copy context fallback
```

### Discussion

```text
✓ @onchaination_info
✓ @onchaination_chat linked discussion
✓ Telegram is the only page-comment store
✓ embedded Telegram comments
✓ canonical URL-based discussion discovery
✓ no per-page Telegram metadata or mapping table
✓ official channel posts use clean canonical URLs

✓ @onchaination_group remains separate forum with Topics
```

### Contribution

```text
✓ Edit on GitHub
✓ View source
✓ GitHub remains canonical contribution history
```

### Identity

```text
✓ participant-controlled public-key identity root
✓ passkey registration for humans
✓ chain-neutral Onchaination ID
✓ frozen deterministic ID derivation + test vectors
✓ non-unique display names
✓ versioned public profile

✓ generic contacts / claims
✓ self-declared vs proven claims
✓ no authoritative verified boolean
✓ direct cryptographic proofs distinguished from validator attestations

✓ generic verification architecture
✓ GitHub verification
✓ Telegram verification

✓ Ed25519 validator
✓ public validator-key discovery
✓ deterministic proof format
✓ Cloudflare D1 storage
```

### Attribution and Rewards

```text
✓ UTM referral scheme
✓ Onchaination ID as referrer
✓ UTM parameters used only on shared/referral links
✓ official channel publication remains clean/canonical
✓ GitHub claim → Onchaination ID attribution

✓ reward destination model
✓ ID → attribution → reward-destination path
```

### Design and Infrastructure

```text
✓ monochrome content-first UI
✓ responsive layout
✓ accessibility

✓ GitHub Actions
✓ GitHub Pages
✓ Cloudflare Worker
✓ Cloudflare D1
✓ onchaination.org
```

---

# 59. Explicitly Out of Scope

v0.1 does NOT require:

```text
email/password accounts
email-based identity
unique usernames / handles
social login as identity authority

complex identity recovery
multiple-root-key management

points
leaderboards
reputation algorithms
tokens
governance

automatic reward calculation
automatic reward payouts
reward smart contracts

wallet-connected content widgets
transaction widgets

Telegram publishing automation
Telegram post-ID mapping
Telegram comments database
general-purpose backend
custom CMS
```

These MAY be introduced later without replacing the primitives defined in v0.1.

---

# 60. Sources of Truth

Onchaination MUST keep authority clearly separated:

```text
GitHub
→ knowledge
→ knowledge history
→ contribution history

Telegram
→ page comments
→ discussion threads

Onchaination cryptographic identity
→ participant identity
→ signed claims / attestations

Cloudflare D1
→ identity indexing
→ lookup
→ availability

onchaination.org
→ interface combining the above
```

No layer SHOULD duplicate another layer's source-of-truth role without a concrete reason.

---

# 61. Canonical Architecture

```text
                         GITHUB
               knowledge + contribution history
                           │
             ┌─────────────┼─────────────┐
             ↓             ↓             ↓
           Learn          Tools      Strategies
             └─────────────┬─────────────┘
                           ↓
                         Skills
                           │
                           ↓
                    onchaination.org
                           │
          ┌────────────────┼─────────────────┐
          ↓                ↓                 ↓
       Search          Learn with AI      Telegram
                       .md + llms.txt      discussion


                         IDENTITY

                         Passkey
                           ↓
                    Onchaination ID
                           ↓
                  versioned public profile
                           ↓
                    contacts + claims
                           ↓
                ┌──────────┼──────────┐
                ↓          ↓          ↓
             GitHub     Telegram    future claims
                ↓
            contribution


                       ATTRIBUTION

          referral / contribution / activity
                           ↓
                    Onchaination ID
                           ↓
                  reward destinations
                           ↓
                         reward


             AUTHORITY                    STORAGE

       passkey + signatures        Cloudflare D1
       proofs + attestations       indexing / lookup
       validator public key        availability
```

---

# 62. Final Foundation

Onchaination v0.1 is built around five simple ideas:

> **Knowledge should be open.**

> **Contribution should be transparent.**

> **Identity should belong to the participant.**

> **Claims should be proven when proof matters.**

> **Value created for Onchaination should be attributable to the people and agents who created or distributed it.**

And one implementation rule:

> **Use existing transparent systems as sources of truth instead of rebuilding them.**

Everything else should remain as simple as possible.

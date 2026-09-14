# ▣ Onchaination

**An open group learning, building and sharing value onchain.**

<!-- home:intro -->

Learn how onchain systems work, find useful tools and turn understanding into practice. Open knowledge, written and improved together.
<!-- /home:intro -->

Onchaination is an open, multichain knowledge and contribution hub for humans and agents.

It helps you understand onchain systems, use real tools, achieve useful outcomes, and share what you learn.

No chain tribalism.  
No token required.  
No separation between “users” and “contributors.”

**v0.1 — knowledge first.**

This repository implements the **phase 1 knowledge foundation** in [SPEC.md](./SPEC.md#57-recommended-implementation-order). Passkeys, verified claims, attribution services, and rewards belong to phase 2 and are not shipped yet. You do not need an account or wallet to read or contribute.

## Run it locally

Install [Node.js](https://nodejs.org/) **22.12 or newer** (Node 24 LTS recommended), then run these commands from the repository root:

```sh
npm ci
npm run dev
```

Open `http://localhost:4321`. Markdown changes reload the site.

To test the complete site, including static search:

```sh
npm run check
npm test
npm run build
npm run preview
```

Pagefind is generated at build time, so use the preview for search. No environment variables, API keys, database, or cloud account are needed. See [web/README.md](./web/README.md) for the small code map and deployment steps.

## Content folders and languages

Each folder is one stable content item, with one Markdown file per language:

```text
learn/transactions/en.md
learn/transactions/de.md
learn/transactions/uk.md
tools/network-fee/en.md
strategies/first-transfer/en.md
skills/check-transaction/en.md
```

English (`en.md`) is required and supplies shared metadata. Translations keep the same ID and inherit tags, level, and related IDs. The app discovers languages from filenames and falls back to English when an item lacks a supported language. Translations never increase item counts. The Learn example includes German and Ukrainian; other examples currently demonstrate English fallback.

English URLs stay `/learn/transactions`; a translation uses `/learn/transactions/de`. Language files are also directly readable at `/learn/transactions/de.md`. UI labels remain English for now. See [how to translate an item](./CONTRIBUTING.md#translate-an-item).

Examples cover Ethereum and Solana where relevant. The fee widget has separate ETH and SOL calculations; the content model remains open to other chains.

## Four examples to use and copy

| Path          | Example                                                                        | Purpose              |
| ------------- | ------------------------------------------------------------------------------ | -------------------- |
| 📚 Learn      | [What happens when you send a transaction?](./learn/transactions/en.md)        | Understand something |
| 🛠️ Tools      | [Network fee calculator](./tools/network-fee/en.md)                            | Use an interface     |
| 🎯 Strategies | [Make your first transfer easier to verify](./strategies/first-transfer/en.md) | Pursue an outcome    |
| ⚡ Skills     | [Check a transaction on a block explorer](./skills/check-transaction/en.md)    | Perform a procedure  |

[Start learning](./learn/) · [Join Telegram](https://t.me/onchaination_group) · [GitHub](https://github.com/onchaination)

---

## Start here

Choose the path that matches what you want to do:

- **Understand something** → [`learn/`](./learn/)
- **Use something** → [`tools/`](./tools/)
- **Achieve an outcome** → [`strategies/`](./strategies/)
- **Do something** → [`skills/`](./skills/)

If something is missing, confusing, outdated, or wrong, improve it.

See [`CONTRIBUTING.md`](./CONTRIBUTING.md).

---

## The four paths

### Learn — understand something

Concepts, protocols, mechanisms, and explanations.

Examples: stablecoins, wallets, AMMs, collateral, lending, liquidation, account abstraction.

**Explore:** [`learn/`](./learn/)

### Tools — use something

Wallets, protocols, explorers, calculators, dashboards, libraries, and other useful interfaces.

Examples: Aave, Uniswap, block explorers, health-factor calculators.

**Explore:** [`tools/`](./tools/)

### Strategies — achieve an outcome

Ways of combining knowledge, tools, and skills toward a goal.

Examples: borrow without selling, manage liquidation risk, provide liquidity, generate onchain cash flow.

Strategies describe approaches, assumptions, risks, and trade-offs. They are not promises of returns.

**Explore:** [`strategies/`](./strategies/)

### Skills — do something

Concrete capabilities a human or agent can perform.

Examples: send USDC, read a smart contract, sign a message, check a health factor.

A skill should be concrete enough to understand, follow, test, and reuse.

**Explore:** [`skills/`](./skills/)

---

## One topic, multiple paths

The four paths organize knowledge by purpose.

Hashtags connect related topics across them.

For example:

```text
AMMs
 ↓
learn how they work
 ↓
choose a DEX
 ↓
understand a liquidity strategy
 ↓
follow the skill to create a position
```

The model is simple:

```text
path = organization
id   = identity
tags = topic graph
```

---

## Markdown is canonical

Knowledge lives in Markdown.

The website renders and connects it, but every knowledge page should remain useful when read directly on GitHub.

GitHub is the canonical record of contribution history.

```text
Markdown = knowledge
GitHub   = contribution history
Site     = interface + discovery
```

The build can enhance that knowledge with search, clean `.md` routes, `/llms.txt`, widgets, AI context, and other interfaces without replacing Markdown as the source of truth.

---

## Contributing

Onchaination should grow from real questions, real usage, and real contributor experience.

A useful contribution can be small:

- fix something wrong or outdated
- explain a confusing concept
- document a tool you use
- describe a useful strategy
- add or improve a skill
- ask a question that exposes missing knowledge
- review or improve someone else’s contribution

Before publishing a top-down list of “best” tools, ask what people actually use, recommend, struggle with, or want to understand.

**Understand before influence.**

The default workflow is:

```text
find something useful to improve
        ↓
edit Markdown
        ↓
open PR
        ↓
review
        ↓
merge
        ↓
automatic deployment
```

**Make the smallest useful contribution you can.**

See [`CONTRIBUTING.md`](./CONTRIBUTING.md).

---

<!-- constitution -->

## Our lightweight constitution

Onchaination is an open group learning, building and sharing value onchain. This is our project charter, not a legal document.

### Open

Knowledge should be accessible, inspectable, and portable.

### Neutral

Onchaination is chain-neutral and multichain.

Technologies should be evaluated by what they enable, not by which ecosystem they belong to.

### Practical

Understanding is most useful when it can be applied.

### Shared

Questions, corrections, tutorials, tools, experiments, strategies, code, and experience can all create value for someone else.

### Simple

Do not introduce infrastructure, governance, token economics, leaderboards, automated reward systems, or other abstractions before there is a concrete need.

### Transparent

Important decisions, contributions, and technical rules should be understandable and inspectable.

### Participant-controlled

Identity belongs to the participant. A public key is its root; wallets and social accounts are claims about it. Claims must be proven when attribution or rewards depend on them.

### Attributable

GitHub records contributions. Useful work by humans and agents deserves attribution; rewards may recognize that work but are never promised for every contribution. Identity and rewards must remain optional for learning and contributing.

<!-- /constitution -->

---

## Humans and agents

Onchaination is designed for both.

Knowledge should be understandable by humans and, where useful, structured so agents can discover and reuse it.

Humans and agents use the same Learn / Tools / Strategies / Skills structure.

Static HTML, clean Markdown, metadata, `/llms.txt`, widgets, and Skills provide different interfaces over the same canonical knowledge.

---

## Identity and attribution

The phase 2 design specifies a minimal, chain-neutral identity layer for attribution. It is not part of the current knowledge foundation.

The root identity is a participant-controlled cryptographic public key. For humans, a passkey / WebAuthn credential is the default control mechanism.

GitHub accounts, Telegram accounts, wallets, and other external identifiers are **claims about an identity**, not the identity itself.

Claims can remain self-declared or become verifiable when proof matters.

This allows contributions and referrals to resolve to an Onchaination ID without making one blockchain, wallet, social network, or login provider the identity authority.

The minimal attribution path is:

```text
contribution / referral
        ↓
Onchaination ID
        ↓
reward destination
```

Rewards may initially be manual.

There are no required points, leaderboards, automatic payouts, reputation algorithms, or Onchaination token.

For the technical model, see [`SPEC.md`](./SPEC.md).

---

## Discussion

Knowledge belongs in GitHub. Discussion belongs in Telegram.

- **Updates:** https://t.me/onchaination_info
- **Forum:** https://t.me/onchaination_group

Published knowledge pages use Telegram as the canonical source of truth for comments. A maintainer must link the updates channel to `@onchaination_chat` and post each page's clean canonical URL once before its discussion appears. The separate forum remains `@onchaination_group`.

The website can embed the corresponding Telegram discussion thread without storing comments in Markdown or maintaining a separate comments database.

---

## What Onchaination is not

Onchaination is not tied to one blockchain.

It is not a DAO by default.

It is not a token project.

It is not an investment club.

It is not a content company with creators on one side and an audience on the other.

It is an open group learning from each other, building useful things, and sharing value onchain.

---

## Repository

The canonical repository is [`github.com/onchaination/hub`](https://github.com/onchaination/hub).

```text
hub/
├── README.md
├── CONTRIBUTING.md
├── SPEC.md
│
├── learn/
├── tools/
├── strategies/
├── skills/
│
├── web/
├── .onchaination/
└── .github/
```

The four knowledge directories remain top-level.

`web/` renders knowledge.

`cloud/` will be introduced with phase 2 when identity, verification, and attribution services are implemented.

For the complete implementation architecture, see [`SPEC.md`](./SPEC.md).

---

## Status

**v0.1 — knowledge first.**

Useful knowledge should ship before identity infrastructure needs to be complete.

The goal is not to build the largest possible platform.

It is to build the smallest useful network around useful knowledge:

```text
one explanation
one tool
one strategy
one skill
one contribution at a time
```

---

[onchaination.org](https://onchaination.org) · [GitHub](https://github.com/onchaination) · [Telegram](https://t.me/onchaination_group) · [X](https://x.com/onchaination)

# ▣ Onchaination

**An open group learning, building and sharing value onchain.**

<!-- home:intro -->

Learn how onchain systems work, find useful tools and turn understanding into practice. Open knowledge, shared and improved together.
<!-- /home:intro -->

Onchaination is an open, multichain, multilingual knowledge and contribution hub, built in public. It welcomes curious people and makes the same knowledge available to agents.

## Start here

Choose the path that matches what you want to do. Each has an example to explore or improve:

| Path                           | Purpose              | Example                                                                        |
| ------------------------------ | -------------------- | ------------------------------------------------------------------------------ |
| 📚 [Learn](./learn/)           | Understand something | [What happens when you send a transaction?](./learn/transaction/en.md)         |
| 🛠️ [Tools](./tools/)           | Use an interface     | [Network fee calculator](./tools/network-fee-calculator/en.md)                 |
| 🎯 [Strategies](./strategies/) | Pursue an outcome    | [Make your first transfer easier to verify](./strategies/first-transfer/en.md) |
| ⚡ [Skills](./skills/)         | Perform a procedure  | [Check a transaction on a block explorer](./skills/check-transaction/en.md)    |

**[Start learning](./learn/) · [Search](https://onchaination.org/search) · [Contribute](./CONTRIBUTING.md) · [Join Telegram](https://t.me/onchaination_group)**

<details>
<summary>More examples for each path</summary>

- **Learn** explains concepts and mechanisms: wallets, stablecoins, AMMs, lending, collateral, liquidation, and account abstraction.
- **Tools** covers useful interfaces: wallets, protocols such as Aave and Uniswap, explorers, calculators, dashboards, and libraries.
- **Strategies** combines knowledge, tools, and skills toward goals such as borrowing without selling, managing liquidation risk, or providing liquidity. These pages describe assumptions, risks, and trade-offs, not promises of returns.
- **Skills** gives concrete procedures: send USDC, read a smart contract, sign a message, or check a health factor. A skill should be clear enough to follow, test, and reuse.

</details>

## How contribution works

Users and contributors are not separate groups. Onchaination should grow from real questions, real usage, and real contributor experience. If something is missing, confusing, outdated, or wrong, improve it.

**Make the smallest useful contribution you can.**

A useful contribution might be a correction, a clearer explanation, a tool you use, a strategy, a skill, a translation, a question that exposes missing knowledge, or a review of someone else’s work.

Before publishing a top-down list of “best” tools, ask what people actually use, recommend, struggle with, or want to understand.

**Understand before influence.**

The usual flow is **edit Markdown → open a pull request (PR) → review → merge**. Once publishing is configured, merged changes deploy automatically. See [CONTRIBUTING.md](./CONTRIBUTING.md) for how to make your first contribution.

## How the knowledge model works

The four paths organize knowledge by purpose. Tags connect related topics across them, while each item's folder name supplies its stable ID:

- **folder name = stable content ID** — which item it is, shared by every translation.
- **section + folder = path / URL** — where an item belongs: Learn, Tools, Strategies, or Skills.
- **tags = topic graph** — shared topics that connect items across paths.

For example, one topic can lead you from learning how AMMs work, to choosing a DEX, to understanding a liquidity strategy, to following a skill to create a position.

Knowledge lives in Markdown: simple text files that remain useful when read directly on GitHub. GitHub is the canonical record of contribution history; the website renders and connects that knowledge for discovery and use. Humans and agents share the same four paths and source material.

Content is chain-neutral, with network differences named explicitly. Current examples cover Ethereum and Solana where relevant, and other chains are welcome. Translations are versions of the same item, and English is the required canonical source representation.

<!-- principles -->

## Our principles

Onchaination is an open group learning, building and sharing value onchain.

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

<!-- /principles -->

Onchaination is not tied to one blockchain, a DAO by default, a token project, an investment club, or a content company with creators on one side and an audience on the other. It is an open group learning from each other, building useful things, and sharing value onchain.

## Current status

**v0.1 — knowledge first. The current implementation is Phase 1 / knowledge foundation.**

It includes one useful item per path, language versions, and an Ethereum/Solana fee calculator. You do not need an Onchaination account, wallet, or token to read or contribute.

Identity, passkeys, verified claims, attribution infrastructure, rewards, and reward destinations are **later work, not shipped features**. [SPEC.md’s implementation order](./SPEC.md#57-recommended-implementation-order) separates the current foundation from the Phase 2 design.

Rewards may initially be manual; points, leaderboards, automatic payouts, reputation algorithms, and an Onchaination token are not required.

Useful knowledge should ship before identity infrastructure needs to be complete. The aim is the smallest useful network around useful knowledge: one explanation, one tool, one strategy, one skill, one contribution at a time.

## Technical and repository details

### Repository

The canonical repository is [github.com/onchaination/hub](https://github.com/onchaination/hub).

```text
hub/
├── README.md
├── CONTRIBUTING.md
├── SPEC.md
├── learn/
├── tools/
├── strategies/
├── skills/
├── web/
├── .onchaination/
└── .github/
```

The four knowledge directories stay at the top level. `web/` renders them; `cloud/` is reserved for Phase 2 identity, verification, and attribution services and does not exist yet. See [SPEC.md](./SPEC.md) for the architecture and [web/README.md](./web/README.md) for the code map.

The [Phase 2 identity design](./SPEC.md#26-onchaination-identity) uses a participant-controlled public key, with passkeys / WebAuthn as the default for humans. External accounts are claims, self-declared until proof matters. Its attribution path is contribution / referral → Onchaination ID → reward destination, without making a chain or login provider the identity authority.

### Run it locally

Install [Node.js](https://nodejs.org/) **24 or newer**, then run from the repository root:

```sh
npm ci
npm run dev
```

Open `http://localhost:4321`. Markdown changes reload the site. No environment variables, API keys, database, or cloud account are needed.

To check and preview the complete site, including search:

```sh
npm run check
npm test
npm run build
npm run preview
```

### Content folders and languages

Each folder is one stable item, with one Markdown file per language:

```text
learn/transaction/en.md
learn/transaction/de.md
learn/transaction/uk.md
tools/network-fee-calculator/en.md
strategies/first-transfer/en.md
skills/check-transaction/en.md
```

English (`en.md`) is required and supplies shared metadata. Translations keep the same ID and inherit tags, level, and related IDs. Languages are discovered from filenames; translations do not increase item counts. A localized page exists only when its language file exists, so missing translations return 404 instead of English content. UI labels remain English for now. See [how to translate an item](./CONTRIBUTING.md#translate-an-item).

English URLs stay `/learn/transaction`; a translation uses `/learn/transaction/de`. The source is also directly readable at `/learn/transaction/de.md`.

### Website, search, and publishing

- **Markdown and agent access:** static HTML, clean `.md` routes, `/llms.txt`, widgets, and Learn with AI context offer interfaces over the same canonical knowledge. The fee widget has separate ETH and SOL calculations.
- **Browse and search:** Tags connect related topics, while levels group knowledge for beginner, intermediate, and advanced users. Pagefind generates the static search index at build time, so use `npm run preview` after building to test search.
- **Publishing:** the GitHub Actions workflow validates pull requests and can deploy the static site after GitHub Pages and DNS are configured. See [publishing setup](./web/README.md#publish-to-github-pages).

### Discussion

Knowledge belongs in GitHub. Discussion belongs in Telegram: [updates](https://t.me/onchaination_info) and the [forum](https://t.me/onchaination_group).

For page discussions, a maintainer must link the updates channel to `@onchaination_chat` and post each page’s clean canonical URL once. The separate forum remains `@onchaination_group`. Readers can then load the corresponding embedded thread; Telegram holds the comments, with no comments stored in Markdown or a separate database. Local builds do not configure channels or publish posts. See [Telegram setup](./web/README.md#enable-telegram-discussion).

---

[onchaination.org](https://onchaination.org) · [GitHub](https://github.com/onchaination) · [Telegram](https://t.me/onchaination_group) · [X](https://x.com/onchaination)

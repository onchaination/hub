# Contributing to ▣ Onchaination

> **Make the smallest useful contribution you can.**

A typo fix, clearer explanation, useful question, updated source, or tested procedure is welcome. You do not need a wallet, Onchaination ID, or local development setup. A GitHub account is needed to open a pull request; questions are also welcome in Telegram.

## Your first contribution

1. Click **Edit this page** on the website.
2. Change the Markdown.
3. Open a pull request describing the improvement.

For a new page, choose a path such as `learn/my-topic/en.md`, use an existing page as an example, and update its metadata and links. Questions, corrections and suggestions are welcome in any language in the same [Telegram group](https://t.me/onchaination_group).

The site discovers pages automatically. There is no menu or content registry to edit.

## Choose a path

| Path                           | Purpose              | Working example to copy                                                        |
| ------------------------------ | -------------------- | ------------------------------------------------------------------------------ |
| 📚 [Learn](./learn/)           | Understand something | [What happens when you send a transaction?](./learn/transaction/en.md)         |
| 🛠️ [Tools](./tools/)           | Use an interface     | [Network fee calculator](./tools/network-fee-calculator/en.md)                 |
| 🎯 [Strategies](./strategies/) | Pursue an outcome    | [Make your first transfer easier to verify](./strategies/first-transfer/en.md) |
| ⚡ [Skills](./skills/)         | Perform a procedure  | [Check a transaction on a block explorer](./skills/check-transaction/en.md)    |

A Learn page explains a concept. A Tool describes or exposes an interface; widgets are optional. A Strategy gives an approach, assumptions, risks, trade-offs, and stopping criteria. A Skill gives prerequisites, steps, and a verifiable result.

Humans and agents share these four folders. Describe separate execution paths inside a Skill only when their procedures differ. Before adding a page, see whether an existing one can be improved.

## Translate an item

One folder is one item, not a separate item for each translation.
`en.md` is required. To translate it, add a language file alongside it; for example, `uk.md`, `es.md`, `de.md` etc.

```yaml
---
schema: 1
title: Was passiert, wenn du eine Transaktion sendest?
description: Verfolge eine Transaktion von deiner Wallet bis in einen Block.
updated: 2026-09-13
---
```

Translate the body too, including relevant examples and limits. Do not add `id`, `tags`, `related`, or `level`: every representation gets its knowledge identity from the shared section-and-folder path, and translations inherit classification from English. Optional `updated` and `authors` describe that representation. There is no `language` metadata field; the filename supplies it.

Use `en.md`, `uk.md`, `es.md`, `pt.md`, `de.md` etc. English is required; other translations are optional. Click **Help translate this page** on a fallback article to open a new Markdown file prefilled with its English source. Translate the title, description and body, then open a pull request.

The URL selects the interface language, for example: `/uk/learn/transaction/` uses Ukrainian. If Ukrainian Markdown is missing, English remains available with an optional browser translation control. Translations do not create separate items or conversations. Every language shares one Telegram discussion, and everyone may participate in any language.

Link to existing source files, such as `../../tools/network-fee-calculator/en.md`. The website retains the reader’s selected language and resolves the target translation or English fallback. When a translated heading differs, an English fragment links to the top of that translated page. Shared images stay inside the item folder. Do not add empty translation placeholders.

To add a new interface language, register it in `web/src/lib/locales.ts`, add every key in `web/src/lib/ui.ts`, then contribute Markdown wherever useful. No translation database or complete-coverage requirement is involved.

## Front matter

Every English `en.md` starts with YAML:

```yaml
---
schema: 1
title: A clear title
description: One sentence describing what the reader will get from this page.
tags: [transactions, security]
level: beginner
updated: 2026-09-13
related: [learn/transaction]
---
```

Required fields are `schema`, `title`, `description`, and `tags`. The example's remaining fields are optional:

- `level`: `beginner`, `intermediate`, or `advanced`.
- `updated`: a real `YYYY-MM-DD` date; update it when making a material change.
- `related`: locale-independent paths of existing pages, such as `learn/transaction`; no filename or locale prefix.
- `authors`: optional Onchaination IDs once the identity system exists. GitHub history remains the contribution record.

Section `README.md` files are plain Markdown indexes and do **not** need front matter. Other knowledge files do. Existing pages are the templates; keep procedures verifiable and strategies explicit about assumptions, risks and exit conditions.

### IDs, paths, and tags

**The path without locale identifies. The locale selects language. Tags connect.**

The section-and-folder path is the knowledge identity, such as `learn/transaction`. Folder names use lowercase kebab-case and may repeat in different sections. Do not add `id` to front matter. Moving a page changes its identity, so update related paths and consider the existing discussion before moving published content.

Use a few relevant tags, without the `#` prefix. Prefer existing canonical tags. Aliases live in [`.onchaination/tags.yml`](./.onchaination/tags.yml); for example, `gas` resolves to `fees`. A new topic does not need a registry entry unless it has aliases. Repeated tags and ambiguous aliases fail validation.

Do not add `type`, `route`, `url`, or Telegram IDs to front matter. The folder supplies the content type. The website supplies URLs and discussion controls.

## Make examples multichain

Keep general explanations neutral. When network details matter, include Ethereum and Solana where relevant and label differences explicitly: transaction hash versus signature, ETH versus SOL, contract address versus mint, and each network’s execution and finality rules. Never present Ethereum behavior as a universal blockchain rule. Add other chains naturally using the same comparison structure.

The fee widget offers Ethereum and Solana models. Solana uses signatures, a base fee, a requested compute-unit limit, and a micro-lamport price; it is not an Ethereum gas calculation with a renamed unit. Limits and formulas are documented on the Tool page.

## Write for someone who wants to understand

Use short sections, concrete examples, clear prerequisites, useful sources, and explicit limits. Explain unfamiliar words. Distinguish facts from opinions and flag information that can change.

Avoid hype, promotional copy, chain tribalism, promises of returns, unexplained jargon, unnecessary duplication, and unsafe copy-and-paste instructions. Prefer primary sources for technical claims. Reviews that catch unclear steps, stale facts, missing risks, or broken links are contributions too.

Markdown must remain useful directly on GitHub. Website enhancements should add convenience without carrying the page's core meaning.

## Links and images

Use relative Markdown links for internal knowledge:

```md
[How transactions work](../../learn/transaction/en.md)
[Try a fee estimate](../../tools/network-fee-calculator/en.md#try-an-estimate)
![Describe the diagram](./images/flow.png)
```

Keep images near the page that uses them and give them meaningful alt text. Local links, heading anchors, and images are checked during the build. Common image formats are published at the same relative paths for HTML and Markdown readers.

Link directly to useful external sources. Avoid tracking parameters in canonical links.

## Questions, callouts, code, and video

Collapsible questions use portable HTML, with blank lines around the Markdown answer:

```md
<details>
<summary>❓ What should I check?</summary>

Check the **network**, asset, amount, and recipient.

</details>
```

GitHub callouts are supported:

```md
> [!TIP]
> Check the network before sending funds.
```

Use inline code for technical identifiers that must not be translated. For other protected text, `<span translate="no">exact text</span>` is also supported. Never include real private keys or seed phrases in examples.

Use normal fenced code blocks with a language label. The website adds syntax highlighting for common languages and a copy button. Other languages remain readable plain code. Explain prerequisites, inputs, and expected output when they matter.

A standalone YouTube URL becomes a lazy, privacy-enhanced embed. Timestamp links work. It remains a link on GitHub.

Portable HTML is limited to `details`, `summary`, `kbd`, `sub`, `sup`, and `br`, without attributes. Use Markdown for links and images. Arbitrary HTML and scripts are rejected.

## Reuse a widget

The first registered widget is `network-fee`. It can appear in **any** of the four paths. Put the directive on its own line, outside lists, quotes, and details:

```md
<!-- widget:network-fee gas=21000 gwei=10 -->
```

All parameters are optional. The widget offers both network models; `chain` chooses the initial view. Ethereum inputs below apply to its Ethereum view:

| Parameter | Allowed values                | Default    |
| --------- | ----------------------------- | ---------- |
| `chain`   | `ethereum` or `solana`        | `ethereum` |
| `gas`     | Integer from 1 to 100,000,000 | 21,000     |
| `gwei`    | Number from 0 to 1,000,000    | 10         |

The comment stays invisible on GitHub. Always include the formula, a worked example, or another useful static explanation beside it. Directives inside code fences are examples and remain inert.

To add a widget:

1. Add its strict parameter schema in [`schema.ts`](./web/src/widgets/schema.ts).
2. Add its React component beside [`NetworkFee.tsx`](./web/src/widgets/NetworkFee.tsx).
3. Register its stable name in [`registry.ts`](./web/src/widgets/registry.ts).
4. Add a useful Markdown example and test calculations or other meaningful behavior.

Never import React or reference implementation paths from Markdown. Unknown widget names and invalid parameters fail validation. Keep calculations separate from the UI when they need tests.

## Preview and check

Follow [the local setup](./README.md#run-it-locally), then run from the repository root:

```sh
npm run dev
npm run check
npm test
npm run build
npm run preview
```

Search is generated at build time, so use the preview to test it. CI also runs browser checks. See [web/README.md](./web/README.md) for those commands and the code map.

Before opening a PR, read your Markdown directly, verify the sources and procedure, preserve existing knowledge paths, and check relevant links, images, and widget parameters. Keep the PR focused and explain what a reviewer should verify. Small corrections do not need custom tests.

## AI, discussion, and attribution

The site generates **✦ Learn with AI** context and provider links. Contributors only write the source Markdown; no provider-specific prompts are needed.

Discussion lives in Telegram. Maintainers publish each page's clean English URL once in `@onchaination_info`, linked to `@onchaination_chat`. The website sends the same explicit discussion URL for all language views. Do not add comment metadata to pages or repost translations or every edit. Ask and discuss in any language; no language-specific groups are needed. The main forum, [@onchaination_group](https://t.me/onchaination_group), stays separate.

GitHub commits, PRs, reviews, issues, and file history are the contribution record. We do not duplicate that history into a database or require a hand-maintained author list.

The current implementation is the **phase 1 knowledge foundation**. Participant-controlled Onchaination identity, verified GitHub/Telegram claims, referral attribution, and reward destinations are specified for phase 2. They are not required to contribute, and rewards are never promised for every contribution. Provider accounts and wallet addresses are claims about an identity, not its root.

## Keep the foundation simple

The root `learn/`, `tools/`, `strategies/`, and `skills/` folders are canonical. `web/` renders them. Keep code formatting consistent with `npm run format -w web`.

Add infrastructure only when a concrete requirement calls for it. Prefer existing transparent sources of truth to new CMS layers, databases, identity providers, tracking systems, tokens, or reputation systems.

For the project principles, read [README.md](./README.md). For the technical architecture and phase 2 identity model, read [SPEC.md](./SPEC.md).

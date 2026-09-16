---
schema: 1
title: "Read a block explorer critically"
description: "Use public records to verify transactions while recognizing indexer and label limitations."
tags: [transactions, security]
level: beginner
updated: 2026-09-16
related: [learn/transaction, learn/address]
---

Start with: [transaction](../../learn/transaction/en.md), [address](../../learn/address/en.md).

A block explorer is an interface to indexed network data. It helps inspect transactions, accounts, contracts and tokens. You normally do not need to connect a wallet to look up public information.

## Choose the right view

Use an explorer listed by the network's official documentation. Ethereum explorers such as Etherscan, Solana Explorer and Bitcoin explorers display different data models. Their pages cannot be read as interchangeable receipts.

| Task | Check |
| --- | --- |
| Verify a transfer | Network, identifier, execution status, destination and asset movements |
| Understand cost | Actual fee and fee units, not only an estimate |
| Inspect a token | Contract or mint, supply and relevant authorities |
| Inspect a program | Verified source where supported, proxy or upgrade information |

Labels and logos can be crowdsourced or curated. They do not prove who controls an address. Explorer advertisements are not part of the network's record.

## A reading exercise

Look up a transaction you already understand. Find its fee separately from the transfer amount. On an EVM contract call, the top-level destination can be a contract while token transfers appear in events or other decoded views. On Solana, inspect instruction results and token balance changes. On Bitcoin, distinguish outputs to recipients from change where you have the wallet context.

If an explorer is delayed or unavailable, compare another reputable view or a node. “Not found” can mean wrong network, indexing delay or a transaction that was never broadcast. Follow the [transaction-check procedure](../../skills/check-transaction/en.md) before sending again.

## Sources

- [Ethereum explorers](https://ethereum.org/en/developers/docs/data-and-analytics/block-explorers/)
- [Solana Explorer](https://explorer.solana.com/)
- [Bitcoin transaction model](https://developer.bitcoin.org/devguide/transactions.html)

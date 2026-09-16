---
schema: 1
title: "Bridges connect separate asset systems"
description: "Trace what leaves one network and what you receive on another."
tags: [bridges, risk]
level: intermediate
updated: 2026-09-16
related: [learn/l2, learn/token]
---

Start with: [l2](../../learn/l2/en.md), [token](../../learn/token/en.md).

A bridge coordinates an action on one network with an action on another. It may lock assets and create a representation, burn and mint through an issuer, or use liquidity providers to deliver funds. These mechanisms create different dependencies.

## Identify the resulting asset

Moving “the same token” can result in a native issuer token or a wrapped claim backed elsewhere. Record the destination contract or mint, not only the ticker. Check that the application you intend to use accepts that exact asset.

A source transaction succeeding proves only that its source-side action succeeded. Relaying, proof submission, waiting periods or a separate claim may still be necessary before funds are usable at the destination.

## Compare the whole route

Count source fees, bridge or liquidity fees, expected destination amount, destination fees and any return journey. Keep a way to pay for the first destination action. A bridge may not provide gas automatically.

Example: moving 100 units with a 2-unit route cost delivers at most 98 before other charges. A 1-unit source fee and a 1-unit exit cost reduce the economic benefit further.

Bridge risks include contract bugs, compromised validators or keys, message-verification failures, unavailable liquidity and asset depegs. Official or widely used does not mean risk-free.

Before committing, explain how you would locate an unfinished transfer and which official support channel handles it. Never use a recovery service that asks for a seed phrase or an unexplained signature.

## Sources

- [Ethereum bridge overview](https://ethereum.org/en/bridges/)
- [Base finality and withdrawals](https://docs.base.org/specifications/transactions/transaction-finality)

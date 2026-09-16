---
schema: 1
title: "Evaluate a portfolio tracker"
description: "Use dashboards for visibility without confusing estimates with withdrawable value."
tags: [wallets, defi]
level: intermediate
updated: 2026-09-16
related: [learn/token, learn/lending]
---

Start with: [token](../../learn/token/en.md), [lending](../../learn/lending/en.md).

A portfolio tracker aggregates balances and positions across addresses or networks. A read-only tracker usually needs public addresses, not spending permissions. Prefer the least access needed for the task.

## Questions to compare

Which networks and protocols are covered? How are token prices chosen? Does the tracker show debts, receipt tokens, unclaimed rewards and positions outside an active liquidity range? When was each value updated?

A dashboard can double-count a deposited asset and its receipt, omit debt, or assign a price from a thin market. A total is only as useful as the accounting behind it.

## Reconcile one position

Choose a lending position you understand. Compare the tracker's collateral and debt with the protocol and explorer. Check the units and price timestamps. Then ask whether the displayed net value could actually be withdrawn after repayment and fees.

Unknown spam tokens may appear with large invented values. Do not follow their embedded links to “unlock” the balance. Hide them from your view without interacting onchain when the interface permits it.

## Privacy and permissions

Combining public addresses into one profile reveals relationships that may not otherwise be obvious. Understand what the service stores and shares. A wallet connection can disclose addresses even when it cannot spend.

Do not sign a transaction or grant a token allowance just to view a public balance. If a tracker also offers swaps or claims, evaluate those as separate financial actions. Keep your own list of positions and exit instructions so a dashboard outage does not remove your only overview.

## Sources

- [Ethereum explorers and indexed data](https://ethereum.org/en/developers/docs/data-and-analytics/block-explorers/)
- [Aave supply receipts](https://aave.com/help/supplying/supply-tokens)

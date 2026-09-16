---
schema: 1
title: "How onchain lending connects suppliers and borrowers"
description: "Follow supplied assets, variable interest and the conditions for withdrawal."
tags: [lending, defi]
level: intermediate
updated: 2026-09-16
related: [learn/defi, learn/liquidity]
---

Start with: [defi](../../learn/defi/en.md), [liquidity](../../learn/liquidity/en.md).

A lending market connects supplied assets with borrowers under programmed rules. In many open markets, borrowers pledge assets worth more than the debt. This is collateralized borrowing, not an unsecured loan based on identity.

## Follow the balances

A supplier deposits an asset. The market accounts for a claim on that deposit, often through a receipt token or position balance. A borrower takes available assets and owes principal plus interest. The market's rules determine which supplied assets can support borrowing.

Interest rates may change with utilization: the share of supplied assets currently borrowed. A displayed rate is a snapshot. Supply returns can differ from borrowing costs because of reserves, incentives and the market's design.

## Available to withdraw?

A supplier's claim can grow while immediate withdrawal liquidity falls. If much of an asset is borrowed, leaving may require repayments or new supply. Pause controls, caps or isolation rules can impose further constraints.

Example: you supply 1,000 stablecoin units. That is a claim on the market, not cash in your wallet. If you also borrow against it, withdrawing collateral may become restricted even when the pool has liquidity.

## Evaluate before depositing

Separate asset risk from contract risk, oracle risk and market solvency. Check supply and borrow caps, supported collateral, interest calculations and emergency controls. An audit is one piece of evidence, not insurance.

Next read [collateral](../collateral/en.md) and [liquidation](../liquidation/en.md) before opening a debt position. Borrowing and supplying are different risk decisions.

## Sources

- [Aave supply mechanics](https://aave.com/help/supplying/supply-tokens)
- [Aave borrowing mechanics](https://aave.com/help/borrowing/borrow-tokens)

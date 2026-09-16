---
schema: 1
title: "Collateral is what supports a debt"
description: "Calculate loan-to-value and understand why borrowing capacity moves."
tags: [lending, risk]
level: intermediate
updated: 2026-09-16
related: [learn/lending]
---

Start with: [lending](../../learn/lending/en.md).

Collateral is an asset pledged to support a debt. In many DeFi markets, the protocol can sell or transfer some collateral when the position breaches its rules.

## A concrete position

You deposit $10,000 of ETH and borrow $2,000 USDC against it. Your starting loan-to-value, or LTV, is:

`debt value ÷ collateral value = 2,000 ÷ 10,000 = 20%`

If ETH's collateral value falls to $5,000 while the debt remains $2,000, LTV becomes 40%. Interest can increase debt even without another borrowing transaction. The protocol's oracle determines the values it uses; your preferred exchange price may differ.

## Capacity is not a target

Maximum borrowing LTV and liquidation threshold are different parameters. A market might allow borrowing up to one ratio but begin liquidation at another. Exact parameters depend on the collateral, market and risk mode and can change.

Additional collateral can improve the ratio but commits more assets to the same contract. Repayment reduces debt and may reduce interest costs. Neither action eliminates token, oracle or contract risk.

For several collateral assets, do not assume one universal threshold. Some assets may not count as collateral at all, or may be restricted in particular combinations.

<details>
<summary>❓ With $8,000 collateral and $2,400 debt, what happens to LTV after a $400 repayment?</summary>

LTV starts at 30%. After repaying $400, it becomes 25%, before interest and fees. Write down the debt denomination too: debt in a volatile token can rise in dollar value independently of your collateral.

</details>

Use [Calculate loan-to-value](../../skills/calculate-ltv/en.md) to apply the same steps to a position.

## Sources

- [Aave borrowing mechanics](https://aave.com/help/borrowing/borrow-tokens)
- [Aave health factor and liquidations](https://aave.com/help/borrowing/liquidations)

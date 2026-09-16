---
schema: 1
title: "Borrow without selling an asset"
description: "Compare a collateralized loan with selling, including interest and liquidation exposure."
tags: [lending, risk]
level: intermediate
updated: 2026-09-16
related: [learn/collateral, learn/liquidation, tools/lending-markets]
---

Start with: [collateral](../../learn/collateral/en.md), [liquidation](../../learn/liquidation/en.md), [lending markets](../../tools/lending-markets/en.md).

## Objective

Obtain temporary liquidity while keeping exposure to a supplied asset. Keeping exposure also keeps the risk that the asset falls.

## Prerequisites and assumptions

You understand the market, debt asset, repayment procedure and liquidation rules. You have a credible repayment source and can monitor the position. This is an educational comparison, not individualized borrowing advice.

## Mechanics

Supply eligible collateral, borrow within a deliberately chosen limit and accrue debt under the market rules. Collateral cannot necessarily be withdrawn while supporting debt. The protocol can liquidate according to oracle values and current parameters.

## Approaches and tradeoffs

| Approach | Main benefit | Main trade-off |
| --- | --- | --- |
| Borrow against the asset | Preserves asset exposure | Adds interest, contract risk and monitoring |
| Sell part of the asset | Avoids debt and liquidation | Reduces asset exposure |
| Borrow a stablecoin | Reduces one source of debt-price volatility | Retains depeg and issuer risk |
| Borrow a volatile asset | May match a future repayment source | Debt value can rise independently |

## Risks

Collateral declines, interest increases, parameter changes or oracle behavior can worsen health. Network congestion can delay repayment. Do not depend on selling the same falling collateral as the only exit.

## Example

You deposit $10,000 of ETH and borrow $2,000 USDC. Starting LTV is 20%. If collateral falls to $5,000, LTV is 40% before interest. With an illustrative 80% liquidation threshold, health factor falls from 4 to 2. These are scenario inputs, not recommended borrowing limits.

<details>
<summary>❓ Did the debt become safer because its USDC amount did not change?</summary>

**No.** The collateral supporting it fell, so both LTV and health factor worsened. Use [Check a lending position's health factor](../../skills/check-health-factor/en.md) to model the live position.

</details>

## When it may not make sense

It may not make sense when repayment is uncertain, the need is long-term, fees are large relative to the loan, or you cannot monitor. Set a debt limit and a repayment trigger before borrowing; verify actual parameters rather than copying this example.

## Sources

- [Aave borrowing mechanics](https://aave.com/help/borrowing/borrow-tokens)
- [Aave health factor and liquidations](https://aave.com/help/borrowing/liquidations)

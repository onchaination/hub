---
schema: 1
title: "Evaluate a lending market"
description: "Compare collateral rules, liquidity, rate changes and emergency powers."
tags: [lending, risk]
level: intermediate
updated: 2026-09-16
related: [learn/lending, learn/liquidation]
---

Start with: [lending](../../learn/lending/en.md), [liquidation](../../learn/liquidation/en.md).

A lending market should make its risk parameters understandable before you deposit. Compare a specific market on a specific network; a protocol name can cover several deployments with different assets and rules.

## Record the important parameters

| Side | Record |
| --- | --- |
| Supply | Receipt or accounting model, withdrawal liquidity, collateral eligibility and supply cap |
| Debt | Rate model, borrowing limit and borrow cap |
| Liquidation | Threshold, penalty and eligible collateral |
| Control | Oracle sources, upgrade powers and emergency pauses |

Distinguish maximum borrowing LTV from liquidation eligibility.

Check oracle sources, upgrade controls, emergency pauses and market restrictions. Ask where the documentation states these rules and whether the interface agrees with the current onchain parameters.

## Compare through a scenario

Model $10,000 collateral and $2,000 debt. Then halve collateral value and increase debt by accrued interest. Can you still explain the displayed health measure? If the market allows several collateral assets, apply the correct threshold to each eligible asset.

A high supply rate may reflect high utilization and limited withdrawal liquidity. Incentives paid in a separate token can make an annualized display look attractive without changing the asset's underlying interest income.

## Check the exit

Find repayment, withdrawal and position-monitoring documentation before supplying. Know whether a receipt token is itself transferable and whether transferring it changes collateral health. Keep funds for fees outside the deposit.

Audits, open code and a long history are relevant evidence, but none guarantees solvency or removes oracle and administrator risk. Avoid a market whose debt or liquidation rules you cannot independently explain.

> [!TIP]
> Before depositing, read [Supply assets and inspect collateral settings](../../skills/supply-collateral/en.md). Before borrowing, model [loan-to-value](../../skills/calculate-ltv/en.md) and [health factor](../../skills/check-health-factor/en.md).

## Sources

- [Aave borrowing mechanics](https://aave.com/help/borrowing/borrow-tokens)
- [Aave health factor and liquidations](https://aave.com/help/borrowing/liquidations)
- [Aave supply mechanics](https://aave.com/help/supplying/supply-tokens)

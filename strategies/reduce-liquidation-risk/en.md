---
schema: 1
title: "Plan a buffer and an executable repayment"
description: "Reduce exposure to forced liquidation while recognizing that monitoring can fail."
tags: [lending, risk]
level: intermediate
updated: 2026-09-16
related: [learn/liquidation, skills/calculate-ltv, skills/check-health-factor]
---

Start with: [liquidation](../../learn/liquidation/en.md), [calculate ltv](../../skills/calculate-ltv/en.md), [check health factor](../../skills/check-health-factor/en.md).

## Objective

Keep a debt position away from liquidation and maintain an exit that can work during stress.

## Prerequisites and assumptions

You know the market’s current thresholds, eligible collateral, oracle and debt denomination. You have access to repayment assets and a fee balance. No numerical buffer eliminates all risks.

## Mechanics

A lower debt amount or more eligible collateral can improve a position’s health. Repayment reduces debt exposure; adding collateral puts more assets into the same market. Account for interest as well as price changes.

## Approaches and tradeoffs

Stress-test several collateral and debt prices. Decide in advance whether a worsening position triggers partial repayment or full exit. Alerts help observation but should not be your only safeguard. Avoid depending exclusively on a single interface or device.

## Risks

Correlated collateral can fall together. Depegs can affect either side of the loan. Oracles, network congestion, market pauses and key-access problems can make the planned response unavailable. Automation adds another permission and execution dependency.

## Example

With $10,000 collateral, an illustrative 80% threshold and $4,000 debt, health factor is 2. A 40% collateral fall leaves it at 1.2 before interest. Repaying $1,000 at that point would raise it to 1.6. Verify that you could actually acquire and submit that repayment in time.

## When it may not make sense

If maintaining the plan causes constant stress or depends on immediate action while you are unavailable, reduce or close the debt. A model based only on ordinary daily price movement is not sufficient for a market that can gap.

## Sources

- [Aave health factor and liquidations](https://aave.com/help/borrowing/liquidations)

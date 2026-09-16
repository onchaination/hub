---
schema: 1
title: "Check a lending position\u2019s health factor"
description: "Reconcile the market\u2019s safety measure and model changes before relying on an alert."
tags: [lending, risk]
level: intermediate
updated: 2026-09-16
related: [learn/liquidation, skills/calculate-ltv]
---

Start with: [liquidation](../../learn/liquidation/en.md), [calculate ltv](../../skills/calculate-ltv/en.md).

## Before you start

Use a market that documents a health-factor model. Find current liquidation thresholds, eligible collateral, debt and oracle values. Other lending designs can use different measures.

## Steps

1. For each eligible collateral asset, multiply its value by its applicable liquidation threshold expressed as a decimal.
2. Add those adjusted values and divide by total debt value. For an Aave-style model, this is health factor. With no debt, the ratio is not an ordinary finite number.
3. Compare your result with the interface. Check risk modes, asset restrictions, price changes and interest if values differ.
4. Recalculate for a significant collateral decline or debt increase. Decide whether your planned repayment remains feasible under that scenario.
5. Record a monitoring and action plan. Maintain fee assets and access to a verified repayment interface; notifications alone do not execute a repayment.

## Verify the result

Illustration: $10,000 collateral × 0.80 ÷ $2,000 debt = 4. With collateral at $6,000, the result is 2.4. These inputs are hypothetical and not a safe target. In the documented Aave model, below 1 indicates liquidation eligibility.

## If something differs

Do not infer safety from a green color alone. Thresholds can change, multiple assets can fall together and oracle updates can be abrupt. If you cannot reconcile the measure, stop increasing exposure and investigate before relying on it.

## Sources

- [Aave health factor and liquidations](https://aave.com/help/borrowing/liquidations)

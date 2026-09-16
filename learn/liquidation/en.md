---
schema: 1
title: "Liquidation is an enforced reduction of debt"
description: "Understand thresholds, health factor and why a safety buffer needs monitoring."
tags: [lending, risk]
level: intermediate
updated: 2026-09-16
related: [learn/collateral]
---

Start with: [collateral](../../learn/collateral/en.md).

Liquidation lets a protocol reduce an undercollateralized debt by transferring or selling collateral under its rules. It protects the lending system and can impose a penalty or discount on the borrower.

## A health-factor example

Aave-style health factor compares threshold-adjusted collateral with debt:

`health factor = sum(collateral value × liquidation threshold) ÷ total debt value`

With one collateral worth $10,000, an illustrative 80% threshold and $2,000 debt, the result is 4. If that collateral falls to $2,500, the result reaches 1. A health factor below 1 makes positions eligible for liquidation in this model. This is an illustration, not a safe target or a universal market formula.

The 80% figure is not a recommended threshold and must not be copied into a live borrowing decision. Markets can change parameters. Interest, depegs and oracle updates can move the ratio without a new transaction from you.

## Why alerts are not enough

Notifications can arrive late. A congested network, unavailable interface or missing fee asset can prevent a timely repayment. Partial liquidation, penalties and eligible debt amounts vary by protocol and position.

Repaying debt or adding eligible collateral may improve health, but a buffer never removes contract or asset risk. Keep a practical exit plan and consider whether you can repay without selling the same falling asset.

<details>
<summary>❓ If debt rises while collateral stays constant, what happens to health factor?</summary>

It falls. Monitoring only the collateral price misses part of the risk. Use [Check a lending position's health factor](../../skills/check-health-factor/en.md) to model both sides.

</details>

## Sources

- [Aave health factor and liquidations](https://aave.com/help/borrowing/liquidations)

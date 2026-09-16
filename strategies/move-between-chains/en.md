---
schema: 1
title: "Move between chains only for a clear purpose"
description: "Compare the benefit of a destination with bridge, asset and exit dependencies."
tags: [bridges, fees, risk]
level: intermediate
updated: 2026-09-16
related: [learn/bridge, tools/bridges]
---

Start with: [bridge](../../learn/bridge/en.md), [bridges](../../tools/bridges/en.md).

## Objective

Access a specific destination application or recipient while understanding what you receive and how you can leave.

## Prerequisites and assumptions

The recipient or application supports the destination network and exact asset. You have a verified bridge route and can pay destination fees. Waiting periods are acceptable for your purpose.

## Mechanics

A cross-chain route coordinates source and destination actions. Record both transaction identifiers and any claim step. A completed source transaction is not sufficient evidence of delivery.

## Approaches and tradeoffs

| Approach | Useful when | Added dependency |
| --- | --- | --- |
| Stay on the source network | The destination benefit is smaller than moving costs | None from moving |
| Bridge | You need a specific destination application or recipient | Bridge verification, liquidity or custody model |
| Custodial withdrawal route | The provider supports both networks and exact asset | Provider access and withdrawal policy |
| Direct issuer route | The issuer supports the conversion you need | Issuer eligibility and operating process |

Evaluate each concrete route; category names do not establish safety.

## Risks

Wrong networks, unsupported token representations, unavailable gas, message delays, bridge failures and destination-contract risk can make a cheap move expensive. A return route may take longer or cost more than entry.

## Example

You expect to save $6 on future actions. Entry costs $2, destination setup costs $1 and the planned exit costs $4. That is $7 of cost before considering bridge risk, so the fee-saving rationale does not hold under these assumptions.

<details>
<summary>❓ Which cost is easiest to miss in this example?</summary>

The planned exit. Compare the complete round trip with staying on the source network, then evaluate the route with [Evaluate a bridge route](../../tools/bridges/en.md).

</details>

## When it may not make sense

It may not make sense for one tiny action or if the destination benefit is vague. Test a modest amount when proportionate to fees, verify delivery, and avoid increasing the transfer just because the first one succeeded. Use the [bridge procedure](../../skills/bridge-assets/en.md) for execution.

## Sources

- [Ethereum bridge overview](https://ethereum.org/en/bridges/)

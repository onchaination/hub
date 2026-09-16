---
schema: 1
title: "Bridge and track both sides of a transfer"
description: "Verify route details, destination delivery and any required claim step."
tags: [bridges, transactions]
level: intermediate
updated: 2026-09-16
related: [learn/bridge, tools/bridges]
---

Start with: [bridge](../../learn/bridge/en.md), [bridges](../../tools/bridges/en.md).

## Before you start

Confirm that the recipient and intended application accept the destination network and exact asset. Research the return route, waiting period and required gas on both sides. Use a small test when proportionate to costs.

## Steps

1. Open the official route interface. Select source and destination networks and verify both asset identifiers. Check minimums and any destination-gas option.
2. Record expected output, costs, recipient, estimated stages and any claim requirement. Make sure a faster route’s extra dependencies are understood.
3. Review any approval or permit, then the source action. Sign only the intended amount and destination. Save the source identifier and route reference.
4. Track the transfer through the official interface and source explorer. Wait through documented stages; source success alone is not completion.
5. Complete a documented destination claim if needed, checking the request again. Verify the destination transaction, received asset and available fee balance.

## Verify the result

The correct recipient holds the intended token on the destination network and can use it there. Record destination as well as source identifiers. Reconcile actual amount with the route’s fees.

## If something differs

If delayed, check official status information before repeating. Avoid fake recovery sites and private-message support. A wrong destination asset or network may not be recoverable through an ordinary reverse transfer; do not improvise with a larger amount.

## Sources

- [Ethereum bridge overview](https://ethereum.org/en/bridges/)

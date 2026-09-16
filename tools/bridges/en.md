---
schema: 1
title: "Evaluate a bridge route"
description: "Compare the asset delivered, verification model, waiting periods and return journey."
tags: [bridges, security]
level: intermediate
updated: 2026-09-16
related: [learn/bridge]
---

Start with: [bridge](../../learn/bridge/en.md).

Evaluate a route between two specific networks and two specific asset representations. “Supports USDC” is incomplete without the networks and destination contract or mint.

## Route checklist

Record the source asset, destination asset, expected delivered amount, fees, estimated duration and required claims. Find the documented trust model: what validates messages, who holds backing, and who can pause or upgrade the system?

Issuer burn-and-mint routes, canonical rollup bridges and liquidity-based routes solve different problems. Compare their dependencies instead of assigning safety from one category name. Faster delivery can add a liquidity provider or other intermediary.

## Include the return trip

A cheap entry is not enough. Look up the reverse route, minimum amounts, waiting periods and gas requirements. Some interfaces offer destination gas; verify the exact amount and conditions rather than assuming it is included.

Example: you plan to move a small balance for one low-fee swap. Two bridge fees plus the swap and exit costs may exceed the saving. Staying on the original network may be simpler.

## Before selecting an interface

Reach the route through official project or network documentation. Inspect source and destination explorer links. Locate transfer tracking and recovery instructions that use public identifiers only.

If a transfer is delayed, do not repeatedly resend funds or use a “recovery” link from a private message. Follow the documented status process. A source-side success does not establish destination delivery, and a successful test transfer does not prove the bridge cannot later fail.

## Sources

- [Ethereum bridge overview](https://ethereum.org/en/bridges/)

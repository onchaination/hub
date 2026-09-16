---
schema: 1
title: "Evaluate a decentralized exchange interface"
description: "Compare execution routes, minimum output, permissions and total swap cost."
tags: [defi, liquidity]
level: intermediate
updated: 2026-09-16
related: [learn/liquidity, learn/approvals]
---

Start with: [liquidity](../../learn/liquidity/en.md), [approvals](../../learn/approvals/en.md).

A DEX interface prepares a trade against onchain liquidity. An aggregator may route through several pools or protocols. The website, routing service and execution contracts are separate things to investigate.

## Compare the same trade

Use the same network, input asset, amount and destination asset. Compare output after route fees, network fees, price impact and any approval cost. A nominally better token price may lead to a worse total result.

Check the exact token contracts or mints, minimum received, deadline where available and allowed spender. Find documentation explaining whether a quote is firm, indicative or dependent on a later auction. Some routes involve signed orders rather than immediate swaps.

## A decision example

Route A quotes 100 units with a 1-unit equivalent total cost. Route B quotes 101 with a 3-unit cost. Under those assumptions A has the better net result. If either quote changes before execution, repeat the comparison.

An allowance for an aggregator can have different scope from an allowance for one pool. Read what remains authorized after the swap. Do not approve an unfamiliar contract merely because a familiar logo appears.

## Limits

Simulation cannot guarantee inclusion at the previewed state. High slippage may expose you to poor execution or ordering attacks; extremely low tolerance can cause failures. Unsupported or restricted tokens can behave differently from ordinary tokens.

Evaluate failed-trade information and the route's privacy assumptions. A “protected” route is a specific service claim to verify, not a general assurance that execution cannot be manipulated.

## Sources

- [Uniswap concentrated liquidity](https://developers.uniswap.org/docs/get-started/concepts/liquidity-providers/concentrated-liquidity)
- [ERC-20 allowance standard](https://eips.ethereum.org/EIPS/eip-20)
- [ERC-2612 signed permits](https://eips.ethereum.org/EIPS/eip-2612)
- [MEV and ordering](https://ethereum.org/en/developers/docs/mev/)

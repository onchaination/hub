---
schema: 1
title: "Treat liquidity provision as inventory management"
description: "Compare earned fees with changing asset exposure, adverse selection and exit costs."
tags: [liquidity, defi, risk]
level: advanced
updated: 2026-09-16
related: [learn/liquidity, learn/mev, tools/dexes]
---

Start with: [liquidity](../../learn/liquidity/en.md), [mev](../../learn/mev/en.md), [dexes](../../tools/dexes/en.md).

## Objective

Offer trading inventory in exchange for possible fees while accepting changes in the assets you hold.

## Prerequisites and assumptions

You understand both assets, the pool design and how to remove the position. You can monitor a chosen range when using concentrated liquidity. You compare results with holding the same starting assets.

## Mechanics

Traders exchange against the pool and alter its inventory. Your claim changes accordingly. In range-based designs, only active liquidity earns swap fees; outside the chosen range you can become concentrated in one asset.

## Approaches and tradeoffs

Broad ranges usually need less intervention but spread capital across more prices. Narrow ranges can concentrate exposure and fee opportunities while increasing the chance of becoming inactive. Rebalancing changes inventory again and costs fees; it is not a free reset of losses.

## Risks

Price movement, adverse selection, contract bugs, depegs and MEV can reduce returns. Fee income can be lower than the loss relative to holding. A receipt token or position NFT may itself carry transfer or operator permissions.

## Example

For a simple constant-product, full-range pool with no fees, a doubling of one asset’s relative price produces roughly 5.7% less value than holding the starting assets. This comparison assumes the basic model and says nothing about profit in dollars. Concentrated positions behave differently and can diverge more.

## When it may not make sense

It may not make sense if you need a fixed asset mix, cannot monitor the chosen design, or would be uncomfortable holding only one asset after a price move. Track deposits, withdrawals, fees and the holding benchmark rather than judging by fee income alone.

## Sources

- [Uniswap concentrated liquidity](https://developers.uniswap.org/docs/get-started/concepts/liquidity-providers/concentrated-liquidity)

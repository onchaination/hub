---
schema: 1
title: "Create a liquidity position deliberately"
description: "Choose assets and a range, review permissions and verify the position received."
tags: [liquidity, defi]
level: advanced
updated: 2026-09-16
related: [strategies/provide-liquidity, skills/swap-tokens]
---

Start with: [provide liquidity](../../strategies/provide-liquidity/en.md), [swap tokens](../../skills/swap-tokens/en.md).

## Before you start

Understand the pool design, both asset identifiers and how to remove liquidity. Decide how you would handle a one-sided position. Keep fees available and use an amount suitable for learning.

## Steps

1. Open the verified interface and select the exact network, pool and assets. Compare fee tier and liquidity design; similarly named pools can behave differently.
2. For concentrated liquidity, choose a price range and check which direction the interface quotes the pair. Reversing the displayed pair reverses the interpretation of bounds.
3. Enter amounts and review the required asset mix. Understand any proposed swap and its costs before accepting it.
4. Inspect each token allowance and the final position-creation request. Sign only after checking amounts, pool, range and recipient.
5. After confirmation, locate the receipt token or position NFT. Inspect deposited quantities, range, active status and uncollected fees.

## Verify the result

The position matches your intended pool and range, and you can locate the documented removal action. Save a starting inventory and value benchmark so fee income is not mistaken for total profit.

## If something differs

If one asset is missing or the position is inactive, first check the range, current price and pair orientation. Do not rebalance automatically: that is another trade with costs. A receipt in your wallet does not prove the underlying pool is safe.

## Sources

- [Uniswap concentrated liquidity](https://developers.uniswap.org/docs/get-started/concepts/liquidity-providers/concentrated-liquidity)

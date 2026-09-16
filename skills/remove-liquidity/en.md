---
schema: 1
title: "Remove liquidity and reconcile the assets"
description: "Distinguish reducing a position, collecting fees and converting what you receive."
tags: [liquidity, defi]
level: advanced
updated: 2026-09-16
related: [skills/provide-liquidity]
---

Start with: [provide liquidity](../../skills/provide-liquidity/en.md).

## Before you start

Locate the exact position, network and official interface. Keep enough fee assets. Know whether the design requires separate removal and collection steps.

## Steps

1. Inspect current position value, range and expected asset quantities. These may differ from your original deposit mix.
2. Choose the portion to remove. Read minimum amounts, slippage settings and whether accrued fees are collected in the same operation.
3. Review any receipt-token allowance or NFT operator permission. Check the destination and the final transaction’s effects.
4. Submit the intended removal. Complete a separate collection step only if the documented design requires it.
5. Check resulting wallet balances, remaining liquidity and uncollected fees. Record costs and compare with your starting inventory benchmark.

## Verify the result

For a full exit, the position has no remaining active liquidity and all intended assets and fees have been collected. An empty position NFT can remain even after funds are withdrawn. Exiting liquidity does not automatically swap the received assets into your preferred currency.

## If something differs

If amounts differ, examine current prices, range behavior and fees before sending another request. A one-sided withdrawal can be normal for an out-of-range position. Any subsequent swap is a separate decision with new price impact, permissions and fees.

## Sources

- [Uniswap concentrated liquidity](https://developers.uniswap.org/docs/get-started/concepts/liquidity-providers/concentrated-liquidity)

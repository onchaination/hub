---
schema: 1
title: "Liquidity is the ability to trade or withdraw"
description: "Understand pool inventory, price impact and why an available balance is not always an available exit."
tags: [liquidity, defi]
level: intermediate
updated: 2026-09-16
related: [learn/defi]
---

Start with: [defi](../../learn/defi/en.md).

Liquidity describes how readily an asset can be exchanged or withdrawn at an acceptable cost. A quoted market price does not mean a large order can execute at that price.

## Two meanings to keep separate

Trading liquidity is the inventory or orders available for a swap. Withdrawal liquidity is the asset available to leave a pool or lending market. A system can display a valuable position while lacking immediate cash for every participant to exit.

In an automated market maker, trades change pool inventory according to a pricing rule. Your own order can move that price: this is price impact. Slippage is the difference between an expected and executed result, which can also reflect other activity between quote and execution.

## A small illustration

A quoted rate suggests 100 tokens are worth $100. If selling 100 through a shallow pool returns $96, the difference is not necessarily a separate fee. Your trade may have moved the pool price. Review both explicit fees and expected output.

Liquidity providers supply inventory in exchange for potential fees. Their asset mix changes as traders trade against the pool. In concentrated-liquidity designs, a chosen price range determines when inventory is active; outside it, a position may be entirely one asset and stop earning swap fees.

Before providing inventory, compare the position with simply holding the same assets. Fees can fail to cover inventory losses, network costs and rebalancing. More volume does not guarantee a profitable position.

## Sources

- [Uniswap concentrated liquidity](https://developers.uniswap.org/docs/get-started/concepts/liquidity-providers/concentrated-liquidity)

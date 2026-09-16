---
schema: 1
title: "Transaction ordering can change your result"
description: "Understand arbitrage, liquidations and sandwiching before increasing slippage."
tags: [defi, transactions, risk]
level: advanced
updated: 2026-09-16
related: [learn/liquidity, learn/smart-contract, learn/liquidation]
---

Start with: [liquidity](../../learn/liquidity/en.md), [smart contract](../../learn/smart-contract/en.md), [liquidation](../../learn/liquidation/en.md).

Maximal extractable value, or MEV, is value obtainable through transaction inclusion, exclusion or ordering beyond ordinary block rewards and fees. The actors and transaction-distribution mechanisms differ between networks.

## Why order matters

If two trades affect the same pool, the second can face a different price. Searchers may compete to arbitrage price differences, execute eligible liquidations or exploit the movement caused by someone else's trade.

In a sandwich, an actor places a trade before yours and another after it, seeking to profit from the price movement around your order. A wide minimum-output tolerance can leave more room for a poor execution. Tight tolerance can instead make transactions fail when prices move.

## A concrete check

Your quote is 100 output units and your minimum is 95. You have authorized a range of acceptable outcomes down to 95, not guaranteed yourself 100. That difference can include market movement, price impact and ordering effects. Raising tolerance simply to make a trade succeed changes the risk you accept.

> [!NOTE]
> Minimum output is a protection boundary, not a prediction. Before swapping, review it with the other checks in [Swap tokens with a defined minimum output](../../skills/swap-tokens/en.md).

Private submission or protected routing may reduce public exposure but introduces dependence on the provider's behavior, availability and coverage. It is not a guarantee against every unfavorable trade.

Compare execution routes, liquidity depth, fees and minimum output. If the expected cost is hard to explain, pause. Splitting a trade can change impact but also creates more fees and opportunities for prices to change; it is not automatically better.

MEV is a useful risk concept, not an invitation to run extraction strategies before understanding transaction execution.

## Sources

- [Ethereum MEV documentation](https://ethereum.org/en/developers/docs/mev/)

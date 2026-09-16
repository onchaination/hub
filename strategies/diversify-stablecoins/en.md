---
schema: 1
title: "Diversify stablecoin dependencies"
description: "Compare issuers, backing, custody and exit routes rather than counting tickers."
tags: [stablecoins, risk]
level: intermediate
updated: 2026-09-16
related: [learn/stablecoin, learn/bridge]
---

Start with: [stablecoin](../../learn/stablecoin/en.md), [bridge](../../learn/bridge/en.md).

## Objective

Reduce reliance on one stablecoin failure path while keeping the overall position understandable.

## Prerequisites and assumptions

You can research backing and redemption, and can manage more than one asset without losing track of keys or fees. More assets are not automatically safer.

## Mechanics

Map each token’s issuer, reserves or collateral, custodians, network and bridge dependencies. A split only diversifies a risk if the underlying dependencies differ. The same issuer token on two networks can still share issuer risk.

## Approaches and tradeoffs

| Approach | Potential benefit | Shared or added risk |
| --- | --- | --- |
| One well-understood token | Simple to monitor and exit | Concentrated issuer and backing exposure |
| Several independent claims | Can reduce one failure dependency | More assets, fees and exits to manage |
| Native issuer versions | Can avoid some bridge exposure | Still shares issuer risk |
| Several tokens in one market | Diversifies token exposure | Shares the market's contract risk |

## Risks

Issuers may share banks or custodians. One stablecoin may hold another as backing. Thin exit markets, freezes, bridge failures and depegs can affect several positions together. Rebalancing costs and operational errors increase as the setup grows.

## Example

A $1,000 position split equally between two coins loses about $50 of market value if one falls 10% and the other holds its price, before costs. If both depend on the same failed custodian and fall together, the split provides much less protection. This is scenario arithmetic, not a suggested allocation.

> [!NOTE]
> Count independent dependencies, not tickers. Two labels can lead back to the same issuer, custodian, bridge or lending market.

## When it may not make sense

It may not make sense when the extra asset adds a less understood dependency, fees dominate the balance or you cannot access a reliable exit. Keep a simple dependency table and revisit it when backing, custody or redemption terms change.

## Sources

- [Ethereum stablecoins](https://ethereum.org/en/stablecoins/)
- [Circle transparency](https://www.circle.com/transparency)

---
schema: 1
title: "Stablecoins have different failure modes"
description: "Understand a price target, backing, redemption and depeg risk."
tags: [stablecoins, risk]
level: beginner
updated: 2026-09-16
related: [learn/token]
---

Start with: [token](../../learn/token/en.md).

A stablecoin targets a reference value, often one US dollar. The target is a design goal, not a promise that you can always sell or redeem at that price.

## What supports the target?

An issuer-backed coin may rely on reserves held through banks or custodians. A crypto-backed design may rely on collateral, price feeds and liquidation. Other designs depend heavily on incentives or confidence. Read the specific redemption rules instead of deciding from the word “stable.”

Holding a token onchain and being eligible to redeem directly with its issuer are different things. Access can depend on account eligibility, minimum amounts, geography or operating hours. Market traders may be your practical exit.

## Example: quantity versus value

You hold 1,000 units targeting $1. If the market price falls to $0.94, the quoted market value is $940 before fees. Your token count has not changed. A deposit showing more tokens can still be worth fewer dollars.

Ask who holds the backing, what reports are available, who can freeze or upgrade the token, and how redemption works under stress. A bridged version adds bridge dependencies to the issuer's risks.

## A useful comparison

Two different tickers may depend on the same custodian or use each other as backing. Splitting a balance between them does not necessarily diversify that dependency. Map the underlying claims before counting assets.

| Question | What it reveals |
| --- | --- |
| Who issues or governs it? | Control and freeze risk |
| What supports the target? | Reserve, collateral or incentive dependencies |
| Who can redeem directly? | Whether redemption is a practical exit for you |
| Which network version is this? | Added bridge or custody dependencies |

Stablecoin interest introduces additional lending or strategy risk. Merely owning a stablecoin does not explain where a yield offer comes from.

## Sources

- [Ethereum stablecoin overview](https://ethereum.org/en/stablecoins/)
- [Circle transparency](https://www.circle.com/transparency)

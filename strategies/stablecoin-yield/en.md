---
schema: 1
title: "Evaluate yield on stablecoins"
description: "Trace who pays a return and compare it with the risks and cost of leaving."
tags: [stablecoins, lending, risk]
level: intermediate
updated: 2026-09-16
related: [learn/stablecoin, learn/lending, tools/lending-markets]
---

Start with: [stablecoin](../../learn/stablecoin/en.md), [lending](../../learn/lending/en.md), [lending markets](../../tools/lending-markets/en.md).

## Objective

Evaluate whether a potential return compensates for the additional risks of deploying a stablecoin.

## Prerequisites and assumptions

You can identify the token, issuer, network and exact market. You understand withdrawal mechanics and have funds for fees. Rates and reward-token prices are variable.

## Mechanics

In a lending market, borrower payments can support supplier interest. Incentives may add a separate reward. A vault can combine several actions, adding its own contract and management dependencies. Follow each source of income separately.

## Approaches and tradeoffs

Compare direct supply, managed strategies and simply holding the token. Holding has no protocol yield but avoids that market’s extra exposure. Compare net income after entry, exit, conversion and monitoring costs. Higher advertised annual yield is not proof of a better risk-adjusted choice.

## Risks

Stablecoin depegs, contract exploits, bad debt, limited withdrawal liquidity and administrator changes can overwhelm interest. An incentive paid in another token can fall in value. A quoted annual rate is neither fixed nor guaranteed.

## Example

At an unchanged illustrative 4% simple annual rate, 1,000 units would earn about 40 units over a year before costs. A 2% depeg costs about 20 units of market value; a 10-unit round-trip cost consumes another quarter of the nominal interest. Actual rates, duration and compounding will change the result.

## When it may not make sense

It may not make sense for funds needed at a fixed near-term date, a small deposit with high costs, or any offer whose revenue source you cannot explain. Write an exit condition, such as a material change in backing or withdrawal availability, before supplying.

## Sources

- [Aave supplied assets](https://aave.com/help/supplying/supply-tokens)
- [Ethereum stablecoins](https://ethereum.org/en/stablecoins/)

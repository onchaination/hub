---
schema: 1
title: "DeFi is a set of financial programs"
description: "Trace an activity through the interface, contracts, assets and people controlling them."
tags: [defi, risk]
level: intermediate
updated: 2026-09-16
related: [learn/smart-contract, learn/stablecoin, learn/approvals]
---

Start with: [smart contract](../../learn/smart-contract/en.md), [stablecoin](../../learn/stablecoin/en.md), [approvals](../../learn/approvals/en.md).

Decentralized finance uses onchain programs for activities such as swapping, lending and providing liquidity. “DeFi” describes a way of arranging the activity; it does not grade its safety or prove that every part is decentralized.

## Follow the dependencies

A typical action passes through a website and wallet into contracts. Those contracts may depend on token issuers, price feeds, administrators and other protocols. The network can remain operational while one of these dependencies fails.

For example, supplying a stablecoin to a lending market gives you exposure to the stablecoin plus the market's accounting, collateral rules and available withdrawal liquidity. The wallet balance alone no longer tells the whole story.

## Ask where value comes from

Borrowers can pay interest. Traders can pay swap fees. A protocol can distribute incentives. These are different sources of revenue with different durability and costs. Rewards paid in another token add price exposure; a displayed annual rate does not promise a year's return.

The ability to combine protocols is useful, but it also combines failure paths. Borrowing against a receipt for another deposit can make an apparently simple position depend on several systems at once.

## Before using an application

Draw a four-box map: asset → contract → source of revenue → exit. Add anyone who can change the rules. If you cannot explain how to exit, or why someone pays you, read further before depositing.

Next, distinguish trading [liquidity](../liquidity/en.md) from borrowing through a [lending market](../lending/en.md).

## Sources

- [Ethereum DeFi overview](https://ethereum.org/en/defi/)

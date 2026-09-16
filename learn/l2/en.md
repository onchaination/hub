---
schema: 1
title: "Layer 2 changes where transactions execute"
description: "Understand rollup execution, settlement and the assumptions behind cheaper transactions."
tags: [scaling, fees]
level: intermediate
updated: 2026-09-16
related: [learn/blockchain, learn/network-fees]
---

Start with: [blockchain](../../learn/blockchain/en.md), [network fees](../../learn/network-fees/en.md).

A layer 2 executes activity away from a base chain while relying on that chain for part of its security or settlement. Ethereum rollups are a common example. A separate fast blockchain is not automatically an Ethereum L2.

## Follow three questions

Where does execution happen? Where is enough data published to check or recover state? How are invalid state claims prevented or challenged? Answers distinguish rollups from systems with other data-availability or trust assumptions.

A sequencer can give quick inclusion feedback while base-chain settlement arrives later. Those are different milestones. Optimistic and validity-proof systems establish correctness through different mechanisms, and their withdrawal paths can differ.

## A practical example

You see ETH in a wallet on Base. It is a balance on Base, not simultaneously spendable on Ethereum. Moving to Ethereum requires a supported transfer route and its settlement process. A faster third-party exit can exchange waiting time for fees and additional trust.

Compare total cost: execution, data or settlement charges, bridging and eventual exit. Cheap individual actions may not offset entry and exit costs for a tiny balance.

Also examine sequencer outages, upgrade controls, emergency exits and the maturity of the system's proof mechanisms. “Secured by Ethereum” is too broad to answer all these questions.

Exercise: if a transaction has a quick sequencer confirmation, has an Ethereum withdrawal necessarily completed? No. Check the status of each stage using the network's own documentation.

## Sources

- [Ethereum L2 overview](https://ethereum.org/en/layer-2/)
- [Base transaction finality](https://docs.base.org/specifications/transactions/transaction-finality)

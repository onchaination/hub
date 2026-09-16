---
schema: 1
title: "Accounts can use programmable authorization"
description: "Understand recovery, batching and sponsored fees without assuming security disappears."
tags: [wallets, smart-contracts, security]
level: advanced
updated: 2026-09-16
related: [learn/wallet, learn/approvals, learn/smart-contract]
---

Start with: [wallet](../../learn/wallet/en.md), [approvals](../../learn/approvals/en.md), [smart contract](../../learn/smart-contract/en.md).

Account abstraction lets account behavior use programmable authorization rather than one fixed signing pattern. A wallet might support multiple owners, limited session permissions, recovery or several actions in one request.

## Convenience moves the questions

A sponsored transaction still has a fee payer. A recovery feature still has an authority that can change access. A session key still needs limits on which actions it can authorize, for how long and for what value.

ERC-4337 is one Ethereum design: user operations can be bundled and executed through an EntryPoint contract, with optional paymasters sponsoring fees. It is one mechanism, not a universal description of every smart wallet or every chain's account model.

## A practical example

A wallet lets you approve and swap in one interaction. Review the combined effects: which token, which spender, how much allowance, expected output and any remaining permission. Fewer clicks do not imply less authority granted.

A recovery guardian might help after a lost device but also become a dependency. Learn the delay, threshold, cancellation process and how to remove a guardian before relying on it.

## Questions to take to wallet documentation

Can you export or recover control if the interface disappears? Are account upgrades possible? Which modules can execute transactions? Do restrictions apply onchain or only in a website's interface? Is the account available on every network you need?

Test recovery and limits with a small, separate account. Keep the core distinction: a friendly interface can hide complexity, but someone still has to understand the authorization rules.

## Sources

- [ERC-4337 account abstraction](https://eips.ethereum.org/EIPS/eip-4337)
- [Safe smart-account concepts](https://docs.safe.global/advanced/smart-account-concepts)

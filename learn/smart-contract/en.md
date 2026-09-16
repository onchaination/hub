---
schema: 1
title: "What smart contracts can and cannot guarantee"
description: "Read a program as rules with dependencies, permissions and possible bugs."
tags: [smart-contracts, security]
level: beginner
updated: 2026-09-16
related: [learn/transaction, learn/token]
---

Start with: [transaction](../../learn/transaction/en.md), [token](../../learn/token/en.md).

A smart contract is a program whose execution is checked by a blockchain. When you interact with it, the code and current state determine which changes are permitted. On Solana, programs execute instructions and work with separate accounts that hold state.

## The useful part

A swap contract can exchange assets according to specified rules without asking an operator to manually approve every trade. Anyone can inspect public code where it is available, and transactions can leave an observable record.

## The boundary

Code can contain bugs. A contract may depend on an oracle for prices, an administrator for upgrades, or another contract for assets. A website can also ask your wallet to call a different contract from the one described in its documentation.

Verified source code means an explorer has linked submitted source and build settings to deployed code under its verification process. It does not mean the contract was audited, that its economic design is sound, or that it cannot change through a proxy.

Example: a lending interface may quote a safe-looking position while its contract uses an oracle price different from the price on an exchange. The contract's input controls the result.

Before signing, identify the network, destination contract, requested action and asset permissions. If the wallet cannot explain a call, pause and investigate. A successful simulation describes one possible execution against a particular state; conditions can change before inclusion.

## Sources

- [Ethereum smart contracts](https://ethereum.org/en/developers/docs/smart-contracts/)
- [Solana programs](https://solana.com/docs/core/programs)

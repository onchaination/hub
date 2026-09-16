---
schema: 1
title: "What a wallet controls"
description: "Separate the wallet interface, public address, signing keys and recovery backup."
tags: [wallets, security]
level: beginner
updated: 2026-09-16
related: [learn/blockchain]
---

Start with: [blockchain](../../learn/blockchain/en.md).

A wallet is an interface for viewing accounts and authorizing actions. Assets are recorded on the network. Installing another compatible wallet does not move them; moving assets requires an authorized change to the network's records.

## Know which secret does what

| Item | Purpose | Share it? |
| --- | --- | --- |
| Public address | Identifies a destination or account | Yes when needed; consider privacy |
| Private key | Authorizes actions for a key-controlled account | Never |
| Seed or recovery phrase | Recreates signing keys in compatible wallets | Never |
| App password or device PIN | Unlocks a local app or device | Never; it is not usually a recovery backup |
| Signature | Proves authorization of particular data | Only after understanding what that data permits |

Not every wallet uses a seed phrase. Smart accounts can use multiple owners, passkeys or recovery services. Learn the actual recovery rules rather than assuming that a familiar login screen guarantees recovery.

## Custody is a responsibility

With a custodial service, the provider controls signing and account access under its rules. With self-custody, you control keys or account permissions and must protect recovery. A lost phone may be recoverable; a lost recovery method may not be.

Example: a watch-only wallet displays an address and balance but cannot spend from it. Visibility and control are different capabilities.

Before depositing anything, ask: who can authorize a transfer, who can change those rules, and how would I recover if this device failed? Never give a support agent a private key or recovery phrase.

## Sources

- [Ethereum wallets](https://ethereum.org/en/wallets/)
- [Ethereum security and scam prevention](https://ethereum.org/en/security/)

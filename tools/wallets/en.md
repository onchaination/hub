---
schema: 1
title: "Evaluate a wallet"
description: "Choose an account interface by custody, permissions, recovery and network support."
tags: [wallets, security]
level: beginner
updated: 2026-09-16
related: [learn/wallet, learn/address]
---

Start with: [wallet](../../learn/wallet/en.md), [address](../../learn/address/en.md).

A wallet's most important feature is whether you can understand and safely control your account. Start with the networks and actions you actually need. More integrated features can mean more permissions and more ways to make a mistake.

## Compare before installing

| Question | Evidence to seek |
| --- | --- |
| Who controls signing? | Documented custody and recovery model |
| What networks and account types work? | Exact support list, including hardware and smart accounts |
| Can I understand a request? | Clear transaction previews, spender details and message contents |
| Can I recover without this interface? | A documented recovery or export path suitable for the account |
| How is the software distributed? | Official download links, verified publisher and update history |

Browser extensions, mobile apps and hardware-connected interfaces make different convenience tradeoffs. A watch-only interface is useful for checking balances without signing access. An exchange balance introduces the exchange's custody and withdrawal rules.

## A small evaluation exercise

Use a new, low-value account. Find its network and receiving address, inspect a transaction preview and locate the official backup instructions. Stop if the software asks you to upload a recovery phrase, turn off protection or sign an unexplained request.

> [!WARNING]
> Do not test recovery by importing a hardware wallet's seed into a browser extension. That changes the key's exposure.

Follow the device's official verification procedure instead.

A wallet warning is useful evidence, not a complete contract audit. Maintain your own destination, asset and permission checks. Record why you chose the wallet so that a later feature change does not silently change your assumptions.

## Sources

- [Ethereum wallets](https://ethereum.org/en/wallets/)
- [Ethereum security and scam prevention](https://ethereum.org/en/security/)

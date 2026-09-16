---
schema: 1
title: "Addresses need a network"
description: "Understand public destinations, account models and why matching text is not enough."
tags: [wallets, transactions]
level: beginner
updated: 2026-09-16
related: [learn/wallet]
---

Start with: [wallet](../../learn/wallet/en.md).

An address identifies a destination or account under a network's rules. It is public information. It is not a password, private key or guarantee that someone can receive the asset you plan to send.

## An address is only part of the destination

Before a transfer, establish the network, address, asset and any required memo or tag. Exchanges sometimes use a shared deposit address plus a memo to identify customers. Follow the receiving service's current instructions exactly.

Ethereum and many EVM networks use similar address formats. The same text can appear on Ethereum and Base while referring to separate state and balances. A receiving service supporting one network may not support the other.

Bitcoin addresses describe spending conditions for outputs; a wallet commonly generates fresh receiving addresses. Ethereum has key-controlled and contract accounts. On Solana, an account address may hold program data; token holdings use token accounts associated with a mint. A wallet can present these details behind a simpler receiving screen.

## A practical check

A friend sends you an address:

1. Ask which network and asset they expect through a trusted channel.
2. Compare the full destination in the wallet's signing screen.
3. Check whether the recipient requires a memo or tag.
4. After sending, verify the result with the [transaction-check procedure](../../skills/check-transaction/en.md).

> [!WARNING]
> Do not copy a similar-looking address from transaction history. Attackers can place lookalikes there.

A small test transfer can uncover a network or deposit problem. It cannot prove that a recipient or contract is honest. Keep the address public only where necessary, because sharing it can reveal connected activity.

## Sources

- [Ethereum accounts](https://ethereum.org/en/developers/docs/accounts/)
- [Solana accounts](https://solana.com/docs/core/accounts)
- [Bitcoin transactions](https://developer.bitcoin.org/devguide/transactions.html)

---
schema: 1
title: "A token is a record with rules"
description: "Identify assets by network and contract or mint, not by ticker or logo."
tags: [tokens, security]
level: beginner
updated: 2026-09-16
related: [learn/transaction]
---

Start with: [transaction](../../learn/transaction/en.md).

A token is an asset representation maintained under a blockchain's rules. A network's native asset pays for core network activity; other tokens are usually tracked by contracts or token programs.

## Names do not identify assets

Two unrelated issuers can use the same ticker. For an EVM token, verify its network and contract address. On Solana, verify the network and mint address, and which token program manages it. A logo supplied by an interface is only a label.

Fungible tokens represent interchangeable units. NFTs represent distinct token identifiers. Neither form alone proves a legal claim, copyright or right to redeem something offchain.

## Supply and permissions matter

A token may have minting, freezing, transfer restrictions or upgrade powers. These are separate from its price. An asset can follow an interface standard and still include unusual behavior such as transfer fees.

For example, an interface may show 1,000 units while the contract stores an integer scaled by a decimals value. Decimals affect display precision; they do not make one token more valuable than another.

## An asset checklist

Before using a token, record the network, contract or mint, issuer or governing program, and any redemption process. Compare these details with independent official documentation. If a token appears unexpectedly in your wallet, you do not have to claim or interact with it.

<details>
<summary>❓ Is a bridged token necessarily the same claim as the issuer's native token on that chain?</summary>

**No.** A bridge may introduce a separate custody or backing dependency, even if the displayed name is similar. Read [Bridges connect separate asset systems](../../learn/bridge/en.md) before treating the assets as interchangeable.

</details>

## Sources

- [ERC-20 standard](https://eips.ethereum.org/EIPS/eip-20)
- [Solana token basics](https://solana.com/docs/tokens)

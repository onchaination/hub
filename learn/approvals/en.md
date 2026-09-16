---
schema: 1
title: "Approvals are spending permissions"
description: "Distinguish connecting a wallet, sending tokens and authorizing future spending."
tags: [security, tokens]
level: beginner
updated: 2026-09-16
related: [learn/smart-contract, learn/wallet]
---

Start with: [smart contract](../../learn/smart-contract/en.md), [wallet](../../learn/wallet/en.md).

A token approval grants a spender permission to move a token under defined rules. It is not necessarily a transfer now. On common ERC-20 tokens, the allowance belongs to a combination of owner, token and spender on one network.

## Four actions that look similar

- Connecting a wallet exposes selected account information to an app; it normally does not grant token spending permission.
- A transfer sends assets now.
- An approval allows a spender to transfer up to an allowance later.
- A signed permit can authorize an allowance through a signature, potentially submitted later by someone else.

Some token systems also support operator approvals for whole NFT collections. Solana token delegates have different mechanics. Do not assume an ERC-20 revoke interface covers all networks or permissions.

## Limit the exposure

If a swap needs 25 units, compare an allowance for 25 with an unlimited allowance. A narrower permission reduces the amount exposed to that spender, but may require another approval next time. It does not protect funds already deposited in a protocol.

Disconnecting a site does not remove onchain allowances. Revoking a permission changes it onchain and may require a fee. It cannot recover funds already moved or fix a compromised signing key.

Before signing a permit, inspect the token, spender, amount, network and expiry where present. A signature without a gas fee can still authorize spending. Never treat “sign message” as automatically harmless.

## Sources

- [ERC-20 allowance standard](https://eips.ethereum.org/EIPS/eip-20)
- [ERC-2612 signed permits](https://eips.ethereum.org/EIPS/eip-2612)

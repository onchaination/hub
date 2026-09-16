---
schema: 1
title: "Revoke an unnecessary token approval"
description: "Reduce a supported onchain allowance and verify that the change took effect."
tags: [tokens, security]
level: intermediate
updated: 2026-09-16
related: [learn/approvals, tools/security-tools]
---

Start with: [approvals](../../learn/approvals/en.md), [security tools](../../tools/security-tools/en.md).

## Before you start

Use a verified tool or token interface for the correct network. Keep enough of its fee asset. You need a public address and signing access, never a private key pasted into the tool.

## Steps

1. Inspect allowances for your address. Identify the exact token and spender, and distinguish token allowances from NFT operator permissions or smart-account modules.
2. Choose the permission you no longer need. Check that the proposed action reduces or removes that permission rather than granting a new one.
3. Review the wallet transaction and fee. Submit once if it matches the intended revoke action.
4. Wait for successful inclusion, then refresh or independently inspect the allowance. A pending request has not necessarily removed authority.
5. Repeat only for other permissions you understand. Review the application connection separately if you also want the site disconnected.

## Verify the result

The supported permission is zero or disabled in the confirmed onchain state. Keep the transaction identifier. A reduced allowance does not withdraw a protocol deposit or refund a past transfer.

## If something differs

An attacker may spend before your revoke is included. A compromised key can grant fresh permissions. Some signed permits or delegated mechanisms need different invalidation steps; consult their documentation rather than assuming an allowance dashboard covers everything.

## Sources

- [ERC-20 allowance standard](https://eips.ethereum.org/EIPS/eip-20)
- [ERC-2612 signed permits](https://eips.ethereum.org/EIPS/eip-2612)
- [Ethereum security and scam prevention](https://ethereum.org/en/security/)

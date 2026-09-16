---
schema: 1
title: "Approve a specific spender"
description: "Inspect a token allowance before granting permission that can outlive one transaction."
tags: [tokens, security]
level: intermediate
updated: 2026-09-16
related: [learn/approvals, skills/verify-contract]
---

Start with: [approvals](../../learn/approvals/en.md), [verify contract](../../skills/verify-contract/en.md).

## Before you start

Know the intended application contract, token and network. This procedure describes common ERC-20 allowances; NFT operators and Solana delegates use different interfaces and rules.

## Steps

1. Identify why the application needs an allowance. A basic wallet connection or public balance lookup should not require spending permission.
2. Compare the requested spender with official contract information for this deployment. The spender may differ from the website address or pool address.
3. Choose an amount appropriate to the action where the token and interface support it. Read unlimited approvals as continuing exposure, not a harmless default.
4. Inspect the wallet request. For a signed permit, also inspect domain, chain, spender, amount and expiry where shown. Reject unreadable or unexplained data.
5. Confirm the permission through a trusted allowance view after inclusion. For a permit, understand that signing alone may leave an authorization that someone can submit later.

## Verify the result

You can state which owner, token and spender are involved, the allowed amount and whether the authority persists after the next action. If an approval transaction was needed, check its success separately from the swap or deposit.

## If something differs

Disconnecting a website does not revoke this permission. Some tokens require setting an allowance to zero before changing it; follow verified token documentation. Never assume one revoke action invalidates every outstanding signature mechanism.

## Sources

- [ERC-20 allowance standard](https://eips.ethereum.org/EIPS/eip-20)
- [ERC-2612 signed permits](https://eips.ethereum.org/EIPS/eip-2612)

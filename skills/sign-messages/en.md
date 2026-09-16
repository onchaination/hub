---
schema: 1
title: "Read a message before signing it"
description: "Distinguish login statements from permits, orders and other actionable authorizations."
tags: [wallets, security]
level: advanced
updated: 2026-09-16
related: [learn/approvals, skills/verify-contract]
---

Start with: [approvals](../../learn/approvals/en.md), [verify contract](../../skills/verify-contract/en.md).

## Before you start

Know the site and the exact purpose of the request. A signature can authorize an action without immediately spending a network fee. Do not sign data you cannot explain.

| Message type | Check |
| --- | --- |
| Login statement | Domain, account, purpose, nonce and expiry |
| Permit | Token, spender, amount, network and expiry |
| Order | Assets, quantities, price limits and cancellation rules |
| Opaque payload | Stop unless a trusted display or documentation explains it |

## Steps

1. Confirm the domain and account. For login, check that the statement names the expected site and purpose rather than a token allowance or order.
2. Read all displayed fields. Identify network, destination or spender, amount, expiry and nonce where the signing format provides them.
3. For a permit or order, understand who may submit it, what assets it controls and how it expires or can be cancelled. A signature can remain useful after you disconnect.
4. Compare the trusted device display where supported. If only an unexplained hash or opaque payload appears, stop instead of enabling blind signing as a shortcut.
5. Sign only a request whose authority you accept. Keep the public request details for your own records without storing or sharing private keys.

## Verify the result

The application completes only the intended login or authorization workflow. For an onchain permit or order, monitor the resulting permission or execution when submitted; absence of an immediate transaction does not mean absence of authority.

## If something differs

If you signed an unexpected permission, inspect its specific cancellation rules through official documentation. Revoking one current allowance may not invalidate every unsubmitted signature mechanism. Treat suspected key exposure separately from an unwanted signature.

> [!NOTE]
> No immediate transaction does not mean no authority was granted.

## Sources

- [ERC-20 allowance standard](https://eips.ethereum.org/EIPS/eip-20)
- [ERC-2612 signed permits](https://eips.ethereum.org/EIPS/eip-2612)
- [Sign-In with Ethereum](https://eips.ethereum.org/EIPS/eip-4361)

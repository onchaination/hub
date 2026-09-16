---
schema: 1
title: "Secure a wallet and its recovery"
description: "Review backup exposure, device access and spending permissions without revealing secrets."
tags: [wallets, security]
level: beginner
updated: 2026-09-16
related: [learn/wallet, learn/approvals]
---

Start with: [wallet](../../learn/wallet/en.md), [approvals](../../learn/approvals/en.md).

## Before you start

Set aside time in a private place. You need the official wallet documentation, your public account details and access to the existing recovery process. No online checklist needs your private key or seed phrase.

## Steps

1. List accounts, networks and recovery methods. Keep public operational notes separate from secret backups. Identify accounts sharing one seed so you understand common exposure.
2. Check where backups exist. Protect offline copies against theft and damage. If a secret was uploaded, photographed or shared, treat that as possible key exposure; deleting the copy does not prove it was never copied.
3. Update the wallet and device through verified channels. Use a strong unique password or PIN and lock unattended devices. Review browser extensions and applications that can influence signing.
4. Inspect active spending permissions using a verified allowance tool. Revoke unnecessary permissions where appropriate and verify the confirmed result. Disconnecting a site is a separate action.
5. Use the wallet’s documented backup check and review your recovery plan. Keep a small fee balance for exits. Consider separating frequent experimentation from long-term holdings.

## Verify the result

You know the recovery method, where authorized backups are kept, which permissions remain and how you would act after device loss. A successful backup check should not require sending secrets to another person.

## If something differs

If you suspect key compromise, permission cleanup alone is insufficient. Use official incident guidance from a clean device and consider moving assets to a newly secured account. Do not follow urgent “support” messages or sign unexplained rescue transactions.

## Sources

- [Ethereum security and scam prevention](https://ethereum.org/en/security/)
- [ERC-20 allowance standard](https://eips.ethereum.org/EIPS/eip-20)
- [ERC-2612 signed permits](https://eips.ethereum.org/EIPS/eip-2612)

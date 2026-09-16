---
schema: 1
title: "Hold assets with a recovery plan"
description: "Reduce avoidable custody and signing failures without adding unnecessary complexity."
tags: [security, wallets]
level: beginner
updated: 2026-09-16
related: [learn/wallet, learn/approvals]
---

Start with: [wallet](../../learn/wallet/en.md), [approvals](../../learn/approvals/en.md).

## Objective

Keep control of assets through device loss, routine use and attempted scams. The goal is a process you can actually maintain.

## Prerequisites and assumptions

Understand public addresses, private keys and backups. Decide who must be able to recover access. This approach assumes self-custody is appropriate for you and that you can protect recovery material.

## Mechanics

Separate long-term holdings from frequent application use when that makes permissions easier to monitor. Protect each account according to its value and intended use. Keep enough fee assets to make an exit transaction.

## Approaches and tradeoffs

A hardware wallet reduces routine key exposure but adds backup and device responsibilities. A multisig can remove a single signer dependency but adds coordination. A single well-understood setup may be safer than an elaborate one you cannot recover.

## Risks

Exposed backups, phishing, mistaken transfers and harmful approvals remain possible. Splitting accounts that share one compromised seed does not isolate the underlying signing keys. A device PIN does not protect a copied backup.

## Example

You use one account for occasional small experiments and a separate recovery setup for long-term holdings. Before increasing balances, verify backup integrity using official tools and complete a small send-and-receive test. Record public account details and recovery instructions without putting secrets into a shared document.

## When it may not make sense

If managing several recovery methods makes failure more likely, simplify. If other people need access during an emergency, a plan only you understand is incomplete. Review the setup after device, household or signer changes, and avoid unnecessary transfers merely to appear more secure.

## Sources

- [Ethereum security and scam prevention](https://ethereum.org/en/security/)
- [Ethereum wallets](https://ethereum.org/en/wallets/)

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

| Setup | Benefit | Responsibility added |
| --- | --- | --- |
| Hardware wallet | Reduces routine key exposure | Device and backup recovery |
| Multisig | Can remove one-signer dependency | Signer coordination and replacement |
| Separate activity accounts | Limits some routine permissions | More accounts and fee balances to track |
| One simple setup | Easier to understand and recover | Concentrates control in one process |

A single well-understood setup may be safer than an elaborate one you cannot recover. Compare [wallets](../../tools/wallets/en.md), [hardware wallets](../../tools/hardware-wallets/en.md) and [multisig wallets](../../tools/multisig-wallets/en.md) before adding complexity.

## Risks

Exposed backups, phishing, mistaken transfers and harmful approvals remain possible. Splitting accounts that share one compromised seed does not isolate the underlying signing keys. A device PIN does not protect a copied backup.

> [!WARNING]
> Do not store recovery secrets in the operational notes used to track public accounts and procedures.

## Example

You use one account for occasional small experiments and a separate recovery setup for long-term holdings. Before increasing balances, verify backup integrity using official tools and complete a small send-and-receive test. Record public account details and recovery instructions without putting secrets into a shared document.

## When it may not make sense

If managing several recovery methods makes failure more likely, simplify. If other people need access during an emergency, a plan only you understand is incomplete. Review the setup after device, household or signer changes, and avoid unnecessary transfers merely to appear more secure.

## Sources

- [Ethereum security and scam prevention](https://ethereum.org/en/security/)
- [Ethereum wallets](https://ethereum.org/en/wallets/)

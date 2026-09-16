---
schema: 1
title: "Evaluate a hardware wallet"
description: "Compare trusted displays, recovery methods and the transactions a device can explain."
tags: [wallets, security]
level: beginner
updated: 2026-09-16
related: [learn/wallet, learn/approvals]
---

Start with: [wallet](../../learn/wallet/en.md), [approvals](../../learn/approvals/en.md).

A hardware wallet aims to keep signing keys isolated from the general-purpose computer or phone running the interface. It can still authorize a harmful transaction if you approve one.

## What to compare

Check which networks, account types and signing formats the device supports. A device may support basic transfers on a network but not clearly display every contract interaction. Decide which actions you need before comparing extra features.

| Area | Question to answer |
| --- | --- |
| Trusted display | Can you verify the full recipient and amount, or only opaque bytes? |
| Recovery | How is the backup created, checked and restored? |
| Device access | What do the PIN and any optional passphrase protect? |
| Updates | How are firmware and companion software verified? |
| Documentation | Can you confirm the process without relying on one interface? |

For an optional passphrase, understand that forgetting it can make the associated accounts inaccessible.

## Set up deliberately

Buy through a route you can verify against the manufacturer's instructions. Follow device authenticity and setup checks. Generate the backup during setup and protect every copy from theft and damage.

Example: a computer shows a familiar recipient but the device shows another. Reject the transaction. The device display is only helpful when you actually compare its contents.

> [!WARNING]
> Never use recovery words supplied with a device or enter your backup into a website, chat, photo or cloud note.

## Limits and an exit test

Hardware does not solve compromised recovery backups, blind signing or a malicious token allowance. A backup can authorize recovery elsewhere, bypassing the original device's PIN.

Before relying on a device, use its official backup-check feature and make a small transfer. Plan how you would regain access if the device were lost, without exposing the backup to ordinary software. Keep a separate account for experiments when that makes your permissions easier to understand.

## Sources

- [Ethereum security and scam prevention](https://ethereum.org/en/security/)
- [Trezor learning center](https://trezor.io/learn)

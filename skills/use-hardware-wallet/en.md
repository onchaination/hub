---
schema: 1
title: "Review and sign with a hardware wallet"
description: "Use the trusted display and preserve the separation of signing keys from everyday software."
tags: [wallets, security]
level: beginner
updated: 2026-09-16
related: [tools/hardware-wallets, skills/secure-wallet]
---

Start with: [hardware wallets](../../tools/hardware-wallets/en.md), [secure wallet](../../skills/secure-wallet/en.md).

## Before you start

Use a device initialized under its official setup and authenticity instructions. Verify your backup with the documented device procedure. Never import its recovery phrase into a website or ordinary wallet extension to connect it.

## Steps

1. Install the verified companion interface and connect through its hardware-wallet option. Check the selected network and account.
2. For receiving, display the full address on the device and compare it with the interface. Share only the public address and necessary network details.
3. For sending, prepare a small intended transaction in the interface. Inspect the device’s displayed recipient, amount and other supported details.
4. For contract interactions, understand what the device can and cannot display. Reject unexplained signing requests; hardware isolation does not make blind authorization safe.
5. Confirm only the reviewed request on the device, then inspect the transaction record and outcome. Disconnect or lock the device after use.

## Verify the result

The explorer shows the intended result and the private recovery material never left the trusted setup. A device being disconnected does not cancel token permissions you already granted.

## If something differs

If the computer and device disagree, reject the request. If asked to enter recovery words in the companion website, stop and verify official recovery instructions through a trusted source. An exposed backup can bypass the protection of the original device.

## Sources

- [Ethereum security and scam prevention](https://ethereum.org/en/security/)
- [Trezor learning center](https://trezor.io/learn)

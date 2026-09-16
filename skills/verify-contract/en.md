---
schema: 1
title: "Verify which contract you are using"
description: "Cross-check a deployed address, source information and upgrade permissions."
tags: [smart-contracts, security]
level: intermediate
updated: 2026-09-16
related: [learn/smart-contract, tools/block-explorers]
---

Start with: [smart contract](../../learn/smart-contract/en.md), [block explorers](../../tools/block-explorers/en.md).

## Before you start

Have the intended application, network and action in mind. This is an identity and evidence check, not a professional security audit. Public inspection should not require a wallet signature.

| Evidence | What it supports | What it does not prove |
| --- | --- | --- |
| Official address list | Intended deployment identity | That the code is safe |
| Verified source | Source corresponds under the verifier's process | Audit or economic safety |
| Audit report | Reviewed scope and findings at a point in time | Coverage of every version or risk |
| Upgrade information | Who may change implementation | That upgrades will be safe |

## Steps

1. Find contract addresses in official project documentation for the exact network and version. Cross-check through another official project resource where possible.
2. Open the address on the correct explorer. Compare the full address with the transaction destination or approval spender.
3. Inspect available source-verification information. On proxy systems, identify the implementation and who can upgrade it. On Solana, inspect program identity and upgrade authority using supported tooling.
4. Locate audit reports, including their scope, version and unresolved issues. A report for another deployment or old implementation may not cover the code you are using.
5. Read the wallet request against the intended contract function and permissions. If the preview is opaque, seek an explanation before signing.

## Verify the result

You can identify the deployment and explain what evidence supports it, what can change and what remains unknown. Source verification links code to a deployment under a verifier’s process; it does not certify safety.

## If something differs

A matching name, logo, long history or large balance is insufficient. If official sources conflict or an unexpected implementation is involved, pause. Do not “verify” your wallet by signing a transaction or revealing recovery material.

## Sources

- [Ethereum contract verification](https://ethereum.org/en/developers/docs/smart-contracts/verifying/)
- [Solana programs](https://solana.com/docs/core/programs)

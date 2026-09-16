---
schema: 1
title: "Evaluate security and approval tools"
description: "Use simulations, allowance viewers and warnings as evidence with clear limits."
tags: [security, wallets]
level: beginner
updated: 2026-09-16
related: [learn/approvals, learn/smart-contract]
---

Start with: [approvals](../../learn/approvals/en.md), [smart contract](../../learn/smart-contract/en.md).

Security tools can help explain transactions, inspect allowances or flag suspicious sites. They complement careful review. None can prove every action safe.

## Match the tool to the question

| Tool | What it can help answer | Important limit |
| --- | --- | --- |
| Allowance viewer | Which supported spenders have permission? | Coverage varies by network and token type |
| Revoke tool | Can I reduce a supported permission? | It prepares an onchain transaction |
| Simulator | What might this request do against current state? | State can change before inclusion |
| Contract scanner | Are known patterns or reports present? | No alert does not prove safety |

Ask how the tool obtains data, which networks it supports and what it cannot inspect. A clean result may simply mean no known issue was found. A false warning can also occur; investigate rather than automatically bypassing it.

## A safe evaluation

Start by viewing your public address without connecting a wallet. Compare a known allowance with the token contract or a second reputable view. If you revoke it, check the spender and new amount in your signing interface, then verify the resulting allowance.

Do not sign a new broad permission in order to “verify” or “protect” a wallet. Do not enter a seed phrase into a scanner. If a key is compromised, revoking one token permission does not stop the attacker from using the key again.

## Distinguish three responses

| Response | What changes |
| --- | --- |
| Disconnect | The application's connection to the wallet interface |
| Revoke | A supported onchain spending permission |
| Move assets | Which account controls the assets |

They solve different problems and involve different costs. Follow [Revoke an unnecessary token approval](../../skills/revoke-approvals/en.md) when an allowance is the issue.

Choose tools with clear documentation and verifiable distribution links. Avoid making an emergency decision from a sponsored search result or unsolicited support message.

## Sources

- [Ethereum security and scam prevention](https://ethereum.org/en/security/)
- [ERC-20 allowance standard](https://eips.ethereum.org/EIPS/eip-20)
- [ERC-2612 signed permits](https://eips.ethereum.org/EIPS/eip-2612)

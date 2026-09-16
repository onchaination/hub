---
schema: 1
title: "Tokenization links a record to a claim"
description: "Separate an onchain token from enforceable rights to an offchain asset."
tags: [tokens, risk]
level: advanced
updated: 2026-09-16
related: [learn/token, learn/stablecoin]
---

Start with: [token](../../learn/token/en.md), [stablecoin](../../learn/stablecoin/en.md).

Tokenization represents an asset or claim using a token. That representation can make transfers and accounting easier, but it does not automatically make the underlying asset available or the claim legally enforceable.

## Two records must agree

One record says which address holds a token. Another system may determine who owns a bond, holds a fund share or can redeem stored property. Issuers, custodians and legal agreements connect the two.

Ask what the token holder actually receives: ownership, a contractual claim, access, revenue participation or merely a record. Check eligibility, transfer restrictions, fees, redemption times and the jurisdiction governing disputes.

## An example without a price forecast

A token is described as a claim on a basket of short-term securities. Before treating it like cash, investigate who holds the securities, who can redeem, what happens outside business hours and whether the token can be frozen. A continuously traded token does not make its underlying market operate continuously.

A smart contract can enforce transfer restrictions without proving that reserves exist. An attestation covers a particular scope and time; it is not a guarantee against every future loss.

## A useful exercise

Draw a chain from your address to the token issuer, custodian and underlying asset. At every step, write the evidence supporting the claim and how you would exit. If one link is only marketing copy, the risk assessment is incomplete.

Tokenization can improve record keeping. It also preserves many old dependencies and may add contract and key-management risk.

## Sources

- [Circle reserve transparency as one issuer example](https://www.circle.com/transparency)
- [ERC-20 token interface](https://eips.ethereum.org/EIPS/eip-20)

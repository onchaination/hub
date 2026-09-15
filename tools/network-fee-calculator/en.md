---
schema: 1
title: Network fee calculator
description: Explore Ethereum and Solana fee models with local calculations, without connecting a wallet.
tags: [fees, ethereum, solana, transactions]
level: beginner
updated: 2026-09-13
related: [transaction, first-transfer]
---

Choose **Ethereum or Solana** to explore their different fee models. It runs locally, uses the numbers you enter, and never connects to a wallet.

## Try an estimate

Choose the network before entering values. These are educational estimates, not a comparison of identical transactions or a live quote.

**Ethereum inputs:**

- **Gas units:** the amount of computation used by an operation. Use your wallet's estimate for the operation you are considering.
- **Gas price (gwei):** the assumed effective price per gas unit. One gwei is one billionth of an ETH.

**Solana inputs (legacy/v0 transactions):** required signatures, base fee per signature in lamports, requested compute unit limit, and compute unit price in micro-lamports. The default base fee is an editable example; check the network before signing.

<!-- widget:network-fee -->

## The same calculation, by hand

```text
Execution fee in ETH = gas units × gas price in gwei ÷ 1,000,000,000
21,000 × 10 ÷ 1,000,000,000 = 0.00021 ETH
```

The example uses illustrative inputs, not a live fee quote. A simple Ethereum transfer to an ordinary account commonly uses 21,000 gas. Contract interactions can use more.

## Solana calculation, by hand

The priority fee uses the **requested compute unit limit**, not actual compute consumed, and rounds up to whole lamports. One SOL is one billion lamports.

```text
Priority fee = ceil(CU limit × CU price in micro-lamports ÷ 1,000,000)
Total SOL = (signatures × base fee + priority fee) ÷ 1,000,000,000
1 × 5,000 + ceil(200,000 × 1,000 ÷ 1,000,000) = 5,200 lamports
5,200 ÷ 1,000,000,000 = 0.0000052 SOL
```

This example models Solana's legacy/v0 compute-budget fee mechanism. It does not model future transaction formats that specify fees differently.

## What this estimate leaves out

For Ethereum, this is an **execution-fee estimate**, not a complete transaction quote. A gas limit is an upper bound, while actual fees depend on gas used and the effective gas price. Do not treat a maximum fee setting as a prediction of the final price.

Ethereum layer 2 networks may add data or other fees, and other EVM networks may use another fee asset. Solana account creation can require rent-exempt funding; program-specific charges can also apply. These costs are excluded. ETH and SOL amounts are not directly comparable; the calculator does not fetch token prices or estimate fiat costs.

Other chains can be documented alongside these examples, with their own units and formulas. Do not reuse one chain’s calculation just because another chain also charges fees.

Review the wallet's full fee estimate before signing. To understand the process around that signature, read [What happens when you send a transaction?](../../learn/transaction/en.md).

## Sources

- [Ethereum: gas and fees](https://ethereum.org/en/developers/docs/gas/)

- [Solana: fees](https://solana.com/docs/core/fees)

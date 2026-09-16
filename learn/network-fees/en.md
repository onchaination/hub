---
schema: 1
title: "What network fees pay for"
description: "Distinguish execution costs, priority, asset value and application charges."
tags: [fees, transactions]
level: beginner
updated: 2026-09-16
related: [learn/transaction]
---

Start with: [transaction](../../learn/transaction/en.md).

A network fee pays for processing a transaction under a chain's rules. It is separate from the amount transferred and from a swap, bridge or application fee.

## Different meters

| Network model | What to examine |
| --- | --- |
| Ethereum | Gas used and effective price per unit of gas |
| Solana | Signature fees plus a priority fee based on requested compute units and their price |
| Bitcoin | Transaction virtual size and fee rate, often shown in satoshis per virtual byte |
| Rollup | Execution plus any settlement/data-related charges exposed by the network |

A simple Ethereum illustration is 21,000 gas × 10 gwei = 0.00021 ETH. This is an arithmetic example, not a live quote or a gas limit suitable for every transfer. Token transfers and contract calls generally involve different work.

## Why a failed attempt can cost money

A network may spend resources executing a transaction that ultimately fails. Inclusion and successful execution are separate checks. A wallet's estimate also need not equal the final fee.

Keep some of the required fee asset available for the next action, including exiting a position. Owning a token does not necessarily let you pay the network fee in that token. Sponsored transactions have their own eligibility rules.

Try the [fee calculator](../../tools/network-fee-calculator/en.md). Double the price while keeping the work constant, then double the work. What happens to the estimate? For a real transaction, compare the wallet estimate with the receipt afterwards.

## Sources

- [Ethereum gas](https://ethereum.org/en/developers/docs/gas/)
- [Solana fees](https://solana.com/docs/core/fees)
- [Bitcoin transaction fees](https://developer.bitcoin.org/devguide/transactions.html#transaction-fees)

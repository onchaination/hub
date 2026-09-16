---
schema: 1
title: "Send and verify a transaction"
description: "Prepare a transfer, review its destination and check the recorded result."
tags: [transactions, wallets]
level: beginner
updated: 2026-09-16
related: [learn/address, learn/transaction, learn/network-fees]
---

Start with: [address](../../learn/address/en.md), [transaction](../../learn/transaction/en.md), [network fees](../../learn/network-fees/en.md).

## Before you start

Use a supported wallet, a recipient you can independently verify and an amount you can afford to test with. Confirm the receiver’s supported network, asset, minimum deposit and memo requirements. Keep enough for the fee.

> [!WARNING]
> A valid address on the wrong network is still the wrong destination.

## Steps

1. Obtain the full receiving address through a trusted channel. Avoid copying it from an unrelated transaction-history entry.
2. Select the intended network and exact asset. For tokens, verify the contract or mint. Enter the address, amount and memo or tag if the destination requires one.
3. Read the preview: recipient, network, asset, amount and fee. If using hardware, compare its trusted display. A transfer should not unexpectedly require broad token permissions.
4. Sign only the intended action and broadcast once. Save the transaction identifier and the network; an identifier alone does not establish successful delivery.
5. Open the correct explorer and check status, actual movements and fee. Confirm the recipient or service can access or has credited the intended asset.

## Verify the result

The confirmed record matches your intention and the recipient acknowledges receipt or the service credits it. On Bitcoin, inspect outputs and change with wallet context. On Solana, check execution errors as well as commitment status.

## If something differs

Do not repeat a pending transaction blindly. An unfamiliar contract request, mismatched address or unexplained fee is a reason to stop before signing. If already broadcast, investigate the original identifier first.

Use [Check a transaction on a block explorer](../../skills/check-transaction/en.md) before deciding whether any retry is appropriate.

## Sources

- [Ethereum transactions](https://ethereum.org/en/developers/docs/transactions/)
- [Solana transactions](https://solana.com/docs/core/transactions)
- [Bitcoin transactions](https://developer.bitcoin.org/devguide/transactions.html)

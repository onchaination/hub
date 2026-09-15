---
schema: 1
title: Make your first transfer easier to verify
description: Use a small test and explicit checks to reduce uncertainty before repeating an onchain transfer.
tags: [transactions, wallets, fees, security, ethereum, solana]
level: beginner
updated: 2026-09-13
related: [transaction, network-fee-calculator, check-transaction]
---

**Outcome:** confirm that you can send the intended asset on the intended network and verify its arrival before considering a larger transfer.

## When this approach fits

You are learning with two wallets you control, or with a recipient whose address you can independently confirm. You have enough of the network's native fee asset and can afford the small test amount and fees.

If the recipient is a service, first check its supported network, asset, minimum deposit, and any required memo or destination tag. A tiny transfer below its minimum may never be credited.

## Choose the network explicitly

| Network | Fee asset | What to verify |
| --- | --- | --- |
| Ethereum | ETH | Transaction hash, execution status, recipient or token-transfer logs, and finality. |
| Solana | SOL | Transaction signature, execution error, instructions/token balance changes, and processed/confirmed/finalized status. |

Use Ethereum mainnet or the intended Ethereum test network; on Solana, choose the intended cluster (such as mainnet-beta or devnet). Test assets have no mainnet spending power. For tokens, verify the Ethereum token contract or Solana mint and destination token-account owner, rather than relying on the display name.

## The approach

1. **Understand the action.** Read [how transactions work](../../learn/transaction/en.md). Confirm whether you are making a transfer, approving a spender, or calling a contract.
2. **Define the test.** Choose an amount you can afford to lose that still meets the recipient's requirements. Review the total fee; the [fee calculator](../../tools/network-fee-calculator/en.md) explains one part of that cost.
3. **Check the destination independently.** Confirm the full address through a trusted channel. Check the network and asset explicitly; similar names or the same address format are not enough.
4. **Send once and verify.** Review the wallet preview, sign only the intended action, and [check the transaction](../../skills/check-transaction/en.md). Confirm receipt in the destination wallet or service as well.
5. **Stop or proceed deliberately.** If any detail differs, stop and investigate. A later transfer needs its own review; do not assume a saved address or a successful test guarantees safety.

## Trade-offs and limits

A test takes time and usually adds another network fee. It can uncover an incorrect network or unsupported deposit route, but it does not prove a counterparty is trustworthy, a wallet is uncompromised, or a contract is safe.

> [!WARNING]
> If the test is pending or you cannot reconcile the result, do not repeat the transfer just to see whether it works. First establish what happened to the original transaction.

## Success criteria

You can identify the successful transaction on the correct network, reconcile its asset, amount, and destination, and confirm that the recipient can access or has credited it. Keep the transaction identifier (Ethereum hash or Solana signature) for your records.

## Sources

- [Ethereum: security and scam prevention](https://ethereum.org/en/security/) — address checks, transaction review, and common failure modes.

- [Solana: transactions](https://solana.com/docs/core/transactions)
- [Solana: transaction status](https://solana.com/docs/rpc/http/getsignaturestatuses)

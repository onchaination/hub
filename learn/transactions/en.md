---
schema: 1
id: transactions
title: What happens when you send a transaction?
description: Follow a transaction from your wallet to a block, and understand what a confirmation actually tells you.
tags: [transactions, wallets, security, ethereum, solana]
level: beginner
updated: 2026-09-13
related: [check-transaction, first-transfer]
---

A transaction is an instruction to change a blockchain's state. It might transfer an asset or call a smart contract. Your wallet prepares that instruction; the network checks and processes it.

## From intention to confirmation

1. **Prepare.** Your wallet assembles the recipient, amount, network, and any contract instructions. It shows an estimated network fee.
2. **Review and sign.** You authorize the instruction with your key. The private key stays in your wallet; the signature can be checked by others.
3. **Broadcast.** The signed transaction is sent to the network. Its transaction identifier lets you look up progress: a hash on Ethereum, or the first signature on Solana.
4. **Include.** A block producer includes it in a block. The network executes its instructions under the chain's rules.
5. **Confirm.** The explorer reports the result. Confidence in inclusion grows according to that chain's confirmation and finality rules.

Think of the transaction identifier as a tracking number, not a receipt proving delivery.

## A concrete example

You send a small amount of a network's native asset to a second wallet you control. Before signing, you check the destination address, the network, the amount, and the fee. After broadcasting, you use the identifier to [check the transaction](../../skills/check-transaction/en.md).

Seeing an identifier means the transaction has an identifier. Seeing **success** means its execution succeeded. You still need to confirm that the destination and asset match your intention.

## Ethereum and Solana: same questions, different details

| Check                 | Ethereum                                 | Solana                                        |
| --------------------- | ---------------------------------------- | --------------------------------------------- |
| Native asset for fees | ETH                                      | SOL                                           |
| Identifier to look up | Transaction hash                         | First transaction signature                   |
| What executes         | A transfer or contract call              | One or more instructions to programs          |
| Finality              | Inclusion and the chain's finality state | Processed, confirmed, or finalized commitment |

Sending ETH on Ethereum and sending SOL on Solana are separate operations on separate networks. Matching token names do not make assets interchangeable. On Solana, inspect instruction results as well as confirmation status; confirmation alone does not mean execution succeeded.

## Three distinctions that matter

| What you see      | What it tells you                                                                                    |
| ----------------- | ---------------------------------------------------------------------------------------------------- |
| Pending           | It has not yet been included; it may still be delayed or dropped.                                    |
| Failed / reverted | Execution did not complete as intended. An included failed transaction can still cost a network fee. |
| Successful        | Execution succeeded. It does not prove the recipient is trustworthy or the contract is safe.         |

> [!TIP]
> Network fees are separate from the amount you send. Keep enough of the network's fee asset to cover both. Try the [network fee calculator](../../tools/network-fee/en.md) to understand the arithmetic.

## Check your understanding

<details>
<summary>❓ Does signing always send a transaction?</summary>

**No.** Wallets can also sign messages. Some signatures authorize later actions without immediately broadcasting a transaction. Read the requested permission, not just the button label.

</details>

<details>
<summary>❓ You have a transaction identifier, but the explorer says pending. Has the recipient definitely received the funds?</summary>

**No.** Wait for inclusion and check the result on the correct network.
</details >

For a careful first attempt, follow [Make your first transfer easier to verify](../../strategies/first-transfer/en.md).

## Sources

- [Ethereum: transactions](https://ethereum.org/en/developers/docs/transactions/) — a concrete account-based implementation; other chains differ.
- [Ethereum: gas and fees](https://ethereum.org/en/developers/docs/gas/) — why execution has a cost, including failed execution.

- [Solana: transactions](https://solana.com/docs/core/transactions)
- [Solana: transaction status](https://solana.com/docs/rpc/http/getsignaturestatuses)

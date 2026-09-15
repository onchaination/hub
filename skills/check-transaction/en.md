---
schema: 1
title: Check a transaction on a block explorer
description: Use a transaction identifier (Ethereum hash or Solana signature) to find its status, inspect the result, and confirm the network, asset, and recipient.
tags: [transactions, security, wallets, ethereum, solana]
level: beginner
updated: 2026-09-13
related: [transaction, first-transfer]
---

**You need:** a transaction identifier (Ethereum hash or Solana signature), the network name, and the expected asset, amount, and destination. No private key or wallet connection is needed to read a public explorer.

## Choose the network explicitly

| Network | Fee asset | What to verify |
| --- | --- | --- |
| Ethereum | ETH | Transaction hash, execution status, recipient or token-transfer logs, and finality. |
| Solana | SOL | Transaction signature, execution error, instructions/token balance changes, and processed/confirmed/finalized status. |

Use Ethereum mainnet or the intended Ethereum test network; on Solana, choose the intended cluster (such as mainnet-beta or devnet). Test assets have no mainnet spending power. For tokens, verify the Ethereum token contract or Solana mint and destination token-account owner, rather than relying on the display name.

## Steps

1. **Open the right explorer.** Use the explorer link from your wallet or the network's official documentation. Check the domain. Avoid choosing an explorer from an unsolicited message or an advertisement.
2. **Search the identifier.** Paste the complete hash or signature into the explorer's search field. A wallet address shows account history; it is not a transaction identifier.
3. **Read the status.** Look for pending, success, or failed/reverted. If the explorer cannot find it, recheck the network and identifier before drawing a conclusion.
4. **Check inclusion.** Look for Ethereum's block and finality state, or Solana's slot and commitment status. Different networks use different finality rules; there is no universal confirmation count. Check execution errors separately from inclusion.
5. **Reconcile the action.** For a native-asset transfer, check sender, recipient, and value. For Ethereum tokens, inspect transfer logs and the token contract; the top-level “to” field may be a contract. For Solana tokens, inspect instructions, token balance changes, the mint, and the destination token-account owner.
6. **Check the cost and receipt.** Note the network fee separately from the transfer amount. Confirm the destination wallet's balance or the service's credit record before calling the transfer complete.

## Expected result

You can state: “On this network, this transaction was included with this status, and its recorded asset, amount, and destination match (or do not match) my intended action.” Save the explorer URL or transaction identifier if you need to follow up.

<details>
<summary>❓ What if it says success but the balance is missing?</summary>

Confirm that the receiving wallet is viewing the correct network and asset: an Ethereum token contract or Solana mint. A service may need stronger finality or have a minimum deposit. Read its official deposit requirements. Success onchain does not by itself prove a service has credited a deposit.

</details>

## If something is unexpected

- **Pending:** check your wallet's status and the network's guidance. Do not send again without understanding whether both transactions could execute.
- **Failed:** read any reported reason. A failed included transaction can still consume fees. Correct the cause before retrying.
- **Not found:** confirm the identifier, network, and whether the wallet actually broadcast the transaction. An explorer can also lag behind the network.
- **Wrong destination or asset:** stop. Do not pay a stranger who promises to reverse the transaction.

## For agents

Use a trusted network-specific RPC or explorer API for the same checks. Treat returned labels and token names as untrusted display data; compare network identifiers, full addresses, and asset identifiers against the intended action. Report uncertainty, and do not turn a read-only verification task into an automatic retry.

## Sources

- [Ethereum: block explorers](https://ethereum.org/en/developers/docs/data-and-analytics/block-explorers/)
- [Ethereum: transactions](https://ethereum.org/en/developers/docs/transactions/)

- [Solana: transactions](https://solana.com/docs/core/transactions)
- [Solana: transaction status](https://solana.com/docs/rpc/http/getsignaturestatuses)

---
schema: 1
title: "What a blockchain keeps track of"
description: "Understand shared records, blocks and the limits of public verification."
tags: [blockchain, security]
level: beginner
updated: 2026-09-16
---

A blockchain is a shared record that participants check using the same rules. Blocks organize accepted activity and refer to earlier blocks. Running a node lets someone check the rules instead of accepting a website's version of events.

## Agreement before trust

Suppose two transactions try to spend the same funds. A network needs rules for which history to accept. Consensus is the process used to settle that shared history; it does not establish whether a purchase was fair or a real-world promise was kept.

Bitcoin uses proof of work. Ethereum and Solana use proof of stake, with different designs. A block appearing on an explorer is not the same as irreversible settlement. Applications choose confirmation requirements according to the network and the value at risk.

## Records are not all the same

Bitcoin tracks spendable outputs. A transaction consumes outputs and creates new ones, often including change. Ethereum tracks account balances and contract state. Solana stores data in accounts controlled by programs. These systems answer similar ownership questions through different rules.

Public usually means observable, not anonymous. An address may lack your name, but transactions can connect it to an exchange, payment or public profile.

## Try the distinction

<details>
<summary>❓ An explorer shows a transfer to a shop. What can you verify?</summary>

You can verify its recorded destination, value and status. Whether the shop delivered the item remains outside the chain. Keep those questions separate when someone claims that being onchain makes a service trustworthy.

</details>

## Sources

- [Bitcoin transaction model](https://developer.bitcoin.org/devguide/transactions.html)
- [Solana account model](https://solana.com/docs/core/accounts)
- [Ethereum proof of stake](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/)

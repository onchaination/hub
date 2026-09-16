---
schema: 1
title: "Supply assets and inspect collateral settings"
description: "Distinguish a deposit from enabling it to support debt."
tags: [lending, risk]
level: intermediate
updated: 2026-09-16
related: [learn/collateral, tools/lending-markets]
---

Start with: [collateral](../../learn/collateral/en.md), [lending markets](../../tools/lending-markets/en.md).

## Before you start

Know the market, network, asset, supply cap and withdrawal rules. Determine whether deposits automatically count as collateral or need a separate setting. Keep fees outside the deposit.

## Steps

1. Open the verified deployment and inspect the current supply parameters. Confirm the exact asset and receipt or position accounting.
2. Enter a manageable deposit amount. Review approval scope if needed, followed by the supply transaction itself.
3. Check the wallet preview for network, destination and amount. Submit only the intended deposit.
4. After confirmation, inspect the supplied balance and collateral status. If enabling collateral is separate, understand its effects and review that request independently.
5. Before borrowing, record current borrowing LTV, liquidation threshold and any restrictions. Test your understanding of withdrawal and repayment paths.

## Verify the result

The market shows the expected supplied position and its correct collateral status. Your wallet or explorer records the outgoing asset and receipt or accounting change. Supplying alone does not mean you have borrowed.

## If something differs

Do not borrow to “activate” a deposit unless that was your independent, understood objective. If the asset cannot serve as collateral or the receipt differs from expectations, investigate. A supplied balance does not guarantee immediate withdrawal liquidity.

## Sources

- [Aave supplying tokens](https://aave.com/help/supplying/supply-tokens)

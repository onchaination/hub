---
schema: 1
title: "Repay debt and confirm what remains"
description: "Separate repayment from collateral withdrawal and account for accrued interest."
tags: [lending, risk]
level: intermediate
updated: 2026-09-16
related: [skills/borrow-assets]
---

Start with: [borrow assets](../../skills/borrow-assets/en.md).

## Before you start

Obtain the correct debt asset on the correct network and keep funds for fees. Check the market’s documented repayment options. Do not assume the initial borrowed amount still covers all debt.

## Steps

1. Inspect the current debt, interest and repayment balance. Confirm the asset identity and exact market.
2. Choose partial repayment or the documented full-repayment option. Review whether the interface handles interest accrued before inclusion.
3. Approve only the intended repayment spender and amount where required. Verify any permit as carefully as a transaction.
4. Submit the repayment and wait for successful execution. Refresh the position from the market and explorer.
5. For full repayment, verify no residual debt remains. Only then assess a separate collateral withdrawal, including liquidity and any other outstanding debt.

## Verify the result

The debt has fallen by the expected amount, or is zero for a full repayment. Collateral has not necessarily returned to your wallet: repayment and withdrawal are separate operations.

## If something differs

A small residual balance can result from interest or an incomplete repayment option. Follow official instructions to close it. If fees, allowance or liquidity prevent the transaction, resolve the cause without signing unrelated requests. Recheck the health measure while debt remains.

## Sources

- [Aave repayment](https://aave.com/help/borrowing/repay-tokens)

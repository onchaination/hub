---
schema: 1
title: "Open and verify a collateralized loan"
description: "Review projected debt health before borrowing and inspect the resulting position."
tags: [lending, risk]
level: intermediate
updated: 2026-09-16
related: [skills/supply-collateral, learn/liquidation]
---

Start with: [supply collateral](../../skills/supply-collateral/en.md), [liquidation](../../learn/liquidation/en.md).

## Before you start

Have an explicit repayment source, a chosen debt limit and a response to adverse prices. Check current market parameters rather than borrowing the interface maximum. Know which asset must be repaid.

## Steps

1. Inspect eligible collateral, current debt and oracle-valued balances. Confirm the market and network.
2. Select the debt asset and enter the planned amount. Read the current rate model and projected health measure, including existing debts.
3. Stress-test a collateral decline and a debt-value increase. Include interest and costs. If the plan depends on immediate rescue near liquidation, reduce the proposed debt.
4. Review the borrow transaction, recipient and any account-mode changes. Sign only when the projected position matches your plan.
5. After confirmation, verify receipt of the debt asset and the market’s new debt balance. Record monitoring and repayment triggers.

## Verify the result

The received amount, debt denomination, collateral status and health measure reconcile. Debt can begin accruing interest immediately under the market’s rules; the displayed amount need not remain exactly equal to the amount received.

## If something differs

If the transaction fails, first establish whether any position change occurred before retrying. If health differs materially from the preview, investigate price, interest and parameter changes. Never borrow more simply to repair an unexplained display discrepancy.

## Sources

- [Aave borrowing mechanics](https://aave.com/help/borrowing/borrow-tokens)

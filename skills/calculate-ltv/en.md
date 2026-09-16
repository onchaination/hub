---
schema: 1
title: "Calculate loan-to-value"
description: "Use consistent prices and units to compare debt with collateral."
tags: [lending, risk]
level: intermediate
updated: 2026-09-16
related: [learn/collateral]
---

Start with: [collateral](../../learn/collateral/en.md).

## Before you start

List collateral and debt quantities for one position. Use a common value unit and the market’s relevant price inputs. An LTV calculation is not by itself a liquidation calculation.

## Steps

1. Multiply each eligible collateral quantity by its price in the chosen unit. Sum the values. Do not count an asset merely because it appears in your wallet.
2. Multiply each debt quantity, including accrued interest, by its price in the same unit. Sum these values.
3. Divide total debt value by total collateral value and multiply by 100 to express a percentage. A zero collateral denominator cannot produce a meaningful ordinary LTV.
4. Repeat with adverse collateral and debt prices. Record the assumptions and timestamp instead of presenting the result as permanent.
5. Compare with the market’s borrowing rules, then use its liquidation thresholds to assess health separately.

## Verify the result

Example: 2 units of collateral at $4,000 each gives $8,000. A $2,400 debt produces `2,400 ÷ 8,000 × 100 = 30%`. At $3,000 per collateral unit, the same debt gives 40%. If debt also grows, the ratio rises further.

## If something differs

If the interface disagrees, check collateral eligibility, oracle prices, decimals, interest and whether multiple debts are included. Never substitute an exchange quote without recognizing the difference from the protocol’s oracle. A low LTV does not remove contract risk.

## Sources

- [Aave health factor and liquidations](https://aave.com/help/borrowing/liquidations)
- [Aave borrowing mechanics](https://aave.com/help/borrowing/borrow-tokens)

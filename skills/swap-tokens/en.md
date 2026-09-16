---
schema: 1
title: "Swap tokens with a defined minimum output"
description: "Review the route, permissions and final asset movements for a swap."
tags: [liquidity, defi]
level: intermediate
updated: 2026-09-16
related: [learn/liquidity, learn/approvals, tools/dexes]
---

Start with: [liquidity](../../learn/liquidity/en.md), [approvals](../../learn/approvals/en.md), [dexes](../../tools/dexes/en.md).

## Before you start

Identify the exact input and output assets on the same intended network. Use official interface links, keep fees available and understand price impact and slippage. Start with a manageable amount.

## Steps

1. Enter the amount and inspect the route. Verify token contracts or mints, not just names. Review quoted output and every visible fee.
2. Check price impact, minimum received, recipient and deadline where supported. Set a tolerance you understand. Do not raise it automatically after a failed quote.
3. If spending permission is required, inspect token, spender and amount. Prefer only the permission needed for the intended action when supported. A permit signature may grant authority without an immediate transaction.
4. Read the final wallet request, including any combined approval and swap. Sign only if the full effects match the reviewed route.
5. Wait for the result and inspect input/output movements on the explorer. Review remaining allowance after the action.

## Verify the result

Your wallet received the intended output asset and the actual quantity meets the accepted minimum under the route’s rules. Record total costs, including an earlier approval or failed transaction.

## If something differs

If output or asset identity differs, stop further trades and investigate. A failed included transaction may still cost fees. Unsolicited tokens or tokens with transfer restrictions may not behave like standard assets; do not keep increasing slippage to force execution.

## Sources

- [Uniswap concentrated liquidity](https://developers.uniswap.org/docs/get-started/concepts/liquidity-providers/concentrated-liquidity)
- [ERC-20 allowance standard](https://eips.ethereum.org/EIPS/eip-20)
- [ERC-2612 signed permits](https://eips.ethereum.org/EIPS/eip-2612)

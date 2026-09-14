export function networkFee(gas: number, gwei: number): number {
  if (
    !Number.isFinite(gas) ||
    !Number.isInteger(gas) ||
    gas < 1 ||
    gas > 100_000_000 ||
    !Number.isFinite(gwei) ||
    gwei < 0 ||
    gwei > 1_000_000
  ) {
    throw new Error(
      'Enter gas units from 1 to 100,000,000 and a gas price from 0 to 1,000,000 gwei.',
    );
  }
  return (gas * gwei) / 1_000_000_000;
}

// Solana legacy/v0 fee model. Priority fees round UP to whole lamports.
export function solanaFee(
  signatures: number,
  baseLamports: number,
  computeLimit: number,
  microLamports: number,
): number {
  for (const [value, min, max] of [
    [signatures, 1, 12],
    [baseLamports, 0, 1_000_000_000],
    [computeLimit, 1, 1_400_000],
    [microLamports, 0, 1_000_000_000],
  ]) {
    if (!Number.isSafeInteger(value) || value < min || value > max)
      throw new Error('Enter whole numbers within the displayed limits.');
  }
  return (
    (signatures * baseLamports +
      Math.ceil((computeLimit * microLamports) / 1_000_000)) /
    1_000_000_000
  );
}

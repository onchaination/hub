import assert from 'node:assert/strict';
import test from 'node:test';
import { networkFee, solanaFee } from '../src/widgets/fee';

test('converts gas and gwei to ETH, including zero and fractional prices', () => {
  assert.equal(networkFee(21000, 10), 0.00021);
  assert.equal(networkFee(21000, 0), 0);
  assert.equal(networkFee(100000, 0.5), 0.00005);
});

test('rejects invalid and out-of-range inputs instead of displaying NaN', () => {
  for (const [gas, gwei] of [
    [0, 1],
    [-1, 1],
    [1.5, 1],
    [Infinity, 1],
    [NaN, 1],
    [21000, -1],
    [21000, Infinity],
    [21000, NaN],
    [100000001, 1],
    [21000, 1000001],
  ]) {
    assert.throws(() => networkFee(gas, gwei));
  }
});

test('Solana uses base fee plus priority fee rounded up to lamports', () => {
  assert.equal(solanaFee(1, 5000, 200000, 1000), 0.0000052);
  assert.equal(solanaFee(2, 5000, 1, 1), 0.000010001);
  assert.equal(solanaFee(1, 5000, 200000, 0), 0.000005);
  assert.throws(() => solanaFee(1, 5000, 1400001, 1));
  assert.throws(() => solanaFee(1, 5000, 200000, -1));
  assert.throws(() => solanaFee(1.5, 5000, 200000, 1));
});

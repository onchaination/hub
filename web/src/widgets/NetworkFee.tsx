import { useId, useState } from 'react';
import { networkFee, solanaFee } from './fee';

export default function NetworkFee({
  gas = 21000,
  gwei = 10,
  chain: initialChain = 'ethereum',
}: {
  gas?: number;
  gwei?: number;
  chain?: 'ethereum' | 'solana';
}) {
  const id = useId();
  const [units, setUnits] = useState(String(gas));
  const [price, setPrice] = useState(String(gwei));
  const [chain, setChain] = useState(initialChain);
  const [solana, setSolana] = useState({
    signatures: '1',
    base: '5000',
    limit: '200000',
    price: '1000',
  });
  let result: number | undefined;
  let error = '';
  try {
    if (chain === 'ethereum' && (!units.trim() || !price.trim()))
      throw new Error('Enter both values to calculate a fee.');
    if (
      chain === 'solana' &&
      Object.values(solana).some((value) => !value.trim())
    )
      throw new Error('Enter all values to calculate a fee.');
    result =
      chain === 'ethereum'
        ? networkFee(Number(units), Number(price))
        : solanaFee(
            Number(solana.signatures),
            Number(solana.base),
            Number(solana.limit),
            Number(solana.price),
          );
  } catch (e) {
    error = (e as Error).message;
  }
  return (
    <section
      className="widget"
      aria-labelledby={`${id}-title`}
      data-pagefind-ignore
      lang="en"
    >
      <div className="section-heading">
        <h2 id={`${id}-title`}>Try the numbers</h2>
        <span className="eyebrow">Local calculation</span>
      </div>
      <label htmlFor={`${id}-chain`}>
        Network fee model{' '}
        <select
          id={`${id}-chain`}
          value={chain}
          onChange={(event) => setChain(event.target.value as typeof chain)}
        >
          <option value="ethereum">Ethereum · ETH</option>
          <option value="solana">Solana · SOL (legacy/v0)</option>
        </select>
      </label>
      {chain === 'ethereum' ? (
        <div className="widget-fields">
          <label htmlFor={`${id}-gas`}>
            Gas units
            <input
              id={`${id}-gas`}
              type="number"
              min="1"
              max="100000000"
              step="1"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              aria-invalid={!!error}
              aria-describedby={`${id}-result`}
            />
          </label>
          <label htmlFor={`${id}-price`}>
            Gas price (gwei)
            <input
              id={`${id}-price`}
              type="number"
              min="0"
              max="1000000"
              step="any"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              aria-invalid={!!error}
              aria-describedby={`${id}-result`}
            />
          </label>
        </div>
      ) : (
        <div className="widget-fields">
          {(
            [
              ['signatures', 'Signatures (1–12)', 1, 12],
              [
                'base',
                'Base fee per signature (lamports, 0–1,000,000,000)',
                0,
                1_000_000_000,
              ],
              ['limit', 'Compute unit limit (1–1,400,000)', 1, 1_400_000],
              [
                'price',
                'CU price (micro-lamports, 0–1,000,000,000)',
                0,
                1_000_000_000,
              ],
            ] as const
          ).map(([key, label, min, max]) => (
            <label key={key} htmlFor={`${id}-${key}`}>
              {label}
              <input
                id={`${id}-${key}`}
                type="number"
                min={min}
                max={max}
                step="1"
                value={solana[key]}
                onChange={(event) =>
                  setSolana({ ...solana, [key]: event.target.value })
                }
                aria-invalid={!!error}
                aria-describedby={`${id}-result`}
              />
            </label>
          ))}
        </div>
      )}
      <div
        id={`${id}-result`}
        aria-live="polite"
        aria-atomic="true"
        className="widget-result"
      >
        {error ? (
          <p>{error}</p>
        ) : (
          <>
            <span>
              Estimated {chain === 'ethereum' ? 'execution' : 'transaction'} fee
            </span>
            <output>
              {result!.toLocaleString('en-US', { maximumFractionDigits: 12 })}{' '}
              <small>{chain === 'ethereum' ? 'ETH' : 'SOL'}</small>
            </output>
          </>
        )}
      </div>
      <p className="muted small">
        {chain === 'ethereum'
          ? 'Gas units × gas price ÷ 1,000,000,000. Additional network fees may apply.'
          : 'Base fee + rounded-up priority fee, converted from lamports to SOL. Account funding and program-specific charges are excluded.'}{' '}
        Illustrative inputs, not a live quote.
      </p>
      <button
        type="button"
        className="text-button"
        onClick={() => {
          setUnits(String(gas));
          setPrice(String(gwei));
          setSolana({
            signatures: '1',
            base: '5000',
            limit: '200000',
            price: '1000',
          });
        }}
      >
        Reset example ↺
      </button>
    </section>
  );
}

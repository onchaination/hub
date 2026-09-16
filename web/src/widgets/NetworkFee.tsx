import { ui } from '../lib/ui';
import type { Locale } from '../lib/locales';
import { useId, useState } from 'react';
import { networkFee, solanaFee } from './fee';

export default function NetworkFee({
  locale = 'en',
  gas = 21000,
  gwei = 10,
  chain: initialChain = 'ethereum',
}: {
  locale?: Locale;
  gas?: number;
  gwei?: number;
  chain?: 'ethereum' | 'solana';
}) {
  const t = ui[locale];
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
    error = t.feeError;
  }
  return (
    <section
      className="widget"
      aria-labelledby={`${id}-title`}
      data-pagefind-ignore
      lang={locale}
    >
      <div className="section-heading">
        <h2 id={`${id}-title`}>{t.tryNumbers}</h2>
        <span className="eyebrow">{t.localCalculation}</span>
      </div>
      <label htmlFor={`${id}-chain`}>
        {t.feeModel}{' '}
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
            {t.gasUnits}
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
            {t.gasPrice}
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
              ['signatures', t.signatures, 1, 12],
              ['base', t.baseFee, 0, 1_000_000_000],
              ['limit', t.computeLimit, 1, 1_400_000],
              ['price', t.computePrice, 0, 1_000_000_000],
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
            <span>{t.feeEstimate}</span>
            <output>
              {result!.toLocaleString(locale, { maximumFractionDigits: 12 })}{' '}
              <small>{chain === 'ethereum' ? 'ETH' : 'SOL'}</small>
            </output>
          </>
        )}
      </div>
      <p className="muted small">
        {chain === 'ethereum' ? t.ethFormula : t.solFormula} {t.illustration}
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
        {t.reset} ↺
      </button>
    </section>
  );
}

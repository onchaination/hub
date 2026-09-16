export const locales = ['en', 'uk', 'es', 'pt', 'de'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';
export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
export function localeFromPath(path: string): Locale {
  const first = path.split(/[?#]/)[0].split('/').filter(Boolean)[0];
  return isLocale(first) ? first : defaultLocale;
}
export function getContentKey(path: string): string {
  const segments = path.split(/[?#]/)[0].split('/').filter(Boolean);
  if (isLocale(segments[0])) segments.shift();
  return segments.join('/');
}
export function localePath(
  path: string,
  locale: string = defaultLocale,
): string {
  if (!isLocale(locale)) throw new Error(`Unsupported locale: ${locale}`);
  const key = getContentKey(path);
  return (
    '/' +
    (locale === defaultLocale ? '' : locale + '/') +
    (key ? key + '/' : '')
  );
}

export const defaultLanguage = 'en';

import { isLocale } from './locales';
export const isLanguage = isLocale;

export function languageName(language: string): string {
  const name =
    new Intl.DisplayNames([language], { type: 'language' }).of(language) ??
    language;
  return name.replace(/^\p{Letter}/u, (letter) =>
    letter.toLocaleUpperCase(language),
  );
}

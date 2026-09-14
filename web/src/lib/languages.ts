export const defaultLanguage = 'en';

// Filenames use lowercase language tags: en.md, uk.md, de.md, pt-br.md.
// Display labels come from the platform; there is no language registry to maintain.
export function isLanguage(value: string): boolean {
  if (!/^[a-z]{2,3}(?:-[a-z0-9]{2,8})*$/.test(value)) return false;
  try {
    return new Intl.Locale(value).language.length >= 2;
  } catch {
    return false;
  }
}

export function languageName(language: string): string {
  const name =
    new Intl.DisplayNames([language], { type: 'language' }).of(language) ??
    language;
  return name.replace(/^\p{Letter}/u, (letter) =>
    letter.toLocaleUpperCase(language),
  );
}

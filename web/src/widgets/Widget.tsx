import type { Locale } from '../lib/locales';
import { widgets } from './registry';
import type { parseWidget } from './schema';

// Astro needs a statically imported island entry; registry selection happens here.
export default function Widget({
  name,
  props,
  locale,
}: ReturnType<typeof parseWidget> & { locale: Locale }) {
  const Component = widgets[name];
  return <Component {...props} locale={locale} />;
}

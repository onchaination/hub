import { widgets } from './registry';
import type { parseWidget } from './schema';

// Astro needs a statically imported island entry; registry selection happens here.
export default function Widget({
  name,
  props,
}: ReturnType<typeof parseWidget>) {
  const Component = widgets[name];
  return <Component {...props} />;
}

import { validateContent } from '../src/lib/content';
const items = await validateContent();
console.log(
  `Validated ${items.length} knowledge pages, section indexes, links, tags, and widgets.`,
);

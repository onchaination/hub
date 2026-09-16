import { loadItems, levels, tagAliases } from './content';
import { sectionKeys } from './site';
export function sitePaths(): string[] {
  const items = loadItems();
  const tags = new Set(items.flatMap((item) => item.tags));
  for (const [alias, key] of Object.entries(tagAliases()))
    if (tags.has(key)) tags.add(alias);
  return [
    '',
    'search',
    'about',
    ...sectionKeys,
    ...items.map((item) => item.contentKey),
    ...[...tags].map((tag) => `tags/${tag}`),
    ...levels.map((level) => `levels/${level}`),
  ];
}

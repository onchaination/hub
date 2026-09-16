import type { APIRoute } from 'astro';
import { loadItems, representations } from '../lib/content';
import { SITE } from '../lib/site';
import { locales, localePath } from '../lib/locales';
import { sitePaths } from '../lib/routes';
import { tagAliases } from '../lib/content';
export const GET: APIRoute = () => {
  const items = loadItems();
  const keys = new Set(items.map((item) => item.contentKey));
  const aliases = tagAliases();
  const indexes = sitePaths().filter(
    (path) =>
      path !== 'search' &&
      !keys.has(path) &&
      !(
        path.startsWith('tags/') &&
        aliases[path.slice(5)] &&
        aliases[path.slice(5)] !== path.slice(5)
      ),
  );
  const routes = [
    ...locales.flatMap((locale) =>
      indexes.map((path) => localePath(path, locale)),
    ),
    ...representations(items).map((item) => item.route),
  ];
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map((route) => `<url><loc>${SITE}${route}</loc></url>`).join('')}</urlset>`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
};

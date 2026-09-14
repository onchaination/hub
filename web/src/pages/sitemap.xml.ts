import type { APIRoute } from 'astro';
import { loadItems, representations } from '../lib/content';
import { SITE, sectionKeys } from '../lib/site';
export const GET: APIRoute = () => {
  const items = loadItems();
  const routes = [
    '/',
    '/about',
    ...sectionKeys.map((s) => '/' + s),
    ...representations(items).map((item) => item.route),
    ...[...new Set(items.flatMap((item) => item.tags))].map(
      (tag) => '/tags/' + tag,
    ),
  ];
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map((route) => `<url><loc>${SITE}${route}</loc></url>`).join('')}</urlset>`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
};

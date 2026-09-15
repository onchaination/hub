import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
import sharp from 'sharp';
import {
  availableLanguages,
  contentRoute,
  loadItems,
  representations,
  translationFor,
} from '../src/lib/content';
import { OG_HEIGHT, OG_WIDTH, ogImageRoute } from '../src/lib/og';
import { SITE } from '../src/lib/site';

const dist = resolve('dist');
const items = loadItems();
for (const item of representations(items)) {
  const html = readFileSync(join(dist, item.route, 'index.html'), 'utf8');
  const canonicalUrl = `${SITE}${contentRoute(item)}/`;
  assert(
    html.includes(`href="${canonicalUrl}"`),
    `Missing canonical: ${item.route}`,
  );
  assert(
    html.includes(`property="og:url" content="${canonicalUrl}"`),
    `Missing Open Graph URL: ${item.route}`,
  );
  assert(
    html.includes(`href="${SITE}/${item.file}"`),
    `Missing Markdown alternate: ${item.route}`,
  );
  const ogRoute = ogImageRoute(item);
  const ogUrl = SITE + ogRoute;
  assert(
    html.includes(`property="og:image" content="${ogUrl}"`),
    `Missing Open Graph image: ${item.route}`,
  );
  assert(
    html.includes(`name="twitter:image" content="${ogUrl}"`),
    `Missing Twitter image: ${item.route}`,
  );
  assert(
    html.includes('name="twitter:card" content="summary_large_image"'),
    `Missing large Twitter card: ${item.route}`,
  );
  const ogFile = join(dist, ogRoute);
  assert(existsSync(ogFile), `Missing generated social image: ${ogRoute}`);
  const image = await sharp(ogFile).metadata();
  assert.equal(image.format, 'png', `Wrong social image format: ${ogRoute}`);
  assert.equal(image.width, OG_WIDTH, `Wrong social image width: ${ogRoute}`);
  assert.equal(
    image.height,
    OG_HEIGHT,
    `Wrong social image height: ${ogRoute}`,
  );
  assert.equal(
    readFileSync(join(dist, item.file), 'utf8'),
    item.raw,
    `Markdown source changed: ${item.file}`,
  );
  assert(
    html.includes('data-pagefind-body'),
    `Missing indexed content: ${item.file}`,
  );
  assert(!html.includes('<!-- widget:'), `Unrendered widget: ${item.file}`);
}
const sitemap = readFileSync(join(dist, 'sitemap.xml'), 'utf8');
const llms = readFileSync(join(dist, 'llms.txt'), 'utf8');
for (const item of representations(items))
  assert(llms.includes(SITE + '/' + item.file));
for (const item of items) {
  for (const language of availableLanguages(items)) {
    if (translationFor(item, language)) continue;
    const route = contentRoute(item, language);
    const source = `${item.directory}/${language}.md`;
    const socialImage = ogImageRoute({ ...item, language });
    assert(
      !existsSync(join(dist, route, 'index.html')),
      `Generated missing translation: ${route}`,
    );
    assert(
      !existsSync(join(dist, source)),
      `Generated missing translation source: ${source}`,
    );
    assert(
      !existsSync(join(dist, socialImage)),
      `Generated missing translation social image: ${socialImage}`,
    );
    assert(
      !sitemap.includes(`<loc>${SITE}${route}</loc>`),
      `Sitemap includes missing translation: ${route}`,
    );
    assert(
      !llms.includes(`${SITE}/${source}`),
      `llms.txt includes missing translation: ${source}`,
    );
  }
}
assert(
  existsSync(join(dist, 'pagefind/pagefind.js')),
  'Missing Pagefind index',
);

function walk(folder: string): string[] {
  return readdirSync(folder, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? walk(join(folder, entry.name))
      : [join(folder, entry.name)],
  );
}
const pages = walk(dist).filter((file) => file.endsWith('.html'));
for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  const canonical = /<link rel="canonical" href="([^"]+)"/.exec(html)?.[1];
  assert(
    !canonical || canonical.endsWith('/'),
    `${file}: Canonical URL needs a trailing slash: ${canonical}`,
  );
  for (const alternate of html.matchAll(
    /<link rel="alternate" hreflang="[^"]+" href="([^"]+)"/g,
  ))
    assert(
      alternate[1].endsWith('/'),
      `${file}: Alternate URL needs a trailing slash: ${alternate[1]}`,
    );
  assert(
    !html.includes('__VITE_PRELOAD__'),
    `${file}: Unresolved dynamic import preload marker`,
  );
  for (const match of html.matchAll(
    /(?:href|src)="(\/[^"?#]*)(?:\?[^"#]*)?(?:#([^"]+))?"/g,
  )) {
    const [link, path, hash] = match;
    const target = join(dist, decodeURIComponent(path));
    const resolved = existsSync(target + '/index.html')
      ? target + '/index.html'
      : target;
    assert(existsSync(resolved), `${file}: Broken generated link ${link}`);
    if (hash && resolved.endsWith('.html'))
      assert(
        readFileSync(resolved, 'utf8').includes(
          `id="${decodeURIComponent(hash)}"`,
        ),
        `${file}: Broken heading ${link}`,
      );
  }
}
console.log(
  `Verified ${pages.length} HTML pages, local links, raw Markdown, llms.txt, and Pagefind output.`,
);

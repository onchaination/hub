import type { APIRoute, GetStaticPaths } from 'astro';
import { loadItems, representations } from '../../../lib/content';
import {
  ogImageRoute,
  renderOgImage,
  type OgImageContent,
} from '../../../lib/og';

export const prerender = true;

export const getStaticPaths = (() =>
  representations(loadItems()).map((item) => ({
    params: {
      section: item.section,
      slug: `${item.id}${item.language === 'en' ? '' : `/${item.language}`}`,
    },
    props: {
      item: {
        id: item.id,
        section: item.section,
        language: item.language,
        title: item.title,
        description: item.description,
        tags: item.tags,
        level: item.level,
      } satisfies OgImageContent,
    },
  }))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const item = props.item as OgImageContent;
  const image = await renderOgImage(item);
  return new Response(new Uint8Array(image), {
    headers: {
      'Content-Type': 'image/png',
      'Content-Length': String(image.byteLength),
      'Cache-Control': 'public, max-age=86400',
      'X-Content-Type-Options': 'nosniff',
      'Content-Disposition': `inline; filename="${ogImageRoute(item).split('/').at(-1)}"`,
    },
  });
};

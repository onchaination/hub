import type { APIRoute } from 'astro';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { filesWithin, loadItems, representations, root } from '../lib/content';
import { sectionKeys } from '../lib/site';
export function getStaticPaths() {
  const items = representations(loadItems()).map((item) => ({
    params: { resource: item.file },
    props: { file: item.file },
  }));
  const assets = sectionKeys
    .flatMap((section) => filesWithin(section))
    .filter((file) => !file.endsWith('.md') || file.endsWith('/README.md'));
  return [
    ...items,
    ...assets.map((file) => ({ params: { resource: file }, props: { file } })),
  ];
}
export const GET: APIRoute = ({ props }) => {
  const types: Record<string, string> = {
    md: 'text/markdown; charset=utf-8',
    svg: 'image/svg+xml',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    webp: 'image/webp',
    avif: 'image/avif',
    gif: 'image/gif',
  };
  return new Response(new Uint8Array(readFileSync(resolve(root, props.file))), {
    headers: {
      'Content-Type':
        types[props.file.split('.').pop()] ?? 'application/octet-stream',
    },
  });
};

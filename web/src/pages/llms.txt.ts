import type { APIRoute } from 'astro';
import { loadItems } from '../lib/content';
import { SITE, sectionKeys, sections } from '../lib/site';
export const GET: APIRoute = () => {
  const items = loadItems();
  const content =
    '# Onchaination\n\n> An open group learning, building and sharing value onchain.\n\nOpen, chain-neutral knowledge for humans and agents. Prefer these canonical Markdown sources; widgets are optional enhancements.\n\n' +
    sectionKeys
      .map(
        (section) =>
          `## ${sections[section].label}\n\n- [Section index](${SITE}/${section}/README.md)\n` +
          items
            .filter((item) => item.section === section)
            .map(
              (item) =>
                `- ${item.id}: [${item.title}](${SITE}/${item.file}): ${item.description}\n` +
                Object.values(item.translations)
                  .filter((translation) => translation.language !== 'en')
                  .map(
                    (translation) =>
                      `  - ${translation.language}: [${translation.title}](${SITE}/${translation.file})`,
                  )
                  .join('\n'),
            )
            .join('\n'),
      )
      .join('\n\n') +
    '\n';
  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { extname, posix, resolve } from 'node:path';
import { parse } from 'yaml';
import { z } from 'zod';
import MarkdownIt from 'markdown-it';
import anchor from 'markdown-it-anchor';
import { slug as githubSlug } from 'github-slugger';
import { createHighlighter } from 'shiki';
import { parseWidget } from '../widgets/schema';
import { REPO, sectionKeys, type Section } from './site';
import { defaultLanguage, isLanguage } from './languages';

// npm workspace scripts always run in web/, including compiled Astro builds.
export const root = resolve('..');
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const date = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .refine(
    (s) =>
      !Number.isNaN(Date.parse(s)) &&
      new Date(s).toISOString().slice(0, 10) === s,
    'Use a real YYYY-MM-DD date',
  );
export const levels = ['beginner', 'intermediate', 'advanced'] as const;
export type Level = (typeof levels)[number];
export const metadataSchema = z
  .object({
    schema: z.literal(1),
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    tags: z.array(slug).min(1),
    level: z.enum(levels).optional(),
    authors: z.array(z.string().regex(/^oc1[a-z2-7]{52}$/)).optional(),
    updated: date.optional(),
    related: z.array(slug).optional(),
  })
  .strict();
export type Representation = z.infer<typeof metadataSchema> & {
  id: string;
  file: string;
  language: string;
  body: string;
  raw: string;
};
export type Item = Representation & {
  section: Section;
  directory: string;
  route: string;
  translations: Record<string, Representation>;
};
// Translations inherit classification from English, avoiding divergent topic graphs.
const translationSchema = metadataSchema.pick({
  schema: true,
  title: true,
  description: true,
  updated: true,
  authors: true,
});
export type Part = { html: string } | ReturnType<typeof parseWidget>;
export function splitFrontmatter(raw: string) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(raw);
  if (!match) throw new Error('Missing YAML front matter');
  return { data: parse(match[1]), body: raw.slice(match[0].length) };
}

export function tagAliases(
  source = readFileSync(resolve(root, '.onchaination/tags.yml'), 'utf8'),
) {
  const data = z
    .record(slug, z.object({ aliases: z.array(slug).default([]) }).strict())
    .parse(parse(source));
  const aliases: Record<string, string> = Object.create(null);
  for (const canonical of Object.keys(data)) aliases[canonical] = canonical;
  for (const [canonical, entry] of Object.entries(data)) {
    for (const alias of entry.aliases) {
      if (alias in aliases) throw new Error(`Tag alias collision: ${alias}`);
      aliases[alias] = canonical;
    }
  }
  return aliases;
}

export function filesWithin(folder: string, repository = root): string[] {
  return readdirSync(resolve(repository, folder), { withFileTypes: true })
    .flatMap((entry) => {
      if (entry.name.startsWith('.')) return [];
      const file = `${folder}/${entry.name}`;
      if (entry.isSymbolicLink())
        throw new Error(`Content symlinks are not supported: ${file}`);
      return entry.isDirectory() ? filesWithin(file, repository) : [file];
    })
    .sort();
}

export function loadItems(repository = root): Item[] {
  const aliases = tagAliases(
    readFileSync(resolve(repository, '.onchaination/tags.yml'), 'utf8'),
  );
  const items: Item[] = [];
  for (const section of sectionKeys) {
    const groups = new Map<string, string[]>();
    for (const file of filesWithin(section, repository)) {
      if (file === `${section}/README.md` || !file.endsWith('.md')) continue;
      const match = new RegExp(
        `^${section}/([a-z0-9]+(?:-[a-z0-9]+)*)/([^/]+)\\.md$`,
      ).exec(file);
      if (!match || !isLanguage(match[2]))
        throw new Error(`${file}: Use ${section}/<stable-id>/<language>.md`);
      const directory = `${section}/${match[1]}`;
      groups.set(directory, [...(groups.get(directory) ?? []), file]);
    }
    // An item folder without English must fail, even if it currently holds only assets.
    for (const entry of readdirSync(resolve(repository, section), {
      withFileTypes: true,
    })) {
      if (
        entry.isDirectory() &&
        !entry.name.startsWith('.') &&
        !groups.has(`${section}/${entry.name}`)
      ) {
        throw new Error(`${section}/${entry.name}: Missing en.md`);
      }
    }
    for (const [directory, files] of groups) {
      const englishFile = `${directory}/en.md`;
      if (!files.includes(englishFile))
        throw new Error(`${directory}: Missing en.md`);
      const raw = readFileSync(resolve(repository, englishFile), 'utf8');
      const english = splitFrontmatter(raw);
      const metadata = metadataSchema.parse(english.data);
      const id = directory.split('/')[1];
      const tags = metadata.tags.map((tag) => aliases[tag] ?? tag);
      if (new Set(tags).size !== tags.length)
        throw new Error(`${englishFile}: Repeated tags (including aliases)`);
      const translations: Record<string, Representation> = Object.create(null);
      for (const file of files) {
        try {
          const language = posix.basename(file, '.md');
          const raw = readFileSync(resolve(repository, file), 'utf8');
          const { data, body } = splitFrontmatter(raw);
          const localized =
            language === defaultLanguage
              ? metadata
              : translationSchema.parse(data);
          if (!body.trim()) throw new Error('Page body is empty');
          translations[language] = {
            ...metadata,
            ...localized,
            id,
            updated: localized.updated,
            authors: localized.authors,
            tags,
            language,
            file,
            body,
            raw,
          };
        } catch (error) {
          throw new Error(`${file}: ${(error as Error).message}`);
        }
      }
      items.push({
        ...translations.en,
        section,
        directory,
        route: '/' + directory,
        translations,
      });
    }
  }
  const ids = new Set<string>();
  for (const item of items) {
    if (ids.has(item.id))
      throw new Error(`${item.file}: Duplicate content ID ${item.id}`);
    ids.add(item.id);
  }
  for (const item of items)
    for (const id of item.related ?? []) {
      if (!ids.has(id) || id === item.id)
        throw new Error(`${item.file}: Invalid related ID ${id}`);
    }
  return items;
}

export function availableLanguages(items: Item[]): string[] {
  return [
    defaultLanguage,
    ...[...new Set(items.flatMap((item) => Object.keys(item.translations)))]
      .filter((language) => language !== defaultLanguage)
      .sort(),
  ];
}

export function contentRoute(
  item: Pick<Item, 'directory'>,
  language = defaultLanguage,
): string {
  return (
    '/' + item.directory + (language === defaultLanguage ? '' : '/' + language)
  );
}

export function translationFor(
  item: Item,
  language = defaultLanguage,
): Item | undefined {
  const representation = item.translations[language];
  if (!representation) return;
  return {
    ...item,
    ...representation,
    route: contentRoute(item, language),
  };
}

export function representations(items: Item[]): Item[] {
  return items.flatMap((item) =>
    Object.keys(item.translations).map((language) =>
      translationFor(item, language)!,
    ),
  );
}

export function relatedItems(item: Item, items: Item[]) {
  return items
    .filter((other) => other.id !== item.id)
    .map((other) => ({
      item: other,
      score:
        (item.related?.includes(other.id) ? 100 : 0) +
        other.tags.filter((tag) => item.tags.includes(tag)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort(
      (a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title),
    )
    .slice(0, 3)
    .map(({ item }) => item);
}

const markdown = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: false,
}).use(anchor, { slugify: githubSlug });
const highlighter = createHighlighter({
  themes: ['github-light', 'github-dark'],
  langs: ['text', 'javascript', 'typescript', 'json', 'bash', 'yaml', 'python'],
});

export function youtubeEmbed(value: string): string | undefined {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return;
  }
  if (url.protocol !== 'https:') return;
  let id: string | null = null;
  if (url.hostname === 'youtu.be') id = url.pathname.slice(1);
  if (
    ['youtube.com', 'www.youtube.com', 'm.youtube.com'].includes(url.hostname)
  ) {
    id =
      url.pathname === '/watch'
        ? url.searchParams.get('v')
        : (/^\/(?:shorts|embed)\/([^/]+)$/.exec(url.pathname)?.[1] ?? null);
  }
  if (!id || !/^[\w-]{11}$/.test(id)) return;
  const time =
    url.searchParams.get('t') ?? url.searchParams.get('start') ?? '0';
  const duration = /^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/.exec(time);
  const seconds = /^\d+$/.test(time)
    ? Number(time)
    : duration
      ? Number(duration[1] ?? 0) * 3600 +
        Number(duration[2] ?? 0) * 60 +
        Number(duration[3] ?? 0)
      : 0;
  return `https://www.youtube-nocookie.com/embed/${id}?start=${Math.min(seconds, 2147483647)}`;
}

function localLink(
  value: string,
  file: string,
  items: Item[],
  image: boolean,
): string {
  if (/^(?:https?:|mailto:|tel:)/i.test(value)) return value;
  if (value.startsWith('//') || /^[a-z][a-z0-9+.-]*:/i.test(value))
    throw new Error(`${file}: Unsupported URL ${value}`);
  const [path, fragment] = value.split('#', 2);
  const [pathname, query] = path.split('?', 2);
  const target = pathname
    ? posix.normalize(
        pathname.startsWith('/')
          ? pathname.slice(1)
          : posix.join(posix.dirname(file), decodeURIComponent(pathname)),
      )
    : file;
  if (target.startsWith('../') || target.startsWith('.'))
    throw new Error(`${file}: Link escapes content: ${value}`);
  const item = representations(items).find(
    (item) => item.file === target || item.route === '/' + target,
  );
  const section = sectionKeys.find(
    (section) =>
      target === section ||
      target === section + '/' ||
      target === section + '/README.md',
  );
  const absolute = resolve(root, target);
  if (!item && !section && !existsSync(absolute))
    throw new Error(`${file}: Missing link or image ${value}`);
  if (fragment && (item || target === file)) {
    const body = item?.body ?? readFileSync(absolute, 'utf8');
    const ids = markdown
      .parse(body, {})
      .filter((t) => t.type === 'heading_open')
      .map((t) => t.attrGet('id'));
    if (!ids.includes(decodeURIComponent(fragment)))
      throw new Error(`${file}: Missing heading in ${value}`);
  }
  if (
    image &&
    (!existsSync(absolute) ||
      !statSync(absolute).isFile() ||
      !/\.(png|jpe?g|gif|webp|avif|svg)$/i.test(target))
  )
    throw new Error(`${file}: Invalid image ${value}`);
  let route =
    item?.route ??
    (section
      ? '/' + section
      : sectionKeys.some((s) => target.startsWith(s + '/')) &&
          extname(target) !== '.md'
        ? '/' + target
        : `${REPO}/blob/main/${target}`);
  if (image) route = '/' + target;
  return route + (query ? '?' + query : '') + (fragment ? '#' + fragment : '');
}

// One Markdown parser serves validation and rendering. Widgets are recognized only
// as standalone HTML comment tokens, so examples in code fences stay examples.
export async function renderMarkdown(
  body: string,
  file: string,
  items: Item[],
): Promise<{ parts: Part[]; headings: { id: string; text: string }[] }> {
  const tokens = markdown.parse(body, {});
  const syntax = await highlighter;
  const headings: { id: string; text: string }[] = [];
  function visit(token: (typeof tokens)[number]) {
    if (token.type === 'html_inline' && /<!--\s*widget:/.test(token.content))
      throw new Error(`${file}: Put widget directives on their own line`);
    if (token.type === 'html_inline' || token.type === 'html_block') {
      if (!/^<!--\s*widget:/.test(token.content.trim())) {
        // Multiple allowed tags in one HTML block (e.g. details + summary).
        const remainder = token.content.replace(
          /<!--(?!\s*widget:)[\s\S]*?-->|<\/?(?:details|summary|kbd|sub|sup|br)\s*\/?>/g,
          '',
        );
        if (/<|>/.test(remainder))
          throw new Error(
            `${file}: Use Markdown and portable details/summary HTML, not arbitrary HTML`,
          );
      }
    }
    if (token.type === 'image') {
      if (!token.content.trim())
        throw new Error(`${file}: Images need meaningful alt text`);
      token.attrSet('src', localLink(token.attrGet('src')!, file, items, true));
      token.attrSet('loading', 'lazy');
    }
    if (token.type === 'link_open')
      token.attrSet(
        'href',
        localLink(token.attrGet('href')!, file, items, false),
      );
    token.children?.forEach(visit);
  }
  tokens.forEach(visit);
  const parts: Part[] = [];
  let html = '';
  let detailsDepth = 0;
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.type === 'heading_open' && token.tag === 'h2')
      headings.push({ id: token.attrGet('id')!, text: tokens[i + 1].content });
    if (token.type === 'html_block' && /<!--\s*widget:/.test(token.content)) {
      if (token.level !== 0 || detailsDepth > 0)
        throw new Error(
          `${file}: Put widgets on their own line outside lists, quotes, and details`,
        );
      parts.push({ html });
      html = '';
      try {
        parts.push(parseWidget(token.content));
      } catch (e) {
        throw new Error(`${file}: ${(e as Error).message}`);
      }
      continue;
    }
    if (token.type === 'html_block') {
      detailsDepth += (token.content.match(/<details\s*>/g) ?? []).length;
      detailsDepth -= (token.content.match(/<\/details\s*>/g) ?? []).length;
    }
    if (token.type === 'fence') {
      const language = token.info.trim().split(/\s+/)[0] || 'text';
      const lang = syntax.getLoadedLanguages().includes(language)
        ? language
        : 'text';
      html += `<div class="code-block">${syntax.codeToHtml(token.content, { lang, themes: { light: 'github-light', dark: 'github-dark' } })}<button class="copy-code" type="button" aria-label="Copy code">Copy</button></div>`;
      continue;
    }
    if (
      token.type === 'paragraph_open' &&
      tokens[i + 1]?.type === 'inline' &&
      tokens[i + 2]?.type === 'paragraph_close'
    ) {
      const embed = youtubeEmbed(tokens[i + 1].content.trim());
      if (embed) {
        html += `<iframe class="video" src="${embed}" title="YouTube video" loading="lazy" allow="fullscreen; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
        i += 2;
        continue;
      }
    }
    if (token.type === 'blockquote_open' && tokens[i + 2]?.type === 'inline') {
      const callout = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/.exec(
        tokens[i + 2].content,
      );
      if (callout) {
        token.attrSet('class', 'callout');
        const text = tokens[i + 2].children?.[0];
        if (text?.type === 'text')
          text.content = text.content.replace(
            callout[0].trim(),
            callout[1].toLowerCase() + ' —',
          );
      }
    }
    html += markdown.renderer.render([token], markdown.options, {});
  }
  parts.push({ html });
  return { parts, headings };
}

export async function sectionContent(section: Section, items: Item[]) {
  const file = `${section}/README.md`;
  const body = readFileSync(resolve(root, file), 'utf8').replace(
    /^# .+\r?\n/,
    '',
  );
  const contribution = /^## (Add .+)\r?\n([\s\S]*)$/m.exec(body);
  if (!contribution) throw new Error(`${file}: Missing contribution guidance`);

  const rendered = await renderMarkdown(body, file, items);
  return {
    ...rendered,
    contribution: {
      title: contribution[1],
      parts: (await renderMarkdown(contribution[2], file, items)).parts,
    },
  };
}

export async function validateContent() {
  const items = loadItems();
  for (const item of representations(items))
    await renderMarkdown(item.body, item.file, items);
  for (const section of sectionKeys) await sectionContent(section, items);
  return items;
}

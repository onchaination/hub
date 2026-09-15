import assert from 'node:assert/strict';
import test from 'node:test';
import {
  loadItems,
  metadataSchema,
  renderMarkdown,
  relatedItems,
  sectionContent,
  splitFrontmatter,
  tagAliases,
  validateContent,
  youtubeEmbed,
} from '../src/lib/content';
import { parseWidget } from '../src/widgets/schema';
import { aiContext } from '../src/integrations/ai/context';

test('repository examples validate and cover all four purposes', async () => {
  const items = await validateContent();
  assert.deepEqual([...new Set(items.map((item) => item.section))].sort(), [
    'learn',
    'skills',
    'strategies',
    'tools',
  ]);
});

test('section indexes separate contribution guidance from discovery content', async () => {
  const result = await sectionContent('learn', loadItems());
  assert.equal(result.contribution.title, 'Add an explanation');
  assert.match(JSON.stringify(result.contribution.parts), /mental model/);
  assert.doesNotMatch(JSON.stringify(result.contribution.parts), /Start here/);
});

test('schema rejects missing fields, bad dates, duplicated type, and unsupported versions', () => {
  const { data } = splitFrontmatter(loadItems()[0].raw);
  for (const change of [
    { schema: 2 },
    { id: 'Bad ID' },
    { title: '' },
    { tags: [] },
    { type: 'learn' },
    { updated: '2026-02-30' },
  ]) {
    assert.throws(() => metadataSchema.parse({ ...data, ...change }));
  }
  assert.throws(() => splitFrontmatter('# No metadata'));
});

test('aliases normalize topics and reject ambiguous ownership', () => {
  assert.equal(tagAliases().gas, 'fees');
  assert.throws(
    () => tagAliases('fees:\n  aliases: [gas]\ngas:\n  aliases: []'),
    /collision/,
  );
  assert.throws(() => tagAliases('fees:\n  aliases: [gas, gas]'), /collision/);
});

test('widgets are strict and their syntax stays inert inside code fences', async () => {
  assert.deepEqual(parseWidget('<!-- widget:network-fee -->').props, {
    chain: 'ethereum',
    gas: 21000,
    gwei: 10,
  });
  for (const text of [
    '<!-- widget:no-such-widget -->',
    '<!-- widget:network-fee gas=-1 -->',
    '<!-- widget:network-fee gas=2.5 -->',
    '<!-- widget:network-fee unknown=1 -->',
    '<!-- widget:network-fee gas=1 gas=2 -->',
    '<!-- widget:network-fee gwei=Infinity -->',
  ])
    assert.throws(() => parseWidget(text));
  const items = loadItems();
  const rendered = await renderMarkdown(
    '```md\n<!-- widget:unknown -->\n```\n\n<!-- widget:network-fee -->',
    'learn/transactions/en.md',
    items,
  );
  assert.equal(rendered.parts.filter((part) => 'name' in part).length, 1);
  assert.match(JSON.stringify(rendered.parts), /widget:unknown/);
  await assert.rejects(
    renderMarkdown(
      'Inline <!-- widget:network-fee --> text',
      'learn/transactions/en.md',
      items,
    ),
    /own line/,
  );
});

test('relative Markdown links and anchors rewrite; broken references fail', async () => {
  const items = loadItems();
  const result = await renderMarkdown(
    '[Fees](../../tools/network-fee/en.md#the-same-calculation-by-hand)',
    'learn/transactions/en.md',
    items,
  );
  assert.match(
    JSON.stringify(result.parts),
    /\/tools\/network-fee#the-same-calculation-by-hand/,
  );
  for (const body of [
    '[Missing](./missing.md)',
    '[Heading](../../tools/network-fee/en.md#no-such-heading)',
    '![Missing](./images/missing.png)',
    '![ ](https://example.com/image.png)',
    '[Outside](../../secret.txt)',
  ]) {
    await assert.rejects(
      renderMarkdown(body, 'learn/transactions/en.md', items),
    );
  }
});

test('portable content preserves questions and rejects executable HTML', async () => {
  const items = loadItems();
  const result = await renderMarkdown(
    '<details>\n<summary>Question?</summary>\n\nAn **answer**.\n\n</details>\n\n> [!TIP]\n> Read carefully.',
    'learn/transactions/en.md',
    items,
  );
  assert.match(JSON.stringify(result.parts), /<strong>answer<\/strong>/);
  assert.match(JSON.stringify(result.parts), /callout/);
  for (const body of [
    '<script>alert(1)</script>',
    '<!-- harmless --><script>alert(1)</script><!-- harmless -->',
    '<img src=x onerror=alert(1)>',
    '<details onclick="alert(1)">',
  ]) {
    await assert.rejects(
      renderMarkdown(body, 'learn/transactions/en.md', items),
    );
  }
});

test('YouTube supports timestamps and excludes lookalike hosts', () => {
  assert.equal(
    youtubeEmbed('https://youtu.be/dQw4w9WgXcQ?t=1m30s'),
    'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?start=90',
  );
  assert.equal(
    youtubeEmbed('https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=45'),
    'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?start=45',
  );
  assert.equal(
    youtubeEmbed('https://youtube.com.evil.test/watch?v=dQw4w9WgXcQ'),
    undefined,
  );
});

test('related content prefers explicit IDs and excludes itself', () => {
  const items = loadItems();
  const item = items.find((item) => item.id === 'transactions')!;
  const related = relatedItems(item, items);
  assert(!related.some((other) => other.id === item.id));
  assert(item.related!.includes(related[0].id));
});

test('AI context includes clean source URLs and purpose-specific instruction', () => {
  const context = aiContext({
    title: 'A skill',
    route: '/skills/example',
    file: 'skills/example/en.md',
    language: 'en',
    section: 'skills',
  });
  assert.match(context, /A skill/);
  assert.match(context, /https:\/\/onchaination.org\/skills\/example\/en.md/);
  assert.match(context, /step by step/);
  assert.match(
    aiContext({
      title: 'A strategy',
      route: '/strategies/example',
      file: 'strategies/example/en.md',
      language: 'en',
      section: 'strategies',
    }),
    /risks, trade-offs/,
  );
});

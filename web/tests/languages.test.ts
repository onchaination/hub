import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  availableLanguages,
  loadItems,
  representations,
  translationFor,
  resolveContent,
  contentRoute,
  renderMarkdown,
} from '../src/lib/content';
import { locales, localePath, getContentKey } from '../src/lib/locales';
import { ui, validateUI } from '../src/lib/ui';
import { languageName } from '../src/lib/languages';

test('stored translations and English fallbacks share one knowledge identity', () => {
  const items = loadItems();
  assert(items.length >= 50);
  assert(representations(items).length > items.length);
  assert.deepEqual(availableLanguages(items), [...locales]);
  const learn = items.find((item) => item.id === 'wallet')!;
  assert.equal(translationFor(learn, 'de')?.language, 'de');
  assert.equal(translationFor(learn, 'uk')?.id, learn.id);
  assert.deepEqual(translationFor(learn, 'de')?.tags, learn.tags);
  assert.equal(translationFor(learn, 'fr'), undefined);
  const tool = items.find((item) => item.id === 'network-fee-calculator')!;
  assert.equal(translationFor(tool, 'de'), undefined);
  assert.equal(translationFor(tool)?.language, 'en');
});

test('language display names use consistent title casing', () => {
  assert.equal(languageName('en'), 'English');
  assert.equal(languageName('de'), 'Deutsch');
  assert.equal(languageName('uk'), 'Українська');
});

test('English is required and all representations derive the folder ID', () => {
  const root = mkdtempSync(join(tmpdir(), 'onchaination-languages-'));
  try {
    for (const folder of [
      'learn/demo',
      'tools',
      'strategies',
      'skills',
      '.onchaination',
    ])
      mkdirSync(join(root, folder), { recursive: true });
    writeFileSync(
      join(root, '.onchaination/tags.yml'),
      'transactions:\n  aliases: []\n',
    );
    const localized =
      '---\nschema: 1\ntitle: Beispiel\ndescription: Ein Beispiel.\n---\nInhalt.\n';
    writeFileSync(join(root, 'learn/demo/de.md'), localized);
    assert.throws(() => loadItems(root), /Missing en.md/);
    writeFileSync(
      join(root, 'learn/demo/en.md'),
      '---\nschema: 1\ntitle: Example\ndescription: An example.\ntags: [transactions]\n---\nContent.\n',
    );
    const [item] = loadItems(root);
    assert.equal(item.id, 'demo');
    assert.equal(item.route, '/learn/demo/');
    assert.equal(item.translations.de.id, 'demo');
    assert.equal(translationFor(item, 'de')?.route, '/de/learn/demo/');
    writeFileSync(
      join(root, 'learn/demo/de.md'),
      localized.replace('schema: 1', 'schema: 1\nid: another-id'),
    );
    assert.throws(() => loadItems(root), /id/);
    writeFileSync(join(root, 'learn/demo/de.md'), localized);
    mkdirSync(join(root, 'skills/demo'));
    writeFileSync(
      join(root, 'skills/demo/en.md'),
      '---\nschema: 1\ntitle: Duplicate\ndescription: A duplicate ID.\ntags: [transactions]\n---\nContent.\n',
    );
    assert.deepEqual(
      loadItems(root).map((item) => item.contentKey),
      ['learn/demo', 'skills/demo'],
    );
    writeFileSync(join(root, 'learn/demo/fr.md'), localized);
    assert.throws(() => loadItems(root), /language/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('locale routes preserve knowledge identity and reject unsupported languages', () => {
  for (const locale of locales) {
    for (const key of [
      '',
      'learn',
      'learn/transaction',
      'tools/wallets',
      'search',
      'tags/security',
    ]) {
      const route = localePath(key, locale);
      assert.equal(getContentKey(route + '?q=test#heading'), key);
      for (const target of locales)
        assert.equal(localePath(route, target), localePath(key, target));
    }
  }
  assert.throws(() => localePath('learn', 'xx'), /Unsupported locale/);
});

test('every item resolves in every locale without fabricating source translations', () => {
  for (const item of loadItems())
    for (const locale of locales) {
      const view = resolveContent(item, locale);
      assert.equal(view.contentKey, item.contentKey);
      assert.equal(view.route, contentRoute(item, locale));
      assert.equal(view.interfaceLocale, locale);
      assert.equal(view.isFallback, !item.translations[locale]);
      assert.equal(view.language, item.translations[locale] ? locale : 'en');
      assert.equal(view.file, item.translations[locale]?.file ?? item.file);
    }
  const mev = loadItems().find((item) => item.contentKey === 'learn/mev')!;
  assert.equal(resolveContent(mev, 'uk').isFallback, true);
});

test('UI keys are complete and nonempty for every registered locale', () => {
  validateUI();
  for (const locale of locales)
    assert.deepEqual(Object.keys(ui[locale]).sort(), Object.keys(ui.en).sort());
});

test('Markdown links retain the interface locale, including fallback destinations', async () => {
  const items = loadItems();
  const result = await renderMarkdown(
    '[Wallet](../wallet/en.md) and [MEV](../mev/en.md)',
    'learn/transaction/uk.md',
    items,
    'uk',
  );
  assert.match(JSON.stringify(result.parts), /\/uk\/learn\/wallet\//);
  assert.match(JSON.stringify(result.parts), /\/uk\/learn\/mev\//);
});

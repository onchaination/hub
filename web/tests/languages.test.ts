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
} from '../src/lib/content';
import { languageName } from '../src/lib/languages';

test('translations are exact representations of four stable items', () => {
  const items = loadItems();
  assert.equal(items.length, 4);
  assert.equal(representations(items).length, 6);
  assert.deepEqual(availableLanguages(items), ['en', 'de', 'uk']);
  const learn = items.find((item) => item.id === 'transaction')!;
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
    assert.equal(item.route, '/learn/demo');
    assert.equal(item.translations.de.id, 'demo');
    assert.equal(translationFor(item, 'de')?.route, '/learn/demo/de');
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
    assert.throws(() => loadItems(root), /Duplicate content ID demo/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

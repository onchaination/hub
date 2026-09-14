import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  availableLanguages,
  loadItems,
  representations,
  translateItem,
} from '../src/lib/content';
import { languageName } from '../src/lib/languages';

test('translations are representations of four stable items, with English fallback', () => {
  const items = loadItems();
  assert.equal(items.length, 4);
  assert.equal(representations(items).length, 6);
  assert.deepEqual(availableLanguages(items), ['en', 'de', 'uk']);
  const learn = items.find((item) => item.id === 'transactions')!;
  assert.equal(translateItem(learn, 'de').language, 'de');
  assert.equal(translateItem(learn, 'uk').id, learn.id);
  assert.deepEqual(translateItem(learn, 'de').tags, learn.tags);
  assert.equal(translateItem(learn, 'fr').file, 'learn/transactions/en.md');
  const tool = items.find((item) => item.id === 'network-fee')!;
  assert.equal(translateItem(tool, 'de').language, 'en');
});

test('language display names use consistent title casing', () => {
  assert.equal(languageName('en'), 'English');
  assert.equal(languageName('de'), 'Deutsch');
  assert.equal(languageName('uk'), 'Українська');
});

test('English is required and translated IDs must match their folder', () => {
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
      '---\nschema: 1\nid: demo\ntitle: Beispiel\ndescription: Ein Beispiel.\n---\nInhalt.\n';
    writeFileSync(join(root, 'learn/demo/de.md'), localized);
    assert.throws(() => loadItems(root), /Missing en.md/);
    writeFileSync(
      join(root, 'learn/demo/en.md'),
      '---\nschema: 1\nid: demo\ntitle: Example\ndescription: An example.\ntags: [transactions]\n---\nContent.\n',
    );
    assert.equal(loadItems(root).length, 1);
    writeFileSync(
      join(root, 'learn/demo/de.md'),
      localized.replace('id: demo', 'id: another-id'),
    );
    assert.throws(() => loadItems(root), /ID must match/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

import { test, expect } from '@playwright/test';
import { loadItems } from '../src/lib/content';
import { locales } from '../src/lib/locales';
import { ui } from '../src/lib/ui';

test('all locale indexes and switches retain the route', async ({ page }) => {
  for (const locale of locales) {
    const prefix = locale === 'en' ? '' : '/' + locale;
    for (const route of ['', '/learn', '/tools', '/strategies', '/skills']) {
      await page.goto(prefix + route + '/');
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      await expect(page.locator('.desktop-nav')).toContainText(
        ui[locale].learn,
      );
      await page.locator('.language-select summary').click();
      await expect(page.locator('.language-select a[lang=en]')).toHaveAttribute(
        'href',
        route + '/',
      );
      await expect(page.locator('.language-select a[lang=uk]')).toHaveAttribute(
        'href',
        '/uk' + route + '/',
      );
    }
  }
});

test('localized search includes translated and fallback body text, without duplicate knowledge', async ({
  page,
}) => {
  await page.goto('/uk/search/');
  await expect(page.locator('#browse-fallback .content-row')).toHaveCount(loadItems().length);
  await page.getByLabel(ui.uk.searchKnowledge).fill('sandwich');
  await expect(page.locator('#search-results')).toContainText(
    'Transaction ordering',
  );
  await expect(page.locator('#search-results a').first()).toHaveAttribute(
    'href',
    /\/uk\/learn\/mev\//,
  );
  await page.getByLabel(ui.uk.searchKnowledge).fill('гаманець');
  await expect(page.locator('#search-results')).toContainText('Що контролює');
  await expect(
    page.locator('#search-results a[href="/uk/learn/wallet/"]'),
  ).toHaveCount(1);
  await expect(page).not.toHaveURL(/lang=/);
  await page.getByLabel(ui.uk.contentType).selectOption('skills');
  await expect(
    page.locator('#search-results a[href="/uk/learn/wallet/"]'),
  ).toHaveCount(0);
});

test('all language views supply the same explicit Telegram page URL', async ({
  page,
}) => {
  await page.route('https://telegram.org/**', (route) =>
    route.fulfill({ contentType: 'application/javascript', body: '' }),
  );
  for (const key of ['learn/transaction', 'learn/mev']) {
    for (const locale of locales) {
      await page.goto((locale === 'en' ? '/' : `/${locale}/`) + key + '/');
      await page.locator('.discussion').scrollIntoViewIfNeeded();
      const script = page.locator('#telegram-comments script');
      await expect(script).toHaveAttribute(
        'data-page-url',
        `https://onchaination.org/${key}/`,
      );
      await expect(script).toHaveAttribute(
        'data-telegram-discussion',
        'onchaination_info',
      );
    }
  }
});

test('unsupported browser retains the English source', async ({ page }) => {
  await page.addInitScript(() =>
    Object.defineProperty(window, 'Translator', {
      value: undefined,
      configurable: true,
    }),
  );
  await page.goto('/uk/learn/mev/');
  await expect(page.getByRole('switch')).toBeDisabled();
  await expect(page.locator('[data-translate-status]')).toHaveText(
    ui.uk.translationUnavailable,
  );
  await expect(page.locator('.prose')).toContainText(
    'Maximal extractable value',
  );
});

test('opt-in translation preserves protected data, SEO and restores exact original DOM', async ({
  page,
}) => {
  await page.addInitScript(() => {
    (window as any).translationCalls = 0;
    (window as any).Translator = {
      create: async () => {
        (window as any).translationCalls++;
        return {
          translate: async (text: string) => 'Переклад: ' + text,
          destroy() {},
        };
      },
    };
  });
  await page.route('**/uk/learn/mev/', async (route) => {
    const response = await route.fetch();
    const html = (await response.text()).replace(
      '</article>',
      '<p data-translate-block id="protected-example">Read <code>transferFrom()</code> <span translate="no">keepMeExactly</span> https://example.com/a 0x1234567890abcdef example.md account_nonce <a href="/learn/transaction/">reference</a></p></article>',
    );
    await route.fulfill({ response, body: html });
  });
  await page.goto('/uk/learn/mev/');
  const original = await page.locator('[data-translate-content]').innerHTML();
  const fixture = await page.locator('#protected-example').innerHTML();
  expect(await page.evaluate(() => (window as any).translationCalls)).toBe(0);
  await page.getByRole('switch').check();
  await expect(page.locator('[data-translate-status]')).toHaveText(
    ui.uk.machineTranslated,
  );
  await expect(page.locator('h1')).toContainText('Переклад:');
  await expect(page.locator('#protected-example code')).toHaveText(
    'transferFrom()',
  );
  await expect(page.locator('#protected-example [translate=no]')).toHaveText(
    'keepMeExactly',
  );
  await expect(page.locator('#protected-example')).toContainText(
    'https://example.com/a 0x1234567890abcdef example.md account_nonce',
  );
  await expect(page.locator('#protected-example a')).toHaveAttribute(
    'href',
    '/learn/transaction/',
  );
  await expect(page.locator('link[rel=canonical]')).toHaveAttribute(
    'href',
    'https://onchaination.org/learn/mev/',
  );
  await expect(page.locator('link[hreflang=uk]')).toHaveCount(0);
  await page.getByRole('button', { name: ui.uk.original }).click();
  expect(await page.locator('[data-translate-content]').innerHTML()).toBe(
    original,
  );
  expect(await page.locator('#protected-example').innerHTML()).toBe(fixture);
  await expect(page.getByRole('switch')).not.toBeChecked();
  await page.getByRole('switch').check();
  await expect(page.locator('[data-translate-status]')).toHaveText(
    ui.uk.machineTranslated,
  );
  await page.getByRole('switch').uncheck();
  expect(await page.locator('[data-translate-content]').innerHTML()).toBe(
    original,
  );
});

for (const failure of ['create', 'translate', 'protected-token']) {
  test(`translation ${failure} failure keeps the entire English article`, async ({
    page,
  }) => {
    await page.addInitScript((failure) => {
      (window as any).Translator = {
        create: async () => {
          if (failure === 'create') throw Error('unavailable language pair');
          let count = 0;
          return {
            translate: async (text: string) => {
              if (failure === 'translate' && ++count > 2) throw Error('failed');
              return failure === 'protected-token'
                ? text.replace(/\[\[OC\d+\]\]/g, 'changed')
                : 'translated ' + text;
            },
            destroy() {},
          };
        },
      };
    }, failure);
    await page.goto('/uk/learn/collateral/');
    const original = await page.locator('[data-translate-content]').innerHTML();
    await page.getByRole('switch').click();
    await expect(page.locator('[data-translate-status]')).toHaveText(
      ui.uk.translationUnavailable,
    );
    expect(await page.locator('[data-translate-content]').innerHTML()).toBe(
      original,
    );
    await expect(page.getByRole('switch')).not.toBeChecked();
  });
}

test('turning translation off while it is pending prevents late changes', async ({
  page,
}) => {
  await page.addInitScript(() => {
    (window as any).Translator = {
      create: async () => ({
        translate: (text: string) =>
          new Promise((resolve) =>
            setTimeout(() => resolve('translated ' + text), 150),
          ),
        destroy() {},
      }),
    };
  });
  await page.goto('/uk/learn/mev/');
  const original = await page.locator('[data-translate-content]').innerHTML();
  await page.getByRole('switch').check();
  await expect(page.locator('[data-translate-status]')).toHaveText(
    ui.uk.translating,
  );
  await page.getByRole('switch').uncheck();
  await page.waitForTimeout(250);
  expect(await page.locator('[data-translate-content]').innerHTML()).toBe(
    original,
  );
});

test('localized pages work without JavaScript and stay within mobile width', async ({
  browser,
  page,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const noJS = await context.newPage();
  await noJS.goto('http://127.0.0.1:4321/uk/learn/mev/');
  await expect(noJS.locator('.prose')).toContainText(
    'Maximal extractable value',
  );
  await expect(noJS.locator('.desktop-nav')).toContainText(ui.uk.learn);
  await context.close();
  await page.setViewportSize({ width: 375, height: 812 });
  for (const path of [
    '/uk/',
    '/uk/learn/wallet/',
    '/de/tools/network-fee-calculator/',
    '/pt/search/',
  ]) {
    await page.goto(path);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});

test('translated home layouts fit phone, tablet and desktop widths', async ({
  page,
}) => {
  for (const width of [320, 375, 768, 1024, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const locale of locales) {
      const path = locale === 'en' ? '/' : `/${locale}/`;
      await page.goto(path);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${path} at ${width}px`,
      ).toBe(true);
    }
  }
});

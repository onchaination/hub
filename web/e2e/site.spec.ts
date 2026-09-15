import { test, expect } from '@playwright/test';

test('navigation, static pages and clean canonical links', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Understand more.',
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    'https://onchaination.org/og.png',
  );
  await page.getByRole('link', { name: /Start here/ }).click();
  await expect(page).toHaveURL(/\/learn\/?$/);
  await page.locator('.content-row h3 a').click();
  await expect(page.locator('.prose')).toContainText(
    'From intention to confirmation',
  );
  await page.goto('/learn/transaction?utm_source=test');
  await expect(page.locator('link[rel=canonical]')).toHaveAttribute(
    'href',
    'https://onchaination.org/learn/transaction/',
  );
  await expect(page.locator('link[type="text/markdown"]')).toHaveAttribute(
    'href',
    'https://onchaination.org/learn/transaction/en.md',
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    'https://onchaination.org/og/learn/transaction.png',
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    'content',
    'summary_large_image',
  );
});

test('path pages prioritize discovery and collapse contribution guidance', async ({
  page,
}) => {
  for (const path of ['learn', 'tools', 'strategies', 'skills']) {
    await page.goto(`/${path}`);
    const heading = page.locator('.page-heading');
    const content = page.locator('.content-rows');
    const contribution = page.locator('.section-guide');

    await expect(heading).toBeVisible();
    await expect(content).toBeVisible();
    await expect(contribution.locator('summary')).toHaveText(/^How to add .+\?$/);
    await expect(contribution).not.toHaveAttribute('open', '');
    await expect(contribution.locator('.section-guide-content')).toBeHidden();
    expect(
      await heading.evaluate((element) =>
        Boolean(
          element.compareDocumentPosition(
            document.querySelector('.content-rows')!,
          ) & Node.DOCUMENT_POSITION_FOLLOWING,
        ),
      ),
    ).toBe(true);
    expect(
      await content.evaluate((element) =>
        Boolean(
          element.compareDocumentPosition(
            document.querySelector('.section-guide')!,
          ) & Node.DOCUMENT_POSITION_FOLLOWING,
        ),
      ),
    ).toBe(true);
  }
});

test('widget responds to inputs, validates, and resets', async ({ page }) => {
  await page.goto('/tools/network-fee-calculator');
  await page.locator('.widget').scrollIntoViewIfNeeded();
  await expect(page.locator('astro-island')).not.toHaveAttribute('ssr');
  await expect(page.locator('output')).toContainText('0.00021');
  await page.getByLabel('Gas price (gwei)', { exact: true }).fill('20');
  await expect(page.locator('output')).toContainText('0.00042');
  await page.getByLabel('Gas units', { exact: true }).fill('');
  await expect(page.locator('.widget-result')).toContainText(
    'Enter both values',
  );
  await page.getByRole('button', { name: 'Reset example' }).click();
  await expect(page.locator('output')).toContainText('0.00021');
});

test('Solana calculator uses its own units and formula', async ({ page }) => {
  await page.goto('/tools/network-fee-calculator');
  await page.locator('.widget').scrollIntoViewIfNeeded();
  await expect(page.locator('astro-island')).not.toHaveAttribute('ssr');
  await page.getByLabel('Network fee model').selectOption('solana');
  await expect(page.locator('output')).toContainText('0.0000052');
  await expect(page.locator('output')).toContainText('SOL');
  await page
    .getByLabel('CU price (micro-lamports, 0–1,000,000,000)', { exact: true })
    .fill('0');
  await expect(page.locator('output')).toContainText('0.000005');
});

test('languages are discovered and missing translations are real 404s', async ({
  page,
}) => {
  await page.goto('/learn/transaction/de');
  await expect(page.locator('html')).toHaveAttribute('lang', 'de');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Was passiert',
  );
  await expect(page.locator('link[type="text/markdown"]')).toHaveAttribute(
    'href',
    'https://onchaination.org/learn/transaction/de.md',
  );
  await expect(
    page.getByRole('navigation', { name: 'Content language' }),
  ).toBeHidden();
  await page.locator('.language-menu summary').click();
  await page
    .getByRole('navigation', { name: 'Content language' })
    .getByRole('link', { name: 'Українська' })
    .click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'uk');
  await expect(page.locator('link[rel=canonical]')).toHaveAttribute(
    'href',
    'https://onchaination.org/learn/transaction/',
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    'https://onchaination.org/og/learn/transaction/uk.png',
  );
  await expect(
    page.getByRole('heading', { name: '💬 Discussion' }),
  ).toBeVisible();
  const missingTranslation = await page.goto('/tools/network-fee-calculator/de');
  expect(missingTranslation?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    "This page isn't here.",
  );
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.goto('/search?lang=de');
  await expect(page.locator('#search-results .search-result')).toHaveCount(1);
  await expect(page.locator('#search-results')).toContainText('Was passiert');
  await page.getByLabel('Search knowledge').fill('Netzwerk');
  await expect(page.locator('#search-results')).toContainText('Was passiert');
  await page.goto('/');
  await expect(page.locator('.level-card')).toHaveCount(3);
  await expect(
    page.getByRole('heading', { name: /Find your starting point/ }),
  ).toBeVisible();
  await expect(page.locator('.browse-section')).toContainText('Beginner');
  await expect(page.locator('.browse-section')).toContainText('Intermediate');
  await expect(page.locator('.browse-section')).toContainText('Advanced');
  await expect(page.locator('.level-description')).toHaveCount(3);
});

test('Pagefind searches body text and aliases, filters types, and handles no results', async ({
  page,
}) => {
  await page.goto('/search?q=%23gas');
  await expect(page.locator('#search-results')).toContainText(
    'Network fee calculator',
  );
  await page.getByLabel('Content type').selectOption('Tools');
  await expect(page.locator('#search-results .search-result')).toHaveCount(1);
  await page.getByLabel('Search knowledge').fill('zzzzzzzzzz');
  await expect(page.getByRole('status')).toContainText('No matching pages');
  await page.getByLabel('Content type').selectOption('');
  await page.getByLabel('Search knowledge').fill('broadcast');
  await expect(page.locator('#search-results')).toContainText(
    'What happens when you send a transaction?',
  );
  await page.goto('/tags/gas');
  await expect(page).toHaveURL(/\/tags\/fees\/?$/);
});

test('levels link pages across all knowledge paths', async ({ page }) => {
  await page.goto('/learn/transaction');
  await page.getByRole('link', { name: 'beginner', exact: true }).click();
  await expect(page).toHaveURL(/\/levels\/beginner\/?$/);
  await expect(
    page.getByRole('heading', { level: 1, name: 'Beginner' }),
  ).toBeVisible();
  await expect(page.locator('.content-row')).toHaveCount(4);
});

test('AI clipboard denial has a fallback; Telegram loads when discussion is viewed', async ({
  page,
}) => {
  const requests: string[] = [];
  page.on('request', (request) => requests.push(request.url()));
  await page.route('https://telegram.org/**', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/javascript',
      body: '',
    }),
  );
  await page.goto('/skills/check-transaction');
  await page.addInitScript(() =>
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: () => Promise.reject(new Error('denied')) },
    }),
  );
  await page.reload();
  expect(requests.some((url) => url.includes('telegram.org/js'))).toBe(false);
  await page.locator('.ai-panel summary').click();
  await page.getByRole('button', { name: 'Copy context' }).click();
  await expect(page.locator('#copy-status')).toContainText(
    'Copy the selected text manually',
  );
  await expect(page.locator('#ai-context')).toHaveValue(/step by step/);
  await page.locator('.discussion').scrollIntoViewIfNeeded();
  await expect(page.locator('.discussion-embed')).toHaveAttribute('open', '');
  await expect(page.locator('#telegram-comments script')).toHaveAttribute(
    'data-telegram-discussion',
    'onchaination_info',
  );
});

test('mobile has usable navigation and no horizontal overflow', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  for (const path of [
    '/',
    '/learn',
    '/tools/network-fee-calculator',
    '/search',
  ]) {
    await page.goto(path);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page.getByText('Menu', { exact: true }).click();
  await expect(
    page.getByRole('navigation', { name: 'Mobile navigation' }),
  ).toBeVisible();
});

test('knowledge and the calculator formula remain readable without JavaScript', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(
    'http://127.0.0.1:4321/tools/network-fee-calculator',
  );
  await expect(page.locator('.prose')).toContainText('21,000 × 10');
  await expect(page.getByRole('link', { name: 'Markdown' })).toBeVisible();
  await context.close();
});

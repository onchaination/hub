import { test, expect } from '@playwright/test';

test('system is the default; overrides persist and system changes stay live', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  const theme = page.getByRole('combobox', { name: 'Color theme' });
  await expect(theme).toHaveValue('system');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('html')).toHaveCSS(
    'background-color',
    'rgb(17, 17, 17)',
  );

  await theme.selectOption('light');
  await page.getByRole('link', { name: /Start here/ }).click();
  await expect(theme).toHaveValue('light');
  await expect(page.locator('html')).toHaveCSS(
    'background-color',
    'rgb(255, 255, 255)',
  );
  await page.emulateMedia({ colorScheme: 'light' });
  await theme.selectOption('dark');
  await page.reload();
  await expect(theme).toHaveValue('dark');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

  await theme.selectOption('system');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute(
    'content',
    '#111111',
  );
});

test('mobile menu exposes the theme without overflowing', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 812 });
  await page.goto('/tools/network-fee');
  await page.getByText('Menu', { exact: true }).click();
  await page
    .getByRole('combobox', { name: 'Color theme' })
    .selectOption('dark');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await expect(page.getByRole('combobox', { name: 'Color theme' })).toHaveCSS(
    'color-scheme',
    'dark',
  );
});

test('blocked storage does not break the theme selector', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new Error('Storage blocked');
      },
    });
  });
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  const theme = page.getByRole('combobox', { name: 'Color theme' });
  await expect(theme).toHaveValue('system');
  await theme.selectOption('dark');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('system dark styling works without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    colorScheme: 'dark',
  });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4321/tools/network-fee');
  await expect(page.locator('html')).toHaveCSS(
    'background-color',
    'rgb(17, 17, 17)',
  );
  await expect(page.locator('.prose')).toHaveCSS('color', 'rgb(238, 238, 238)');
  await expect(page.getByRole('combobox', { name: 'Color theme' })).toHaveCount(
    0,
  );
  await context.close();
});

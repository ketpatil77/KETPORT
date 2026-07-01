import { test, expect } from '@playwright/test';

test('home renders key sections', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('main')).toBeVisible();
  await expect(page.getByRole('heading', { name: /innovation lab/i })).toBeVisible();
});

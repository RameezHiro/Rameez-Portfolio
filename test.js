const { test, expect } = require('@playwright/test');
test('Homepage loads', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await expect(page).toHaveText(/RAMEEZ/);
});

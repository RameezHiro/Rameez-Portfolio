const { test, expect } = require('@playwright/test');

test.describe('Frontend QA for RAMEEZ: THE DEVELOPER\'S ARC', () => {
  test.beforeEach(async ({ page }) => {
    // Clear storage before each test to ensure fresh state unless otherwise specified
    await page.context().clearStorage({ state: 'local' });
    await page.context().clearStorage({ state: 'session' });
  });

  test('TEST 1: HOMEPAGE LOAD', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
    // Check for basic content
    await expect(page.locator('body')).toBeVisible();
    // Check for no horizontal overflow
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(overflow).toBe(false);
  });

  test('TEST 2: PROLOGUE', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');

    // Scene 01: mountain.png and text
    await expect(page.locator('text=Every engineer starts somewhere.')).toBeVisible({ timeout: 5000 });
    // Scene 02: rameez-manga.png and text
    await expect(page.locator('text=This is where my story starts.')).toBeVisible({ timeout: 5000 });
    const mangaImg = page.locator('img[src*="rameez-manga"]');
    await expect(mangaImg).toBeVisible({ timeout: 5000 });

    // Scene 03: terminal text
    await expect(page.locator('text=$ whoami')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=rameez')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=$ focus')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=software-engineering')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=ai-ml')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=backend')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=$ status')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=building...')).toBeVisible({ timeout: 5000 });

    // Scene 05: final cover
    await expect(page.locator('text=RAMEEZ')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=THE DEVELOPER\'S ARC')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=AI × SOFTWARE × BUILDING')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=B.Tech CSE · AI/ML')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=BEGIN READING ↓')).toBeVisible({ timeout: 5000 });
  });

  test('TEST 3: SKIP INTRO', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');

    // Click skip button
    const skipButton = page.locator('text=SKIP INTRO ↗');
    await expect(skipButton).toBeVisible({ timeout: 5000 });
    await skipButton.click();

    // Wait for prologue to disappear
    await expect(page.locator('text=Every engineer starts somewhere.')).toBeHidden({ timeout: 5000 });
    // Check that the underlying page is accessible
    await expect(page.locator('text=Chapter 01: THE ORIGIN')).toBeVisible({ timeout: 5000 });

    // Test with Escape key
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.keyboard().press('Escape');
    await expect(page.locator('text=Every engineer starts somewhere.')).toBeHidden({ timeout: 5000 });
    await expect(page.locator('text=Chapter 01: THE ORIGIN')).toBeVisible({ timeout: 5000 });
  });

  test('TEST 4: RETURNING VISITOR', async ({ page }) => {
    // First, visit to set session storage
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
    // Wait for prologue to finish (we'll wait for the final cover and then a bit more)
    await expect(page.locator('text=BEGIN READING ↓')).toBeVisible({ timeout: 15000 });
    // Now reload without clearing storage
    await page.reload();
    await page.waitForLoadState('networkidle');
    // The prologue should not show; we should see the home content directly
    await expect(page.locator('text=Every engineer starts somewhere.')).toBeHidden({ timeout: 5000 });
    await expect(page.locator('text=Chapter 01: THE ORIGIN')).toBeVisible({ timeout: 5000 });
  });

  test('TEST 5: TOP NAVIGATION', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
    // Skip prologue if it appears (we are in a fresh session, so we'll skip)
    const skipButton = page.locator('text=SKIP INTRO ↗');
    if (await skipButton.isVisible()) {
      await skipButton.click();
    }
    await expect(page.locator('text=RAMEEZ')).toBeVisible();
    // We'll look for the button with the menu icon
    const menuIcon = page.locator('span:has-text("menu")');
    await expect(menuIcon).toBeVisible();
  });

  test('TEST 6: NAVIGATION MENU', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
    // Skip prologue
    const skipButton = page.locator('text=SKIP INTRO ↗');
    if (await skipButton.isVisible()) {
      await skipButton.click();
    }
    // Open menu
    const menuButton = page.locator('button:has(span:has-text("menu"))');
    await menuButton.click();
    // Wait for menu to open
    await expect(page.locator('[role="dialog"], .menu, [data-testid="menu"]').first()).toBeVisible({ timeout: 5000 });
    // Check for chapter items
    await expect(page.locator('text=THE DEVELOPER\'S ARC')).toBeVisible();
    await expect(page.locator('text=01')).toBeVisible();
    await expect(page.locator('text=THE ORIGIN')).toBeVisible();
    // Check for journal
    await expect(page.locator('text=DEVELOPER\'S JOURNAL')).toBeVisible();
    await expect(page.locator('text=View Journal')).toBeVisible();
    // Check for external links (if present)
    await expect(page.locator('text=GitHub')).toBeVisible();
    await expect(page.locator('text=LinkedIn')).toBeVisible();
    // Test backdrop click
    await page.click('body', { position: { x: 0, y: 0 } }); // Click at top-left corner (likely backdrop)
    // Wait for menu to close
    await expect(page.locator('[role="dialog"], .menu, [data-testid="menu"]').first()).toBeHidden({ timeout: 5000 });
    // Test Escape key
    await menuButton.click();
    await page.keyboard().press('Escape');
    await expect(page.locator('[role="dialog"], .menu, [data-testid="menu"]').first()).toBeHidden({ timeout: 5000 });
    // Test close button
    await menuButton.click();
    const closeButton = page.locator('button:has(span:has-text("close"))');
    await closeButton.click();
    await expect(page.locator('[role="dialog"], .menu, [data-testid="menu"]').first()).toBeHidden({ timeout: 5000 });
  });

  test('TEST 7: CHAPTER RAIL', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
    // Skip prologue
    const skipButton = page.locator('text=SKIP INTRO ↗');
    if (await skipButton.isVisible()) {
      await skipButton.click();
    }
    // Wait for chapter rail to be visible
    await expect(page.locator('text=01')).toBeVisible({ timeout: 5000 });
  });

  test('TEST 8: JOURNAL ROUTES', async ({ page }) => {
    await page.goto('http://localhost:5173/journal');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('text=DEVELOPER\'S JOURNAL')).toBeVisible();
    // Check for navigation
    await expect(page.locator('text=RAMEEZ')).toBeVisible();
  });

  test('TEST 9: 404', async ({ page }) => {
    await page.goto('http://localhost:5173/this-route-does-not-exist');
    await page.waitForLoadState('networkidle');
    // Check that the app doesn't crash
    await expect(page.locator('body')).toBeVisible();
    // Check for the 404 message
    await expect(page.locator('text=CHAPTER NOT FOUND')).toBeVisible();
  });

  test('TEST 10: MOBILE', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
    // Skip prologue
    const skipButton = page.locator('text=SKIP INTRO ↗');
    if (await skipButton.isVisible()) {
      await skipButton.click();
    }
    // Check for horizontal overflow
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(overflow).toBe(false);
    // Check for mobile navigation (menu button)
    const menuIcon = page.locator('span:has-text("menu")');
    await expect(menuIcon).toBeVisible();
    // Check that the text is readable
    await expect(page.locator('text=RAMEEZ')).toBeVisible();
  });

  test('TEST 11: DESKTOP', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
    // Skip prologue
    const skipButton = page.locator('text=SKIP INTRO ↗');
    if (await skipButton.isVisible()) {
      await skipButton.click();
    }
    // Check for horizontal overflow
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(overflow).toBe(false);
    // Check that the content is visible
    await expect(page.locator('text=RAMEEZ')).toBeVisible();
  });

  test('TEST 12: REDUCED MOTION', async ({ page }) => {
    // Set reduced motion
    await page.addInitScript(() => {
      Object.defineProperty(window.matchMedia('(prefers-reduced-motion: reduce)'), 'matches', {
        writable: true,
        value: true
      });
    });
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
    // The prologue should be skipped, so we should see the final cover immediately
    await expect(page.locator('text=RAMEEZ')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=Every engineer starts somewhere.')).toBeHidden({ timeout: 5000 });
  });

  test('TEST 13: IMAGE/ASSET HEALTH', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
    // We'll check the mountain image (if it's used as a background, we can't check easily)
    // We'll check the manga image
    const mangaImg = page.locator('img[src*="rameez-manga"]');
    if (await mangaImg.isVisible()) {
      const naturalWidth = await mangaImg.evaluate(img => img.naturalWidth);
      const naturalHeight = await mangaImg.evaluate(img => img.naturalHeight);
      expect(naturalWidth).toBeGreaterThan(0);
      expect(naturalHeight).toBeGreaterThan(0);
    }
    // We'll check the portrait image if it's present
    const portraitImg = page.locator('img[src*="rameez-potrait"]');
    if (await portraitImg.isVisible()) {
      const naturalWidth = await portraitImg.evaluate(img => img.naturalWidth);
      const naturalHeight = await portraitImg.evaluate(img => img.naturalHeight);
      expect(naturalWidth).toBeGreaterThan(0);
      expect(naturalHeight).toBeGreaterThan(0);
    }
  });

  test('TEST 14: CONSOLE + NETWORK', async ({ page }) => {
    // We'll collect console errors and warnings, and network failures
    const consoleErrors = [];
    const consoleWarnings = [];
    const failedRequests = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      } else if (msg.type() === 'warning') {
        consoleWarnings.push(msg.text());
      }
    });

    page.on('requestfailed', request => {
      failedRequests.push({
        url: request.url(),
        failure: request.failure()
      });
    });

    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');

    // We'll check the collected data
    // We'll ignore harmless development-server/HMR noise
    // We'll filter out known harmless messages
    const filteredErrors = consoleErrors.filter(error => {
      return !error.includes('HMR') && !error.includes('webpack') && !error.includes('vite');
    });
    const filteredWarnings = consoleWarnings.filter(warning => {
      return !warning.includes('HMR') && !warning.includes('webpack') && !warning.includes('vite');
    });

    // We'll expect no errors and no warnings (or at least no severe ones)
    // We'll just log them for the report
    // We'll not fail the test on warnings, but we will on errors
    expect(filteredErrors.length).toBe(0);
    // We'll not fail on warnings, but we'll note them
  });
});
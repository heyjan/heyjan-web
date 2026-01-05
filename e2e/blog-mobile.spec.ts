import { test, expect } from '@playwright/test'

test.describe('Blog page mobile view', () => {
  test('top bar should wrap properly on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 }) // iPhone SE size
    
    await page.goto('/blog')
    
    // Wait for articles to load
    await page.waitForSelector('article', { timeout: 5000 })
    
    // Get the first article's top bar container
    const topBar = page.locator('article').first().locator('.flex.flex-wrap.items-center.gap-3.mb-4')
    
    // Verify the container exists and has flex-wrap class
    await expect(topBar).toBeVisible()
    await expect(topBar).toHaveClass(/flex-wrap/)
    
    // Check that content doesn't overflow horizontally
    const boundingBox = await topBar.boundingBox()
    const pageWidth = page.viewportSize()?.width || 375
    
    // The top bar should not exceed the page width
    expect(boundingBox?.width).toBeLessThanOrEqual(pageWidth)
    
    // Verify tags container also has flex-wrap
    const tagsContainer = topBar.locator('.flex.flex-wrap.gap-2')
    if (await tagsContainer.count() > 0) {
      await expect(tagsContainer.first()).toHaveClass(/flex-wrap/)
    }
  })

  test('top bar should display correctly on tablet viewport', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 })
    
    await page.goto('/blog')
    
    // Wait for articles to load
    await page.waitForSelector('article', { timeout: 5000 })
    
    const topBar = page.locator('article').first().locator('.flex.flex-wrap.items-center.gap-3.mb-4')
    
    await expect(topBar).toBeVisible()
    
    // On tablet, content should still fit properly
    const boundingBox = await topBar.boundingBox()
    const pageWidth = page.viewportSize()?.width || 768
    
    expect(boundingBox?.width).toBeLessThanOrEqual(pageWidth)
  })
})


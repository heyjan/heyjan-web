import { test, expect } from '@playwright/test'

test.describe('Breadcrumb alignment', () => {
  test('CV page breadcrumb container should use max-w-5xl to match sections', async ({ page }) => {
    await page.goto('/cv')
    
    // Get the breadcrumb's parent container
    const breadcrumbParent = page.locator('.breadcrumb-container').locator('..')
    
    // Verify it has max-w-5xl class
    await expect(breadcrumbParent).toHaveClass(/max-w-5xl/)
  })

  test('Contact page breadcrumb container should use max-w-4xl to match ContactSection', async ({ page }) => {
    await page.goto('/contact')
    
    // Get the breadcrumb's parent container
    const breadcrumbParent = page.locator('.breadcrumb-container').locator('..')
    
    // ContactSection uses max-w-4xl, so breadcrumb should match
    await expect(breadcrumbParent).toHaveClass(/max-w-4xl/)
  })
})

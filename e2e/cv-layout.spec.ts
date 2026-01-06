import { test, expect } from '@playwright/test'

test.describe('CV Page Layout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/cv')
    await page.waitForLoadState('networkidle')
  })

  test('should display CV page with correct structure', async ({ page }) => {
    await expect(page.locator('h2').filter({ hasText: 'General Skills' })).toBeVisible()
    await expect(page.locator('h2').filter({ hasText: 'Work Experience' })).toBeVisible()
    await expect(page.locator('h2').filter({ hasText: 'Interests' })).toBeVisible()
    await expect(page.locator('h2').filter({ hasText: 'AI & Cloud Expertise' })).toBeVisible()
    await expect(page.locator('h2').filter({ hasText: 'Languages' })).toBeVisible()
    await expect(page.locator('h2').filter({ hasText: 'Software' })).toBeVisible()
    await expect(page.locator('h2').filter({ hasText: 'Get In Touch' })).toBeVisible()
  })

  test('should have 50/50 split layout on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    
    const gridContainers = page.locator('.grid.grid-cols-1.lg\\:grid-cols-2')
    await expect(gridContainers).toHaveCount(3)

    const firstGrid = gridContainers.first()
    await expect(firstGrid).toHaveClass(/gap-8/)
  })

  test('should display Interests section with correct content', async ({ page }) => {
    const interestsSection = page.locator('h2').filter({ hasText: 'Interests' }).locator('..')
    
    await expect(page.getByText('Brazilian Jiu Jitsu')).toBeVisible()
    await expect(page.getByText('Brown Belt')).toBeVisible()
    await expect(page.getByText('Financial Markets')).toBeVisible()
    await expect(page.getByText('Technology')).toBeVisible()
  })

  test('should display Languages section with correct content', async ({ page }) => {
    await expect(page.getByText('German').first()).toBeVisible()
    await expect(page.getByText('Native')).toBeVisible()
    await expect(page.getByText('English').first()).toBeVisible()
    await expect(page.getByText('Fluent')).toBeVisible()
  })

  test('should have consistent max-w-5xl container width', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    
    const containers = page.locator('.max-w-5xl.mx-auto')
    const count = await containers.count()
    
    expect(count).toBeGreaterThanOrEqual(4)
  })

  test('should stack layout on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    
    const gridContainers = page.locator('.grid.grid-cols-1.lg\\:grid-cols-2')
    
    for (let i = 0; i < await gridContainers.count(); i++) {
      const grid = gridContainers.nth(i)
      const box = await grid.boundingBox()
      expect(box).not.toBeNull()
    }
  })

  test('Contact section should be full width', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    
    const contactSection = page.locator('#contact')
    await expect(contactSection).toBeVisible()
    
    const contactMaxWidth = page.locator('#contact .max-w-4xl')
    await expect(contactMaxWidth).toBeVisible()
  })

  test('screenshot - CV page full desktop view', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.waitForTimeout(500)
    
    await page.screenshot({
      path: 'e2e/screenshots/cv-desktop-full.png',
      fullPage: true
    })
  })

  test('screenshot - CV page mobile view', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.waitForTimeout(500)
    
    await page.screenshot({
      path: 'e2e/screenshots/cv-mobile-full.png',
      fullPage: true
    })
  })

  test('screenshot - Skills and Work Experience row', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    
    const skillsTitle = page.locator('h2').filter({ hasText: 'General Skills' })
    await skillsTitle.scrollIntoViewIfNeeded()
    await page.waitForTimeout(300)
    
    await page.screenshot({
      path: 'e2e/screenshots/cv-skills-work-row.png'
    })
  })

  test('screenshot - Interests and AI row', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    
    const interestsTitle = page.locator('h2').filter({ hasText: 'Interests' })
    await interestsTitle.scrollIntoViewIfNeeded()
    await page.waitForTimeout(300)
    
    await page.screenshot({
      path: 'e2e/screenshots/cv-interests-ai-row.png'
    })
  })

  test('screenshot - Languages and Software row', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    
    const languagesTitle = page.locator('h2').filter({ hasText: 'Languages' })
    await languagesTitle.scrollIntoViewIfNeeded()
    await page.waitForTimeout(300)
    
    await page.screenshot({
      path: 'e2e/screenshots/cv-languages-software-row.png'
    })
  })
})



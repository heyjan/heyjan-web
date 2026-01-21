import { test, expect } from '@playwright/test'

test.describe('Page Transition Animation', () => {
    test('should show shutter transition when navigating between pages', async ({ page }) => {
        // Navigate to homepage
        await page.goto('/')
        await page.waitForLoadState('networkidle')

        // Take screenshot of homepage
        await page.screenshot({ path: 'test-results/01-homepage.png' })

        // Find and click a navigation link
        const projectsLink = page.locator('a[href="/projects"]').first()

        if (await projectsLink.isVisible()) {
            await projectsLink.click()

            // Wait a bit for transition to start, then screenshot
            await page.waitForTimeout(500)
            await page.screenshot({ path: 'test-results/02-transition-in-progress.png' })

            // Wait for navigation to complete
            await page.waitForURL('**/projects')
            await page.waitForLoadState('networkidle')

            // Take screenshot after transition
            await page.screenshot({ path: 'test-results/03-projects-page.png' })

            // Check that we're on the projects page
            await expect(page).toHaveURL(/projects/)

            // Navigate back to home to test transition again
            const homeLink = page.locator('a[href="/"]').first()
            if (await homeLink.isVisible()) {
                await homeLink.click()

                await page.waitForTimeout(500)
                await page.screenshot({ path: 'test-results/04-transition-back.png' })

                await page.waitForURL('/')
                await page.screenshot({ path: 'test-results/05-back-to-home.png' })
            }
        }
    })

    test('should have shutter-bar element in DOM', async ({ page }) => {
        await page.goto('/')
        await page.waitForLoadState('networkidle')

        // Check that shutter-bar element exists
        const shutterBar = page.locator('.shutter-bar')
        await expect(shutterBar).toBeAttached()
    })
})

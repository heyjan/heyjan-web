import { test, expect } from '@playwright/test'

test.use({
    video: 'on',
    viewport: { width: 1280, height: 720 },
})

test.describe('Page Transition Animation - Video Recording', () => {
    test('record page transition animation', async ({ page }) => {
        // Navigate to homepage
        await page.goto('/')
        await page.waitForLoadState('networkidle')
        await page.waitForTimeout(1000) // Let page settle

        // Screenshot of homepage
        await page.screenshot({ path: 'test-results/transition-01-home.png', fullPage: false })

        // Click hamburger menu to open navigation
        const menuButton = page.locator('button[aria-label="Toggle menu"]')
        await menuButton.click()
        await page.waitForTimeout(500) // Wait for menu animation

        // Screenshot with menu open
        await page.screenshot({ path: 'test-results/transition-02-menu-open.png', fullPage: false })

        // Click on Projects link in the menu
        const projectsLink = page.locator('a').filter({ hasText: 'Projects' }).first()

        if (await projectsLink.isVisible()) {
            console.log('Clicking Projects link...')
            await projectsLink.click()

            // Capture multiple screenshots during transition
            for (let i = 0; i < 5; i++) {
                await page.waitForTimeout(400)
                await page.screenshot({ path: `test-results/transition-03-during-${i}.png`, fullPage: false })
            }

            // Wait for navigation to complete
            await page.waitForURL('**/projects', { timeout: 10000 })
            await page.waitForLoadState('networkidle')
            await page.waitForTimeout(500)

            // Screenshot after transition
            await page.screenshot({ path: 'test-results/transition-04-projects.png', fullPage: false })

            // Open menu again and navigate back home
            await menuButton.click()
            await page.waitForTimeout(500)

            const homeLink = page.locator('a').filter({ hasText: 'Home' }).first()
            if (await homeLink.isVisible()) {
                console.log('Clicking Home link...')
                await homeLink.click()

                // Capture during return transition
                for (let i = 0; i < 5; i++) {
                    await page.waitForTimeout(400)
                    await page.screenshot({ path: `test-results/transition-05-return-${i}.png`, fullPage: false })
                }

                await page.waitForURL('/', { timeout: 10000 })
                await page.waitForLoadState('networkidle')

                await page.screenshot({ path: 'test-results/transition-06-back-home.png', fullPage: false })
            }
        } else {
            console.log('Projects link not visible after opening menu')
            await page.screenshot({ path: 'test-results/transition-error-menu.png', fullPage: false })
        }
    })
})

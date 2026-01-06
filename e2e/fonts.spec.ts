import { test, expect } from '@playwright/test'

test.describe('fonts', () => {
  test('loads TT Travels Text (local woff2) and applies it to headings', async ({ page }) => {
    await page.goto('/')

    // Pick an existing heading and verify the CSS font-family is set as expected.
    const heading = page.locator('h1, h2, h3, h4, h5, h6').first()
    await expect(heading).toBeVisible()

    const headingFontFamily = await heading.evaluate((el) => getComputedStyle(el).fontFamily)
    expect(headingFontFamily).toContain('TT Travels Text')

    // `document.fonts.check(...)` confirms the browser actually has a usable font face.
    // If this stays false, the page is rendering with a fallback font.
    await expect
      .poll(
        async () =>
          page.evaluate(() => {
            if (!('fonts' in document)) return { ok: false, reason: 'FontFaceSet not supported' }
            const ok = document.fonts.check('500 16px "TT Travels Text"')
            return { ok, reason: ok ? 'loaded' : 'not-loaded' }
          }),
        {
          timeout: 10_000,
          intervals: [250, 500, 1000],
        }
      )
      .toEqual({ ok: true, reason: 'loaded' })
  })

  test('configures Inter as the default body font (Tailwind v4 CSS variable)', async ({ page }) => {
    await page.goto('/')

    const sansFont = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--font-sans').trim()
    )
    expect(sansFont).toContain('Inter')

    // Confirm that Inter font faces were generated (provider integration is active).
    const hasInterFontFace = await page.evaluate(() =>
      Array.from(document.styleSheets).some((sheet) => {
        try {
          return Array.from(sheet.cssRules).some(
            (rule) =>
              rule.type === CSSRule.FONT_FACE_RULE &&
              (rule as CSSFontFaceRule).style.getPropertyValue('font-family').includes('Inter')
          )
        } catch {
          // Cross-origin stylesheets can throw; ignore those.
          return false
        }
      })
    )
    expect(hasInterFontFace).toBe(true)
  })
})



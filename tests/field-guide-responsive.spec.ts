import { expect, test, type Page, type TestInfo } from '@playwright/test'

const viewportWidths = [320, 768, 1280, 1536]
const screenshotWidths = [320, 768, 1440]

async function expectCampaignFitsViewport(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth === document.documentElement.clientWidth)).toBe(true)
  await expect(page.getByRole('link', { name: /get the field guide/i }).first()).toBeVisible()
  await expect(page.getByRole('button', { name: /open the field guide page preview/i })).toBeVisible()
  await expect(page.getByRole('button', { name: /show previous preview page/i }).first()).toBeVisible()
  await expect(page.getByRole('button', { name: /show next preview page/i }).first()).toBeVisible()

  const book = page.locator('.interactive-book')
  await book.evaluate((element) => element.scrollIntoView({ block: 'center', inline: 'center' }))
  const bookBox = await book.boundingBox()
  expect(bookBox?.width).toBeGreaterThan(0)
  expect(bookBox?.height).toBeGreaterThan(0)
  expect(bookBox?.x).toBeGreaterThanOrEqual(0)
  expect((bookBox?.x ?? 0) + (bookBox?.width ?? 0)).toBeLessThanOrEqual(await page.evaluate(() => window.innerWidth))
  expect(bookBox?.y).toBeGreaterThanOrEqual(0)
  expect((bookBox?.y ?? 0) + (bookBox?.height ?? 0)).toBeLessThanOrEqual(await page.evaluate(() => window.innerHeight))

  const tiers = page.locator('.field-guide-tier')
  await expect(tiers).toHaveCount(2)
  for (const tier of await tiers.all()) await expect(tier).toBeVisible()

  expect(await tiers.evaluateAll((tierElements) => tierElements.every((tier) => {
    const tierBox = tier.getBoundingClientRect()
    if (tierBox.width <= 0 || tierBox.height <= 0) return false
    return Array.from(tier.querySelectorAll<HTMLElement>('p, li, button')).every((element) => {
      const box = element.getBoundingClientRect()
      return box.left >= tierBox.left - 1
        && box.right <= tierBox.right + 1
        && box.top >= tierBox.top - 1
        && box.bottom <= tierBox.bottom + 1
    })
  }))).toBe(true)

  const tiersOverlap = await tiers.evaluateAll((tierElements) => {
    const boxes = tierElements.map((tier) => tier.getBoundingClientRect())
    return boxes.some((box, index) => boxes.slice(index + 1).some((other) =>
      box.left < other.right && box.right > other.left && box.top < other.bottom && box.bottom > other.top,
    ))
  })
  expect(tiersOverlap).toBe(false)
}

async function swipePreviewThenUseArrow(page: Page) {
  const preview = page.locator('.field-guide-preview-page')

  await page.getByRole('button', { name: /pages 24-25: method and the commander/i }).click()
  await preview.evaluate((element) => {
    const target = element as HTMLElement
    const start = new Touch({ identifier: 1, target, clientX: 240, clientY: 180 })
    const end = new Touch({ identifier: 1, target, clientX: 120, clientY: 190 })

    target.dispatchEvent(new TouchEvent('touchstart', { bubbles: true, cancelable: true, changedTouches: [start] }))
    target.dispatchEvent(new TouchEvent('touchend', { bubbles: true, cancelable: true, changedTouches: [end] }))
  })

  await expect(page.getByText(/2 of 7/i).first()).toBeVisible()
  await page.getByRole('button', { name: /show next preview page/i }).first().click()
  await expect(page.getByText(/3 of 7/i).first()).toBeVisible()
}

test('Field Guide remains contained and operable at every supported width', async ({ page }) => {
  for (const width of viewportWidths) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/field-guide')
    await expectCampaignFitsViewport(page)
  }
})

test('Field Guide mobile preview supports keyboard navigation and arrows after a swipe', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 })
  await page.goto('/field-guide')

  const book = page.getByRole('button', { name: /open the field guide page preview/i })
  await book.focus()
  await page.keyboard.press('Enter')
  await expect(page.locator('.field-guide-preview-dialog.is-inline')).toBeVisible()
  await page.keyboard.press('ArrowRight')
  await expect(page.getByText(/2 of 7/i).last()).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.locator('.field-guide-preview-dialog')).toBeHidden()
  await expect(book).toBeFocused()

  await swipePreviewThenUseArrow(page)
})

test('Field Guide Selected pages target clears the fixed navigation after fresh-page scroll and direct hash navigation', async ({ page }) => {
  for (const width of [320, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/field-guide')
    await page.evaluate(() => window.scrollTo(0, 0))
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)

    const previewLink = page.getByRole('link', { name: /read sample spreads/i })
    const previewTarget = page.locator('#field-guide-preview')
    const previewHeading = page.getByRole('heading', { name: /seven real spreads from the finished book/i })
    await expect(previewLink).toHaveAttribute('href', '#field-guide-preview')
    await previewLink.click()
    const navBottom = await page.locator('nav.fixed').evaluate((nav) => nav.getBoundingClientRect().bottom)
    expect(await previewHeading.evaluate((heading) => heading.getBoundingClientRect().top)).toBeGreaterThanOrEqual(navBottom)

    await page.goto('/field-guide#field-guide-preview')
    await expect(previewTarget).toBeVisible()
    const hashNavBottom = await page.locator('nav.fixed').evaluate((nav) => nav.getBoundingClientRect().bottom)
    expect(await previewHeading.evaluate((heading) => heading.getBoundingClientRect().top)).toBeGreaterThanOrEqual(hashNavBottom)
  }
})

test('Field Guide captures desktop, tablet, and mobile campaign screenshots', async ({ page }, testInfo: TestInfo) => {
  for (const width of screenshotWidths) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/field-guide')
    await page.evaluate(() => window.scrollTo(0, 0))
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
    const previewLink = page.getByRole('link', { name: /read sample spreads/i })
    const previewTarget = page.locator('#field-guide-preview')
    const previewHeading = page.getByRole('heading', { name: /seven real spreads from the finished book/i })
    await expect(previewLink).toHaveAttribute('href', '#field-guide-preview')
    await previewLink.click()
    const navBottom = await page.locator('nav.fixed').evaluate((nav) => nav.getBoundingClientRect().bottom)
    expect(await previewHeading.evaluate((heading) => heading.getBoundingClientRect().top)).toBeGreaterThanOrEqual(navBottom)
    await expect(page.locator('.field-guide-preview-thumbnails img[loading="lazy"]')).toHaveCount(14)
    expect(await page.locator('.field-guide-preview-thumbnails img').evaluateAll((images) =>
      images.every((image) => image.hasAttribute('width') && image.hasAttribute('height')),
    )).toBe(true)
    await page.screenshot({ path: testInfo.outputPath(`field-guide-${width}.png`) })
  }
})

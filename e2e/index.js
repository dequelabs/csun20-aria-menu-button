import { runAxe } from './helpers/axe'
const sleep = t =>
  new Promise(resolve => setTimeout(resolve, t))

describe('global', () => {
  test('manages focus on route transition', async () => {
    await page.goto('http://localhost:1234/')
    await page.waitForSelector('[role="main"]')
    await page.click("[role='menubar'] li:nth-of-type(2) a")
    await sleep(500)
    const mainIsFocused = await page.evaluate(
      () =>
        document.activeElement ===
        document.querySelector('[role="main"]')
    )

    expect(mainIsFocused).toBe(true)
  })

  test('skip link focuses main', async () => {
    await page.goto('http://localhost:1234/')
    await page.waitForSelector('[role="main"]')
    await page.focus('.dqpl-skip-link')
    await page.click('.dqpl-skip-link')
    const mainIsFocused = await page.evaluate(
      () =>
        document.activeElement ===
        document.querySelector('[role="main"]')
    )

    expect(mainIsFocused).toBe(true)
  })
})

describe('home page', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:1234/')
    await page.waitForSelector('.Wrap')
  })
  describe('default state', () => {
    test('is #axeClean', async () => {
      const results = await runAxe(page)
      expect(results.violations).toHaveLength(0)
    })
  })

  describe('footer', () => {
    test('hovered links are #axeClean', async () => {
      await page.hover('footer a')
      const results = await runAxe(page, {
        context: 'footer'
      })
      expect(results.violations).toHaveLength(0)
    })

    test('focused links are #axeClean', async () => {
      await page.focus('footer a')
      const results = await runAxe(page, {
        context: 'footer'
      })
      expect(results.violations).toHaveLength(0)
    })
  })
})

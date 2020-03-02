import { runAxe } from './helpers/axe'
const sleep = t =>
  new Promise(resolve => setTimeout(resolve, t))

afterEach(async () => {
  const results = await runAxe(page)
  expect(results.violations).toHaveLength(0)
})

describe('global', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:1234/')
    await page.waitForSelector('[role="main"]')
  })

  test('manages focus on route transition', async () => {
    await page.click("[role='menubar'] li:nth-of-type(2) a")
    await sleep(500)
    const mainIsFocused = await page.evaluate(
      () =>
        document.activeElement ===
        document.querySelector('[role="main"]')
    )

    expect(mainIsFocused).toBe(true)
  })

  test('clicking skip link focuses main', async () => {
    await page.focus('.dqpl-skip-link') // make it visible so we can click it
    await page.click('.dqpl-skip-link')
    const mainIsFocused = await page.evaluate(
      () =>
        document.activeElement ===
        document.querySelector('[role="main"]')
    )

    expect(mainIsFocused).toBe(true)
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

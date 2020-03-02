import { runAxe } from './helpers/axe'

describe('home page', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:1234/')
    await page.waitForSelector('.Wrap')
  })

  test('is #axeClean in default state', async () => {
    const results = await runAxe(page)
    expect(results.violations).toHaveLength(0)
  })

  describe('Action log', () => {
    afterEach(async () => {
      const results = await runAxe(page)
      expect(results.violations).toHaveLength(0)
    })

    test('scrollable log element has the "log" role', async () => {
      const hasLogRole = await page.evaluate(
        () =>
          !!document.querySelector(
            '.dqpl-tile [role="log"]'
          )
      )

      expect(hasLogRole).toBe(true)
    })

    test('scrollable log element is focusable', async () => {
      const isFocusable = await page.evaluate(
        () =>
          document.querySelector('.dqpl-tile [role="log"]')
            .tabIndex === 0
      )
      expect(isFocusable).toBe(true)
    })

    test('log gets populated with performed actions', async () => {
      // open the menu
      await page.click('.MenuButton button')
      // click "action 1"
      await page.click(
        '.MenuButton [role="menuitem"]:nth-of-type(1)'
      )
      // reopen the menu
      await page.click('.MenuButton button')
      // click "action 2"
      await page.click(
        '.MenuButton [role="menuitem"]:nth-of-type(2)'
      )
      // reopen the menu
      await page.click('.MenuButton button')
      // click "action 1"
      await page.click(
        '.MenuButton [role="menuitem"]:nth-of-type(1)'
      )
      const hasExpectedItems = await page.evaluate(() => {
        const items = [
          ...document.querySelectorAll('[role="log"] li')
        ]
        const [item1, item2, item3] = items
        return (
          items.length === 3 &&
          item1.innerText === 'action 1' &&
          item2.innerText === 'action 2' &&
          item3.innerText === 'action 1'
        )
      })

      expect(hasExpectedItems).toBe(true)
    })

    test('clicking clear log clears the log', async () => {
      const hasLogText = () => {
        return !!document.querySelector('[role="log"]')
          .innerText
      }
      // open the menu
      await page.click('.MenuButton button')
      // click "action 1" to populate log
      await page.click(
        '.MenuButton [role="menuitem"]:nth-of-type(1)'
      )
      const hasTextBeforeClear = await page.evaluate(
        hasLogText
      )
      expect(hasTextBeforeClear).toBe(true)
      // click "CLEAR LOG"
      await page.click('.Clear')
      const hasTextAfterClear = await page.evaluate(
        hasLogText
      )
      expect(hasTextAfterClear).toBe(false)
    })
  })
})

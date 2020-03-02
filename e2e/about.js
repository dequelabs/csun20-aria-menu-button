import { runAxe } from './helpers/axe'

const sleep = t =>
  new Promise(resolve => setTimeout(resolve, t))

describe('about page', () => {
  test('is #axeClean in default state (which is the only state)', async () => {
    await page.goto('http://localhost:1234/')
    await page.click('a[href="/about"]')
    await sleep(500) // waitForNavigation is being a jerk...
    await page.waitForSelector('.Wrap')
    const results = await runAxe(page)
    expect(results.violations).toHaveLength(0)
  })
})

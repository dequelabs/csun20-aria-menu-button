import { runAxe } from './helpers/axe'
const sleep = t =>
  new Promise(resolve => setTimeout(resolve, t))

describe('Contact page', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:1234/')
    await page.click('a[href="/contact"]')
    await sleep(500) // waitForNavigation is being a jerk...
    await page.waitForSelector('.ContactActions')
  })

  describe('default state', () => {
    test('default state is #axeClean', async () => {
      const results = await runAxe(page)
      expect(results.violations).toHaveLength(0)
    })
  })

  describe('form states', () => {
    afterEach(async () => {
      const results = await runAxe(page)
      expect(results.violations).toHaveLength(0)
    })

    describe('Clear form', () => {
      test('clears the form inputs', async () => {
        await page.type('#subject', 'Hello')
        await page.type('#message', 'World')
        await page.click('.ContactActions button') // open menu
        await page.click(
          '[role="menu"] [role="menuitem"]:nth-of-type(2)'
        )
        await sleep(200)
        const formIsEmpty = await page.evaluate(() => {
          const subjectEmpty = !document.getElementById(
            'subject'
          ).value
          const messageEmpty = !document.getElementById(
            'message'
          ).value

          return subjectEmpty && messageEmpty
        })

        expect(formIsEmpty).toBe(true)
      })

      test('focuses the subject field', async () => {
        await page.click('.ContactActions button') // open menu
        await page.click(
          '[role="menu"] [role="menuitem"]:nth-of-type(2)'
        )
        await sleep(200)
        const subjectIsFocused = await page.evaluate(() => {
          return (
            document.activeElement ===
            document.getElementById('subject')
          )
        })

        expect(subjectIsFocused).toBe(true)
      })
    })

    describe('validation', () => {
      beforeAll(async () => {
        await page.evaluate(() => {
          document.getElementById('subject').value = ''
          document.getElementById('message').value = ''
        })
        await page.click('button[type="submit"]')
      })

      test('sets aria-invalid', async () => {
        const invalids = await page.$$(
          '[aria-invalid="true"]'
        )
        expect(invalids.length).toBe(2)
      })

      test('associates error message with input', async () => {
        const errorMessagesAssociated = await page.evaluate(
          () => {
            const [msg1, msg2] = [
              ...document.querySelectorAll(
                '.dqpl-error-wrap'
              )
            ]
            const subject = document.getElementById(
              'subject'
            )
            const message = document.getElementById(
              'message'
            )
            return (
              subject
                .getAttribute('aria-describedby')
                .includes(msg1.id) &&
              message
                .getAttribute('aria-describedby')
                .includes(msg2.id)
            )
          }
        )

        expect(errorMessagesAssociated).toBe(true)
      })

      test('focuses first erroneous input', async () => {
        const subjectIsFocused = await page.evaluate(() => {
          return (
            document.activeElement ===
            document.getElementById('subject')
          )
        })

        expect(subjectIsFocused).toBe(true)
      })
    })

    describe('Save draft', () => {
      beforeAll(async () => {
        await page.evaluate(() => {
          document.getElementById('subject').value = ''
          document.getElementById('message').value = ''
        })
        await page.type('#subject', 'Hello')
        await page.type('#message', 'World')
        await page.click('.ContactActions button') // open menu
        await page.click(
          '[role="menu"] [role="menuitem"]:nth-of-type(1)'
        ) // click "Save draft" menuitem
      })

      test('test adds draft to "Saved Drafts" section', async () => {
        const hasDraft = await page.evaluate(() => {
          const items = [
            ...document.querySelectorAll('.Drafts li')
          ]

          return items.length === 1
        })

        expect(hasDraft).toBe(true)
      })

      test('focuses the drafts section', async () => {
        const draftsIsFocused = await page.evaluate(() => {
          return (
            document.activeElement ===
            document.querySelector('.Drafts')
          )
        })

        expect(draftsIsFocused).toBe(true)
      })
    })
  })
})

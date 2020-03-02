const fs = require('fs')

async function injectAxe(page) {
  const axeContents = await new Promise(
    (resolve, reject) => {
      fs.readFile(
        require.resolve('axe-core/axe.min.js'),
        'utf8',
        (err, contents) => {
          if (err) {
            reject(err)
          }

          resolve(contents)
        }
      )
    }
  )
  await page.evaluate(axeContents)
}

async function runAxe(page, options = {}) {
  const {
    tags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
    ...otherOptions
  } = options
  const hasAxe = await page.evaluate(
    () => typeof window.axe !== 'undefined'
  )

  if (!hasAxe) {
    await injectAxe(page)
  }

  const axeResults = await page.evaluate(
    async ({ tags, otherOptions }) => {
      const axe = window.axe
      return axe.run({
        runOnly: tags,
        ...otherOptions
      })
    },
    { tags, otherOptions }
  )

  return axeResults
}

module.exports = {
  injectAxe,
  runAxe
}

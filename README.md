# Using Automation to Test UI Components for Accessibility During Development

## `whoami`

:wave: Hi, I'm Harris Schneiderman! I am the Principal UI Engineer at Deque Systems. I am also a member of the W3C ARIA Working Group.

- :octocat: [schne324](https://github.com/schne324)
- :bird: [@theHarrisius](https://twitter.com/theHarrisius)

## What we're going to cover today...

1. Test Driven Development
1. Gathering requirements for the menu button component
1. Writing unit tests
1. Implementing accessible menu button
1. Adding accessibility automation libraries

   - [jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y#readme)
   - [axe-core](https://github.com/dequelabs/axe-core)

1. Using our component in an app
1. End to end tests
1. Tying it all together (ci/cd)

## Test Driven Development (TDD)

1. Write test cases for desired behavior/functionality
1. Tests fail :red_circle:
1. Implement desired behavior/functionality
1. Tests pass :white_check_mark:

## Gathering requirements

- [ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/)
- [A working menu button example](https://www.w3.org/TR/wai-aria-practices-1.1/examples/menu-button/menu-button-actions.html)
- [A literal list of accessibility requirements](https://www.w3.org/TR/wai-aria-practices-1.1/examples/menu-button/menu-button-actions.html#kbd_label)

_:point_up: this gives us everything we need to write some unit tests!_

## Writing unit tests

Using the requirements we've gathered, we can easily write each test case.

### Example

```js
describe('menu button trigger', () => {
  describe('keyboard interaction', () => {
    describe('down arrow', () => {
      test.todo(
        'Opens menu and moves focus to first menuitem'
      )
    })

    describe('up arrow', () => {
      test.todo(
        'Opens menu and moves focus to last menuitem'
      )
    })
  })
})
```

### Seeing the `todos` in action

```sh
$ git checkout origin/todos
$ yarn test
```

### Actual test implementations

Now that we've got our test cases, we can start implementing the tests. Since we're following some sort of TDD here, we expect all tests to fail initially.

```js
describe('menu button trigger', () => {
  describe('keyboard interaction', () => {
    describe('down arrow', () => {
      test('Opens menu and moves focus to first menuitem', () => {
        const wrapper = mountWrapper()
        // fire a down arrow key on the button
        wrapper.find('button').simulate('keydown', {
          key: 'ArrowDown'
        })
        // assert that focus has been moved to the first menuitem
        expect(document.activeElement).toBe(
          wrapper
            .find('[role="menuitem"]')
            .at(0)
            .getDOMNode()
        )
      })
    })

    describe('up arrow', () => {
      test('Opens menu and moves focus to last menuitem', () => {
        const wrapper = mountWrapper()
        // fire an up arrow on the button
        wrapper.find('button').simulate('keydown', {
          key: 'ArrowUp'
        })
        // assert that focus has been moved to the last menu item
        expect(document.activeElement).toBe(
          wrapper
            .find('[role="menuitem"]')
            .at(2)
            .getDOMNode()
        )
      })
    })
  })
})
```

### Seeing the failing tests in action

```sh
$ git checkout origin/failing
$ yarn test
```

## Implementing the `<MenuButton />` component

Now that we've gathered requirements and written unit tests, we have all of our requirements nicely broken down and organized. This makes the implementation very easy!

We know we are "done" when all test tests pass.

```sh
$ git checkout origin/passing
$ yarn test
```

## Adding accessibility automation libraries

> Huh!?!

A11y automation libraries are really any library which automates accessibility tests. This is usually a static analyzer, like a linter, or something that runs on a whole document or context.

- basic inting: analyzing code for potential issues. (eslint, jshint, jslint, etc.)
  ```js
  var foo = document.getElementById('foo')
  fo.click() // lint will yell about "fo" not being defined
  ```
- jsx-a11y: accessibility-specific rules for writing react/jsx
  ```js
  <div role="bananas" /> // jsx-a11y will yell about "bananas" not being a valid role
  ```

_[view eslint-plugin-jsx-a11y on github](https://github.com/evcohen/eslint-plugin-jsx-a11y)_

### Adding axe-core

Let's add another accessibility automation tool! axe is an accessibility rules engine which will analyze my components for accessibility violations.

```js
import 'jest-axe/extend-expect'
import { axe } from 'jest-axe'
import { mount } from 'enzyme'

test('<MenuButton /> is #axeClean', async () => {
  const menuButton = mount(<MenuButton />)
  expect(await axe(menuButton.html())).toHaveNoViolations()
})
```

```sh
$ git checkout origin/passing-with-axe
$ yarn test
```

**:spiral_notepad: NOTE:** automated tests (unit, e2e, etc..) inherently get your components/app into its various states which is a perfect time to run accessibility checks!

## Demo App

Let's see our `<MenuButton />` in action in our demo app!

```sh
$ git checkout master
$ yarn dev
```

## End to end tests

We've covered our menu button component quite nicely with our unit tests, but what about how we've tied it into various pieces of our actual application?

Sure...the unit tests _can_ give us some good coverage there but end-to-end tests are great for testing how nicely our components play with eachother.

In our e2e tests, we will spin our demo app up in a (headless) chrome browser via [puppeteer](https://github.com/puppeteer/puppeteer) and ensure things work as expected. This will be a very good time to have axe-core check our app out for things like color contrast issues, links without text, `aria-*` misuse and more.

```sh
$ yarn test:e2e
```

## Tying it all together now

We've just gone through some serious testing and linting but how do we prevent a11y defects from leaking into the codebase in the future??!?

Having your CI, or "Continuous Integration" run these checks for you whenever you push your code will help catch these as early on the in software development process as possible!

- > I will NOT merge this PR until all a11y defects have been addressed!
- > No :clap: merge :clap: til :clap: #axeClean :clap:

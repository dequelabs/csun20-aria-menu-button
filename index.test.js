import React from 'react'
import { mount } from 'enzyme'
import MenuButton from './'

let wrapper
const mountWrapper = (overrides = {}) =>
  mount(
    <MenuButton
      buttonContent="Actions"
      items={[
        { children: <span>action 1</span> },
        { children: <span>action 2</span> },
        { children: <span>action 3</span> }
      ]}
      onSelection={() => {}}
      {...overrides}
    />
  )

describe('menu button trigger', () => {
  describe('keyboard interaction', () => {
    describe('down arrow', () => {
      test('Opens menu and moves focus to first menuitem', () => {
        wrapper = mountWrapper()
        wrapper.find('button').simulate('keydown', {
          key: 'ArrowDown'
        })
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
        wrapper = mountWrapper()
        wrapper.find('button').simulate('keydown', {
          key: 'ArrowUp'
        })
        expect(document.activeElement).toBe(
          wrapper
            .find('[role="menuitem"]')
            .at(2)
            .getDOMNode()
        )
      })
    })
  })

  describe('roles/states/properties', () => {
    test('The element that opens the menu has role button.', () => {
      wrapper = mountWrapper()
      expect(
        wrapper.find('button').exists() ||
          wrapper.find('[role=button]').exists()
      ).toBe(true)
    })

    test('The element with role button has aria-haspopup set to either menu or true.', () => {
      wrapper = mountWrapper()
      const button = wrapper.find('button')
      expect(
        button.is('[aria-haspopup="true"]') ||
          button.is('[aria-haspopup="menu"]')
      ).toBe(true)
    })

    test('When the menu is displayed, the element with role button has aria-expanded set to true', () => {
      wrapper = mountWrapper()
      const button = wrapper.find('button')
      button.simulate('click')
      const value = button
        .getDOMNode()
        .getAttribute('aria-expanded')
      expect(value).toBe('true')
    })

    test('When the menu is not displayed, the element with role button has aria-expanded set to false', () => {
      wrapper = mountWrapper()
      const button = wrapper.find('button')
      const value = button
        .getDOMNode()
        .getAttribute('aria-expanded')
      expect(value).toBe('false')
    })

    test('button has a value specified for aria-controls that refers to the element with role menu.', () => {
      wrapper = mountWrapper()
      const button = wrapper.find('button').getDOMNode()
      const menu = wrapper
        .find('[role="menu"]')
        .getDOMNode()

      expect(button.getAttribute('aria-controls')).toBe(
        menu.id
      )
    })
  })
})

describe('menu button menu', () => {
  describe('keyboard interaction', () => {
    describe('Enter', () => {
      test('Activates the menu item / Closes the menu. / Sets focus on the menu button', () => {
        const onSelection = jest.fn()
        wrapper = mountWrapper({
          onSelection
        })
        const button = wrapper.find('button').getDOMNode()
        wrapper.find('button').simulate('click') // open the menu
        wrapper.find('[role="menu"]').simulate('keydown', {
          key: 'Enter',
          target: wrapper
            .find('[role="menuitem"]')
            .at(0)
            .getDOMNode()
        })
        expect(onSelection).toHaveBeenCalled()
        expect(button.getAttribute('aria-expanded')).toBe(
          'false'
        )
        expect(document.activeElement).toBe(button)
      })
    })

    describe('Escape', () => {
      test('Closes the menu / Sets focus to the menu button', () => {
        wrapper = mountWrapper()
        const button = wrapper.find('button')
        button.simulate('click') // open the menu
        wrapper.find('[role="menu"]').simulate('keydown', {
          key: 'Escape'
        })
        expect(
          button.getDOMNode().getAttribute('aria-expanded')
        ).toBe('false')
        expect(document.activeElement).toBe(
          button.getDOMNode()
        )
      })
    })

    describe('Up arrow', () => {
      test('Moves focus to the previous menu item', () => {
        wrapper = mountWrapper()
        const button = wrapper.find('button')
        button.simulate('click') // open the menu
        wrapper.setState({
          focusIndex: 1
        })
        wrapper.find('[role="menu"]').simulate('keydown', {
          key: 'ArrowUp'
        })
        expect(document.activeElement).toBe(
          wrapper
            .find('[role="menuitem"]')
            .at(0)
            .getDOMNode()
        )
      })

      test('If focus is on the first menu item, moves focus to the last menu item', () => {
        wrapper = mountWrapper()
        const button = wrapper.find('button')
        button.simulate('click') // open the menu
        wrapper.setState({
          focusIndex: 0
        })
        wrapper.find('[role="menu"]').simulate('keydown', {
          key: 'ArrowUp'
        })
        expect(document.activeElement).toBe(
          wrapper
            .find('[role="menuitem"]')
            .at(2)
            .getDOMNode()
        )
      })
    })

    describe('Down arrow', () => {
      test('Moves focus to the next menu item', () => {
        wrapper = mountWrapper()
        const button = wrapper.find('button')
        button.simulate('click') // open the menu
        wrapper.setState({
          focusIndex: 0
        })
        wrapper.find('[role="menu"]').simulate('keydown', {
          key: 'ArrowDown'
        })
        expect(document.activeElement).toBe(
          wrapper
            .find('[role="menuitem"]')
            .at(1)
            .getDOMNode()
        )
      })

      test('If focus is on the last menu item, moves focus to the first menu item', () => {
        wrapper = mountWrapper()
        const button = wrapper.find('button')
        button.simulate('click') // open the menu
        wrapper.setState({
          focusIndex: 2
        })
        wrapper.find('[role="menu"]').simulate('keydown', {
          key: 'ArrowDown'
        })
        expect(document.activeElement).toBe(
          wrapper
            .find('[role="menuitem"]')
            .at(0)
            .getDOMNode()
        )
      })
    })

    describe('Home', () => {
      test('Moves focus to the first menu item', () => {
        wrapper = mountWrapper()
        const button = wrapper.find('button')
        button.simulate('click') // open the menu
        wrapper.find('[role="menu"]').simulate('keydown', {
          key: 'ArrowDown'
        })
        wrapper.find('[role="menu"]').simulate('keydown', {
          key: 'Home'
        })
        expect(document.activeElement).toBe(
          wrapper
            .find('[role="menuitem"]')
            .at(0)
            .getDOMNode()
        )
      })
    })

    describe('End', () => {
      test('Moves focus to the first menu item', () => {
        wrapper = mountWrapper()
        const button = wrapper.find('button')
        button.simulate('click') // open the menu
        wrapper.find('[role="menu"]').simulate('keydown', {
          key: 'End'
        })
        expect(document.activeElement).toBe(
          wrapper
            .find('[role="menuitem"]')
            .at(2)
            .getDOMNode()
        )
      })
    })

    describe('Tab', () => {
      test('Closes the menu', () => {
        wrapper = mountWrapper()
        const button = wrapper.find('button')
        button.simulate('click') // open the menu
        wrapper.find('[role="menu"]').simulate('keydown', {
          key: 'Tab'
        })
        expect(
          button.getDOMNode().getAttribute('aria-expanded')
        ).toBe('false')
      })
    })
  })

  describe('roles/states/properties', () => {
    test('has role="menu"', () => {
      expect(
        mountWrapper()
          .find('[role="menu"]')
          .exists()
      ).toBe(true)
    })

    test('The menu is labeled by the menu button.', () => {
      wrapper = mountWrapper()
      const button = wrapper.find('button').getDOMNode()
      const menu = wrapper
        .find('[role="menu"]')
        .getDOMNode()

      expect(menu.getAttribute('aria-labelledby')).toBe(
        button.id
      )
    })

    test('children have role="menuitem"', () => {
      mountWrapper()
        .find('[role="menu"]')
        .children()
        .forEach(child => {
          expect(
            child.getDOMNode().getAttribute('role')
          ).toBe('menuitem')
        })
    })

    test('children have tabIndex={-1}', () => {
      mountWrapper()
        .find('[role="menu"]')
        .children()
        .forEach(child => {
          expect(child.getDOMNode().tabIndex).toBe(-1)
        })
    })
  })
})

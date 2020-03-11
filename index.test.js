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

  describe('roles/states/properties', () => {
    test.todo(
      'The element that opens the menu has role button.'
    )

    test.todo(
      'The element with role button has aria-haspopup set to either menu or true.'
    )

    test.todo(
      'When the menu is displayed, the element with role button has aria-expanded set to true'
    )

    test.todo(
      'When the menu is not displayed, the element with role button has aria-expanded set to false'
    )

    test.todo(
      'button has a value specified for aria-controls that refers to the element with role menu.'
    )
  })
})

describe('menu button menu', () => {
  describe('keyboard interaction', () => {
    describe('Enter', () => {
      test.todo(
        'Activates the menu item / Closes the menu. / Sets focus on the menu button'
      )

      describe('Escape', () => {
        test.todo(
          'Closes the menu / Sets focus to the menu button'
        )
      })

      describe('Up arrow', () => {
        test.todo('Moves focus to the previous menu item')
        test.todo(
          'If focus is on the first menu item, moves focus to the last menu item'
        )
      })

      describe('Down arrow', () => {
        test.todo('Moves focus to the next menu item')
        test.todo(
          'If focus is on the last menu item, moves focus to the first menu item'
        )
      })

      describe('Home', () => {
        test.todo('Moves focus to the first menu item')
      })

      describe('End', () => {
        test.todo('Moves focus to the first menu item')
      })

      describe('Tab', () => {
        test.todo('Closes the menu')
      })
    })

    describe('roles/states/properties', () => {
      test.todo('has role="menu"')
      test.todo('The menu is labeled by the menu button.')
      test.todo('children have role="menuitem"')
      test.todo('children have tabIndex={-1}')
    })
  })
})

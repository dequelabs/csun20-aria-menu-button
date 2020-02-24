import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.css'

let idIndex = 0
export default class MenuButton extends Component {
  static propTypes = {
    buttonContent: PropTypes.node.isRequired,
    items: PropTypes.array.isRequired,
    onSelection: PropTypes.func.isRequired
  }
  state = {
    expanded: false,
    focusIndex: null
  }
  // TODO: use something better/guaranteed to be unique
  idSuffix = `MenuButton-${idIndex++}`
  menuItemRefs = []

  focusItem = index => {
    if (!this.menuItemRefs[index]) {
      return
    }

    this.setState(
      {
        focusIndex: index
      },
      () => {
        this.menuItemRefs[index].focus()
      }
    )
  }

  toggleExpanded = cb => {
    this.setState(
      {
        expanded: !this.state.expanded,
        focusIndex: this.state.expanded
          ? null
          : this.state.focusIndex
      },
      cb
    )
  }

  onButtonClick = () => {
    this.toggleExpanded(() => {
      this.focusItem(0)
    })
  }

  onButtonKeyDown = e => {
    const { key } = e
    if (key !== 'ArrowDown' && key !== 'ArrowUp') {
      return
    }

    e.preventDefault()
    this.toggleExpanded(() => {
      this.focusItem(
        key === 'ArrowDown'
          ? 0
          : this.menuItemRefs.length - 1
      )
    })
  }

  onMenuClick = e => {
    const item = this.menuItemRefs.find(menuItem =>
      menuItem.contains(e.target)
    )

    if (!item) {
      return
    }
    this.props.onSelection(item)
    this.toggleExpanded(() => this.button.focus())
  }

  onMenuKeyDown = e => {
    const { key } = e
    switch (key) {
      case 'Escape':
        this.toggleExpanded(() => {
          this.button.focus()
        })
        break

      case 'ArrowDown':
        this.focusItem(
          this.state.focusIndex ===
            this.menuItemRefs.length - 1
            ? 0
            : this.state.focusIndex + 1
        )
        break
      case 'ArrowUp':
        this.focusItem(
          this.state.focusIndex === 0
            ? this.menuItemRefs.length - 1
            : this.state.focusIndex - 1
        )
        break
      case 'Tab':
        this.toggleExpanded()
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        this.onMenuClick(e)
        break
      case 'Home':
        e.preventDefault()
        this.focusItem(0)
        break
      case 'End':
        e.preventDefault()
        this.focusItem(this.menuItemRefs.length - 1)
        break
    }
  }

  render() {
    const { expanded } = this.state
    const { items, buttonContent } = this.props
    const buttonId = `trigger-${this.idSuffix}`
    const menuId = `menu-${this.idSuffix}`
    this.menuItemRefs = [] // reset to avoid stale refs

    return (
      <div className="MenuButton">
        <button
          type="button"
          id={buttonId}
          aria-expanded={expanded}
          aria-haspopup="true"
          aria-controls={menuId}
          onClick={this.onButtonClick}
          onKeyDown={this.onButtonKeyDown}
          ref={el => (this.button = el)}
        >
          {buttonContent}
        </button>
        <ul
          id={menuId}
          aria-labelledby={buttonId}
          role="menu"
          onClick={this.onMenuClick}
          onKeyDown={this.onMenuKeyDown}
        >
          {items.map((itemProps, i) => (
            <MenuItem
              menuItemRef={el =>
                (this.menuItemRefs[i] = el)
              }
              key={i}
              {...itemProps}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export const MenuItem = ({ menuItemRef, ...props }) => (
  <li
    ref={menuItemRef}
    role="menuitem"
    tabIndex={-1}
    {...props}
  />
)
MenuItem.displayName = 'MenuItem'
MenuItem.propTypes = {
  menuItemRef: PropTypes.func
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.css'

export default class MenuButton extends Component {
  static propTypes = {
    buttonContent: PropTypes.node.isRequired,
    items: PropTypes.array.isRequired,
    onSelection: PropTypes.func.isRequired,
    className: PropTypes.string
  }
  state = {
    expanded: false,
    focusIndex: null
  }

  render() {
    return <div />
  }
}

export const MenuItem = () => null
MenuItem.displayName = 'MenuItem'
MenuItem.propTypes = {
  menuItemRef: PropTypes.func
}

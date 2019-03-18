import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { setScreen } from "../actions/nav";

class Nav extends Component {
  handleItemClick = (e) => {
    //e.preventDefault()

    const { dispatch } = this.props

    dispatch(setScreen('home'))
  }
  render() {
    const { activeScreen } = this.props
    return (
      <Menu.Item 
        name={'home'}
        active={activeScreen === 'home'}
        onClick={(e) => this.handleItemClick(e)}
        as={Link} to='/home'
      >
      </Menu.Item>
    )
  }
}

function mapStateToProps({ categories, activeScreen }, { id }) {
  const category = categories[id]
  return {
      category,
      activeScreen
  }
}

export default connect(mapStateToProps)(Nav)
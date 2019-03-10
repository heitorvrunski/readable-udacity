import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { setScreen } from '../actions/nav'

class Category extends Component {

    handleItemClick = (e) => {
        //e.preventDefault()

        const { dispatch, category } = this.props

        dispatch(setScreen(category.name))
    }

    render() {
        const { category, activeScreen } = this.props
        if (category === null) {
            return <p>These categories doesn`t exist</p>
        }
        const { name, path } = category
        return (

            <Menu.Item
                name={name}
                active={activeScreen === name}
                onClick={(e) => this.handleItemClick(e)}
                as={Link}
                to={`/${path}`}
            >
            </Menu.Item>


        )
    }
}

function mapStateToProps({ categories, activeScreen }, { id }) {
    const category = categories[id]
    return {
        category: category,
        activeScreen
    }
}

export default connect(mapStateToProps)(Category)
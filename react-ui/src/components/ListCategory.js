import React, { Component } from 'react'
import { connect } from 'react-redux'
import Category from './Category'
import { Menu } from 'semantic-ui-react'
import Nav from './Nav'
import { setScreen } from '../actions/nav'
import { Link } from 'react-router-dom'
import { fetchCategories } from '../actions/category'

class ListCategory extends Component {
    componentWillMount() {
        const { category } = this.props.match.params
        const { dispatch } = this.props
        dispatch(fetchCategories())
        if (category)
            dispatch(setScreen(category))
    }
    handleItemClick = (e) => {
        //e.preventDefault()
        const { dispatch } = this.props
        dispatch(setScreen('new'))
    }
    render() {
        const { activeScreen } = this.props
        return (
            <Menu inverted color='blue'>
                <Nav />
                {this.props.categoriesIds.map((id) => (
                    <Category key={id} id={id} />
                ))}
                <Menu.Menu position='right'>
                    <Menu.Item
                        name='new'
                        active={activeScreen === 'new'}
                        onClick={(e) => this.handleItemClick(e)}
                        as={Link}
                        to='/new'>
                        New Post
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
}

function mapStateToProps({ categories, activeScreen }) {

    return {
        categoriesIds: Object.keys(categories),
        activeScreen

    }
}

export default connect(mapStateToProps)(ListCategory)
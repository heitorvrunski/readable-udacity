import React, { Component } from 'react'
import { connect } from 'react-redux'
import ListPost from './ListPost'
import { fetchCategories } from '../actions/category'
import ListCategory from './ListCategory';
import { Button } from 'semantic-ui-react'


class Homepage extends Component {
    state = {
        order: ''
    }
    componentDidMount() {
        this.props.dispatch(fetchCategories())
    }
    handleOrder = (e,type) => {
        e.preventDefault()
        this.setState(() => ({
            order: type
        }))
    }
    render() {
        const { order } = this.state
        return (
            <div>
                <div className='category-menu'>
                    <ListCategory {...this.props} />
                </div>
                <div className='order-menu'>
                    <b>Order by :</b>
                    <Button.Group size='large'>
                        <Button onClick={(e) => this.handleOrder(e, 'timestamp')}>Timestamp</Button>
                        <Button.Or />
                        <Button onClick={(e) => this.handleOrder(e, 'vote')}>Vote Score</Button>
                    </Button.Group>
                </div>
                <div>
                    <ListPost order={order} {...this.props} />
                </div>
            </div>
        )
    }
}

export default connect()(Homepage)
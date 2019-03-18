import React, { Component } from 'react'
import { connect } from 'react-redux'
import ListPost from './ListPost'
import ListCategory from './ListCategory';
import { Button, Container, Dimmer, Loader } from 'semantic-ui-react'


class Homepage extends Component {
    state = {
        order: '',
        loading: true
    }
    componentDidMount() {
        this.setState(() => ({
            loading: false
        }))
    }

    handleOrder = (e, type) => {
        e.preventDefault()
        this.setState(() => ({
            order: type
        }))
    }
    render() {
        const { order, loading } = this.state
        return (
            <Container className='container'>
                <Dimmer active={loading}>
                    <Loader />
                </Dimmer>
                <div className='category-menu'>
                    <ListCategory {...this.props} />
                </div>
                <div className='order-menu'>
                    <Button.Group size='large' color='blue'>
                        <Button onClick={(e) => this.handleOrder(e, 'timestamp')}>Timestamp</Button>
                        <Button.Or />
                        <Button onClick={(e) => this.handleOrder(e, 'vote')}>Vote Score</Button>
                    </Button.Group>
                </div>
                <div>
                    <ListPost order={order} {...this.props} />
                </div>
            </Container>
        )
    }
}

export default connect()(Homepage)
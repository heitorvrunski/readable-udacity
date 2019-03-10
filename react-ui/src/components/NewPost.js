import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

const options = [
    { key: 'react', text: 'react', value: 'react' },
    { key: 'redux', text: 'redux', value: 'redux' },
    { key: 'udacity', text: 'udacity', value: 'udacity' },
]

class NewPost extends Component {
    render() {
        return (

            <Form>
                <Header>Create a new post</Header>
                <Form.Input fluid label='Title' placeholder='Title' />
                <Form.Group widths='equal'>
                    <Form.Input fluid label='Author' placeholder='Author' />
                    <Form.Select fluid label='Category' options={options} placeholder='Category' />
                </Form.Group>
                <Form.TextArea label='Content' placeholder='Post content goes here...' />
                <Form.Group widths='equal'>
                    <Button as={Link} to='/home'>Cancel</Button>
                    <Form.Button floated='right'>Create Post</Form.Button>
                </Form.Group>
            </Form>
        )
    }
}

function mapStateToProps() {

}

export default connect()(NewPost)
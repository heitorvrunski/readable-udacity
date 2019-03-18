import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Header, Button, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import { addPostNew, fetchPost, editPostId } from '../actions/post';
import { setScreen } from '../actions/nav'

const uuidv1 = require('uuid/v1')

const options = [
    { key: 'react', text: 'react', value: 'react' },
    { key: 'redux', text: 'redux', value: 'redux' },
    { key: 'udacity', text: 'udacity', value: 'udacity' },
]

class NewPost extends Component {
    state = {
        title: '',
        titleError: false,
        author: '',
        authorError: false,
        category: '',
        categoryError: false,
        content: '',
        contentError: false
    }

    componentWillMount() {
        const { id } = this.props.match.params
        const { dispatch } = this.props

        if (id) {
            dispatch(fetchPost(id))
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params
        const { post } = this.props

        if (id) {
            this.setState({
                title: post.title,
                author: post.author,
                category: post.category,
                content: post.body
            })
        }
    }

    handleInputChange = event => {
        const target = event.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: value,
            [`${name}Error`]: false,
        })
    }
    handleSelectChange = (e, value) => {
        e.preventDefault()
        this.setState({
            category: value,
            categoryError: false
        })
    }

    handleSubmit = event => {
        event.preventDefault()

        const { title, author, category, content, } = this.state
        const { dispatch, history, id } = this.props

        if (title !== '' && author !== '' && category !== '' && content !== '') {
            const data = {
                id: id ? id : uuidv1(),
                timestamp: Date.now(),
                title,
                body: content,
                author,
                category,
                voteScore: 0,
                deleted: false
            }
            id ? dispatch(editPostId(data, id)) : dispatch(addPostNew(data))
            dispatch(setScreen('home'))
            history.push('/')
        }
        else {
            this.setState({
                titleError: Validate(title),
                authorError: Validate(author),
                categoryError: Validate(category),
                contentError: Validate(content)
            })
        }
    }

    render() {
        const { title, titleError, author, authorError, category, categoryError, content, contentError } = this.state
        const { id } = this.props
        return (
            <Segment padded='very'>
                <Form onSubmit={this.handleSubmit}>
                    <Header textAlign='center'>
                        {id ? 'Edit Post' : 'Create Post'}
                    </Header>
                    <Form.Input 
                        fluid 
                        label='Title' 
                        placeholder='Title' 
                        name='title' 
                        value={title} 
                        onChange={this.handleInputChange} 
                        error={titleError} 
                    />
                    <Form.Group widths='equal'>
                        <Form.Input 
                            fluid 
                            label='Author' 
                            placeholder='Author' 
                            name='author' 
                            value={author} 
                            onChange={this.handleInputChange} 
                            error={authorError} 
                        />
                        <Form.Select 
                            fluid 
                            label='Category'
                            options={options} 
                            name='category' 
                            value={category} 
                            onChange={(e, { value }) => this.handleSelectChange(e, value)} 
                            error={categoryError} 
                        />
                    </Form.Group>
                    <Form.TextArea 
                        label='Content' 
                        placeholder='Post content goes here...' 
                        name='content' 
                        value={content} 
                        onChange={this.handleInputChange} 
                        error={contentError} 
                    />
                    <Form.Group widths='equal'>
                        <Button 
                            color='blue' 
                            as={Link} 
                            to='/home'>Cancel</Button>
                        <Form.Button 
                            color='blue' 
                            type='submit' 
                            floated='right'
                        >
                                {id ? 'Save Changes' : 'Create Post'}
                        </Form.Button>
                    </Form.Group>
                </Form>
            </Segment>
        )
    }
}

function Validate(val) {
    return val === '' ? true : false
}

function mapStateToProps({ activeScreen, posts }, props) {
    const { id } = props.match.params
    return {
        activeScreen,
        post: posts[id],
        id
    }
}

export default connect(mapStateToProps)(NewPost)
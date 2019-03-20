import React, { Component } from 'react'
import { Card,
         TextArea, 
         Button, 
         Input, 
         Label } from 'semantic-ui-react';
import { connect } from 'react-redux'
import { addCommentNew } from '../actions/comment';
const uuidv1 = require('uuid/v1')

class AddComment extends Component {
    state = {
        commentText: '',
        author: '',
        commentTextError: false,
        authorError: false
    }
    handleComment = event => {
        const target = event.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: value,
            [`${name}Error`]: false
        })
    }
    handleAddComment = () => {
        const { postId, dispatch } = this.props
        const { commentText, author } = this.state
        if (commentText !== '' && author !== '') {
            const data = {
                id: uuidv1(),
                parentId: postId,
                timestamp: Date.now(),
                body: commentText,
                author,
                voteScore: 0,
                deleted: false,
                parentDeleted: false
            }
            dispatch(addCommentNew(data))
            this.setState({
                commentText: '',
                author: ''
            })
        }
        else {
            this.setState({
                commentTextError: commentText !== '' ? false : true,
                authorError: author !== '' ? false : true,
            })
        }
    }
    render() {
        const { author, authorError, commentText, commentTextError } = this.state
        return (
            <Card fluid>
                <Card.Content >
                    <TextArea 
                            color='blue' 
                            value={commentText} 
                            name='commentText' 
                            className='textArea' 
                            autoHeight 
                            placeholder='Type you comment...' 
                            onChange={this.handleComment} 
                    />
                    {commentTextError ? <Label basic color='red' pointing>
                                            Please enter a value
                                        </Label> : ''}
                    <Input 
                            color='blue' 
                            error={authorError} 
                            value={author} 
                            name='author' 
                            placeholder='Author' 
                            onChange={this.handleComment}>
                    </Input>
                </Card.Content>
                <Button 
                        color='blue' 
                        onClick={this.handleAddComment}>
                            Add comment
                </Button>
            </Card>
        )
    }
}

export default connect()(AddComment)
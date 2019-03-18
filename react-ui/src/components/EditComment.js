import React, { Component } from 'react'
import { Button, Header, Icon, Modal, TextArea, Label } from 'semantic-ui-react'
import { addCommentNew } from '../actions/comment'
import { connect } from 'react-redux'

class EditModal extends Component {
    state = { modalOpen: false, commentText: '', commentTextError: false }
    componentDidMount() {
        this.setState({
            commentText: this.props.comment.body
        })
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    handleComment = event => {
        const target = event.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: value,
            [`${name}Error`]: false
        })
    }

    handleYes = (e) => {
        e.preventDefault()
        const { commentText } = this.state
        const { comment } = this.props
        const { id, timestamp, author, parentId, voteScore, deleted, parentDeleted } = comment
        if (commentText !== '') {
            const data = {
                id,
                timestamp,
                body: commentText,
                author,
                parentId,
                voteScore,
                deleted,
                parentDeleted
            }
            this.props.dispatch(addCommentNew(data))
            this.setState({ modalOpen: false })
        }
        else {
            this.setState({
                commentTextError: true
            })
        }
    }

    render() {
        const { commentText, commentTextError } = this.state
        return (
            <Modal trigger={<Icon circular link name='edit' onClick={this.handleOpen} />}
                open={this.state.modalOpen}
                onClose={this.handleClose}
                basic
                size='small'>
                <Header icon='edit' content='Edit comment' />
                <Modal.Content>
                    <TextArea 
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
                </Modal.Content>
                <Modal.Actions>
                    <Button color='red' onClick={this.handleClose} inverted>
                        <Icon name='cancel' /> Cancel
                    </Button>
                    <Button color='green' onClick={(e) => this.handleYes(e)} inverted>
                        <Icon name='checkmark' /> Save Changes
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}



export default connect()(EditModal)
import React, { Component } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { deletePostId } from '../actions/post';

class DeleteModal extends Component {
  state = { modalOpen: false }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  handleYes = (e, id) => {
     this.setState({ modalOpen: false })
     const { dispatch } = this.props
     dispatch(deletePostId(id))
  }

  render() {
    return (
      <Modal
        trigger={<Icon circular link name='trash'  onClick={this.handleOpen} />}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
      >
        <Header icon='trash' content='Delete Post' />
                <Modal.Content>
                    <p>
                        Are you sure you want to delete : "{this.props.title}"?
                    </p>
                </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={this.handleClose} inverted>
            <Icon name='checkmark' /> No
          </Button>
          <Button color='green' onClick={(e) => this.handleYes(e,this.props.id)} inverted>
            <Icon name='checkmark' /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}


export default connect()(DeleteModal)
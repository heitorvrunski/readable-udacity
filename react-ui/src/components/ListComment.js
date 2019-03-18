import React, { Component } from 'react'
import Comment from './Comment'
import { fetchComments } from '../actions/comment'
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import AddComment from './AddComment'

class ListComment extends Component {
    componentWillMount() {
        const { postId, dispatch } = this.props

        dispatch(fetchComments(postId))

    }
    render() {
        const { commentsIds, postId, postCategory } = this.props
        return (
            <Segment >
                <AddComment postId={postId} postCategory={postCategory} />
                {commentsIds.map((id) => (
                    <Comment key={id} id={id} />
                ))}

            </Segment>
        )
    }
}

function mapStateToProps({ comments }) {
    return {
        commentsIds: Object.keys(comments)
            .sort((a, b) => comments[b].timestamp - comments[a].timestamp),
    }
}


export default connect(mapStateToProps)(ListComment)
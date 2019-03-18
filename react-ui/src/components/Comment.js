import React, { Component } from 'react'
import { Icon, Card } from 'semantic-ui-react';
import { connect } from 'react-redux'
import DeleteModal from './DeleteModal'
import { formatDate } from '../utils/helpers'
import { voteScoreDown, voteScoreUp } from '../actions/comment'
import EditComment from './EditComment';

class Comment extends Component {
    handleScoreUp = (e) => {
        e.preventDefault()

        const { dispatch, comment } = this.props

        dispatch(voteScoreUp(comment.id))
    }
    handleScoreDown = (e) => {
        e.preventDefault()

        const { dispatch, comment } = this.props

        dispatch(voteScoreDown(comment.id))
    }
    render() {
        const { comment } = this.props
        const { author, timestamp, body, voteScore, id } = comment
        return (

            <Card fluid>
                <Card.Header textAlign='right'>
                    <EditComment comment={comment} />
                    <DeleteModal 
                        type={'comment'} 
                        title={body} 
                        id={id} 
                    />
                </Card.Header>
                <Card.Meta>
                    {formatDate(timestamp)}
                </Card.Meta>
                <Card.Meta>
                    <b>@{author}</b>
                </Card.Meta>
                <Card.Content description={body} />
                <Card.Content>
                    <b>{voteScore}</b>
                    <Icon 
                        color='blue' 
                        link 
                        className='icon-post' 
                        name='thumbs up' 
                        onClick={(e) => this.handleScoreUp(e, voteScore)} 
                    />
                    <Icon 
                        color='blue' 
                        link 
                        className='icon-post' 
                        name='thumbs down' 
                        onClick={(e) => this.handleScoreDown(e, voteScore)} 
                    />
                </Card.Content>
            </Card>

        )
    }
}

function mapStateToProps({ comments, activeScreen }, { id }) {
    const comment = comments[id]
    return {
        comment,
        activeScreen
    }
}

export default connect(mapStateToProps)(Comment)
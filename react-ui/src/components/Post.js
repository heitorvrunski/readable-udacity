import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Icon, Label } from 'semantic-ui-react'
import { formatDate } from '../utils/helpers'
import { voteScoreDown, voteScoreUp } from '../actions/post'
import DeleteModal from './DeleteModal'

class Post extends Component {
    handleScoreUp = (e) => {
        e.preventDefault()

        const { dispatch, post } = this.props

        dispatch(voteScoreUp(post.id))
    }
    handleScoreDown = (e) => {
        e.preventDefault()

        const { dispatch, post } = this.props

        dispatch(voteScoreDown(post.id))
    }
    handleDelete = (e) => {
        e.preventDefault()

    }
    handleEdit = (e) => {
        e.preventDefault()

    }
    render() {
        const { post } = this.props
        if (post === null) {
            return <p>This post doesn`t exist</p>
        }
        const { title, body, voteScore, commentCount, timestamp, author, category, id } = post
        return (
            <Card raised >
                <Card.Content>
                    <Label as='a' color='blue' ribbon>
                        {category}
                    </Label>
                    <Card.Header textAlign='right'>
                        <Icon circular link name='edit' onClick={(e) => this.handleEdit(e, id)}/>
                        <DeleteModal title={title} id={id}/>
                    </Card.Header>
                    <Card.Header>
                        {title}
                        
                    </Card.Header>
                    
                    <Card.Meta>{formatDate(timestamp)}</Card.Meta>
                    <Card.Content>@{author}</Card.Content>
                </Card.Content>
                <Card.Content description={body} />
                <Card.Content extra>
                    <b>{voteScore}</b>
                    <Icon link className='icon-post' name='thumbs up' onClick={(e) => this.handleScoreUp(e, voteScore)} />
                    <Icon link className='icon-post' name='thumbs down' onClick={(e) => this.handleScoreDown(e, voteScore)} />

                    <Icon link className='icon-post' name='comment' />
                    <b>{commentCount}</b>
                </Card.Content>
            </Card>
        )
    }
}

function mapStateToProps({ posts }, { id }) {
    const post = posts[id]
    return {
        post: post 
    }
}

export default connect(mapStateToProps)(Post)
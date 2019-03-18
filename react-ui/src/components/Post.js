import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Icon, Header, Segment, Label } from 'semantic-ui-react'
import { formatDate } from '../utils/helpers'
import { voteScoreDown, voteScoreUp } from '../actions/post'
import DeleteModal from './DeleteModal'
import { Link } from 'react-router-dom'
import { setScreen } from '../actions/nav'

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
    handleItemClick = (e) => {
        //e.preventDefault()
        const { dispatch } = this.props

        dispatch(setScreen('edit'))
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
                    <Label color='blue' ribbon>
                        {category}
                    </Label>
                    <Card.Header textAlign='right'>
                        <Link to={`/${category}/edit/${id}`}>
                            <Icon circular link name='edit' onClick={this.handleItemClick} />
                        </Link>
                        <DeleteModal type={'post'} title={title} id={id} />
                    </Card.Header>
                </Card.Content>
                <Card.Content as={Link} to={`/${category}/${id}`}>
                    <Card.Header>
                        {title}

                    </Card.Header>

                    <Card.Meta>{formatDate(timestamp)}</Card.Meta>
                    <Card.Content>@{author}</Card.Content>
                    <Segment.Group>
                        <Segment>
                            <Header size='small'>{body}</Header>
                        </Segment>
                        <Segment>
                            <Card.Content extra>
                                <Label size='medium' circular >{voteScore}</Label>
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

                                <Icon color='blue' link className='icon-post' name='comment' />
                                <Label size='medium' circular > {commentCount} </Label>
                            </Card.Content>
                        </Segment>
                    </Segment.Group>
                </Card.Content>
            </Card>
        )
    }
}

function mapStateToProps({ posts, activeScreen }, { id }) {
    const post = posts[id]
    return {
        post,
        activeScreen
    }
}


export default connect(mapStateToProps)(Post)
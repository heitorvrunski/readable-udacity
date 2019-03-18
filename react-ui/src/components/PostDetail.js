import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Icon, Label, Segment, Container } from 'semantic-ui-react'
import { formatDate } from '../utils/helpers'
import { voteScoreDown, voteScoreUp, fetchPost } from '../actions/post'
import DeleteModal from './DeleteModal'
import { Link } from 'react-router-dom'
import { setScreen } from '../actions/nav'
import ListComment from './ListComment';
import ListCategory from './ListCategory'
import NotFound from './NotFound'

class PostDetail extends Component {
    componentWillMount() {
        const { id } = this.props.match.params
        const { dispatch } = this.props

        dispatch(fetchPost(id))
    }

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
        const { post, category } = this.props
        return (
            (!post || post.category !== category || post.deleted === true)
                ? <NotFound />
                :
                <Container className='container'>
                    <div className='category-menu'>
                        <ListCategory {...this.props} />
                    </div>

                    <Segment className='bg'>
                        <Card raised fluid >
                            <Card.Content>
                                <Label color='blue' ribbon>
                                    {post.category}
                                </Label>
                                <Card.Header textAlign='right'>
                                    <Link to={`/posts/edit/${post.id}`}>
                                        <Icon circular link name='edit' onClick={this.handleItemClick} />
                                    </Link>
                                    <DeleteModal type={'post'} title={post.title} id={post.id} />
                                </Card.Header>
                                <Card.Header>
                                    {post.title}

                                </Card.Header>

                                <Card.Meta>{formatDate(post.timestamp)}</Card.Meta>
                                <Card.Content>@{post.author}</Card.Content>
                            </Card.Content>
                            <Card.Content description={post.body} />
                            <Card.Content >
                                <Label size='medium' circular >{post.voteScore}</Label>
                                <Icon 
                                    color='blue' 
                                    link 
                                    className='icon-post' 
                                    name='thumbs up' 
                                    onClick={(e) => this.handleScoreUp(e, post.voteScore)} 
                                />
                                <Icon 
                                    color='blue' 
                                    link 
                                    className='icon-post' 
                                    name='thumbs down' 
                                    onClick={(e) => this.handleScoreDown(e, post.voteScore)} 
                                />
                                <Icon color='blue' link className='icon-post' name='comment' />
                                <Label size='medium' circular >{post.commentCount}</Label>
                            </Card.Content>
                        </Card>
                        <ListComment postCategory={post.category} postId={post.id} />
                    </Segment>
                </Container>
        )
    }
}

function mapStateToProps({ posts, activeScreen }, props) {
    const { id, category } = props.match.params
    const post = posts[id]
    return {
        post,
        category,
        activeScreen
    }
}

export default connect(mapStateToProps)(PostDetail)
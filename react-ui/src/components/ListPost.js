import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import { Card } from 'semantic-ui-react'
import { fetchPosts } from '../actions/post'

class ListPost extends Component {
    componentWillMount() {
        this.props.getPosts()
    }
    render() {
        return (

            <Card.Group itemsPerRow={1} centered>
                {this.props.postsIds.map((id) => (
                    <Post key={id} id={id} />
                ))}

            </Card.Group>
        )
    }
}


function mapStateToProps({ posts, activeScreen }, { order }) {

    activeScreen = activeScreen === 'home' ? null : activeScreen
    switch (order) {
        case 'timestamp':
            return {
                postsIds: Object.keys(posts)
                    .sort((a, b) => posts[b].timestamp - posts[a].timestamp)
                    .filter((p) => activeScreen !== null ? posts[p].category === activeScreen : posts[p]),
                activeScreen
            }
        case 'vote':
            return {
                postsIds: Object.keys(posts)
                    .sort((a, b) => posts[b].voteScore - posts[a].voteScore)
                    .filter((p) => activeScreen !== null ? posts[p].category === activeScreen : posts[p]),
                activeScreen
            }
        default:
            return {
                postsIds: Object.keys(posts)
                .filter((p) => activeScreen !== null ? posts[p].category === activeScreen : posts[p]),
                activeScreen

            }
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        getPosts: () => {
        dispatch(fetchPosts())
      }
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(ListPost)
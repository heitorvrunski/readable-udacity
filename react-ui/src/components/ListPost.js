import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import { Card } from 'semantic-ui-react'
import { fetchPosts } from '../actions/post'

class ListPost extends Component {
    componentWillMount() {
        const { category } = this.props.match.params
        console.log(category)

        this.props.dispatch(fetchPosts())
        
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
    console.log(activeScreen)
    switch (order) {
        case 'timestamp':
            return {
                postsIds: Object.keys(posts)
                    .sort((a, b) => posts[b].timestamp - posts[a].timestamp),
                activeScreen
            }
        case 'vote':
            return {
                postsIds:  Object.keys(posts)
                    .sort((a, b) => posts[b].voteScore - posts[a].voteScore),
                activeScreen
            }
        default:
            return {
                postsIds:  Object.keys(posts).filter((p) => activeScreen !== null ? posts[p].category === activeScreen : posts[p]),
                activeScreen

            }
    }

}



export default connect(mapStateToProps)(ListPost)
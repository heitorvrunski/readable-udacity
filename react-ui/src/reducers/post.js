import _ from 'lodash'
import { GET_POSTS, GET_POSTS_CATEGORY, DOWN_VOTE_POST, UP_VOTE_POST, DELETE_POST } from '../actions/post'

export default function posts(state = {}, action) {
    switch (action.type) {
        case GET_POSTS:
            return _.mapKeys(action.posts, 'id')
        case GET_POSTS_CATEGORY:
            return {
                ...action.posts
            }
        case UP_VOTE_POST:
        case DOWN_VOTE_POST:
            return {
                ...state,
                [action.post.id]: action.post
            }
        case DELETE_POST:
            return _.omit(state, action.post);
        default:
            return state
    }
}
import _ from 'lodash'
import {
    GET_POSTS,
    GET_POSTS_CATEGORY,
    DOWN_VOTE_POST,
    UP_VOTE_POST,
    DELETE_POST,
    ADD_POST,
    EDIT_POST,
    GET_POST
} from '../actions/post'
import { ADD_COMMENT, DELETE_COMMENT } from '../actions/comment'

export default function posts(state = {}, action) {
    switch (action.type) {
        case GET_POSTS:
            return _.mapKeys(action.posts, 'id')
        case GET_POST:
            return {
                ...state,
                [action.post.id]: action.post
            }
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
        case ADD_POST:
        case EDIT_POST:
            return {
                ...state,
                [action.post.id]: action.post,
            }
        case DELETE_POST:
            return _.omit(state, action.post.id);
        case ADD_COMMENT:
            return {
                ...state,
                [action.comment.parentId]: {
                    ...state[action.comment.parentId],
                    commentCount: state[action.comment.parentId].commentCount + 1
                }
            }
        case DELETE_COMMENT:
            return {
                ...state,
                [action.comment.parentId]: {
                    ...state[action.comment.parentId],
                    commentCount: state[action.comment.parentId].commentCount - 1
                }
            }
        default:
            return state
    }
}
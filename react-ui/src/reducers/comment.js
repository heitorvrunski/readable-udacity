import _ from 'lodash'
import { GET_COMMENTS,
         DELETE_COMMENT, 
         VOTE_COMMENT, 
         ADD_COMMENT } from '../actions/comment'

export default function comments(state = {}, action) {
    switch (action.type) {
        case GET_COMMENTS:
            return _.mapKeys(action.comments, 'id')
        case VOTE_COMMENT:
            return {
                ...state,
                [action.comment.id]: action.comment
            }
        case ADD_COMMENT:
            return {
                ...state,
                [action.comment.id]: action.comment,
            }
        case DELETE_COMMENT:
            return _.omit(state, action.comment.id);
        default:
            return state
    }
}
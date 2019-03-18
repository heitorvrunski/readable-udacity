import { getAllComments,
         deleteComment, 
         voteComment, 
         addComment } from '../api'

export const GET_COMMENTS = 'GET_COMMENTS'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'

export function fetchComments(id) {
    return (dispatch) => {
        return getAllComments(id)
            .then((comments) => dispatch(getComments(comments)))
    }
}

function getComments(comments) {
    return {
        type: GET_COMMENTS,
        comments,
    }
}

export const addCommentNew = data => dispatch =>
    addComment(data)
        .then(comment => dispatch(newComment(comment)))

export const newComment = (comment) => ({
    type: ADD_COMMENT,
    comment
})

export const deleteCommentId = (id) => dispatch => (
    deleteComment(id)
        .then(comment => dispatch({
            type: DELETE_COMMENT,
            comment
        }))
)

export const voteScoreUp = (id) => dispatch => (
    voteComment(id, "upVote")
        .then(comment => dispatch({
            type: VOTE_COMMENT,
            comment
        }))
)

export const voteScoreDown = (id) => dispatch => (
    voteComment(id, "downVote")
        .then(comment => dispatch({
            type: VOTE_COMMENT,
            comment
        }))
)

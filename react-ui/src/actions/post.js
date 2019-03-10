import {
    getAllPosts,
    getAllPostsByCategory,
    votePost,
    deletePost
} from '../api';


export const GET_POSTS = 'GET_POSTS'
export const GET_POSTS_CATEGORY = 'GET_POSTS_CATEGORY'
export const UP_VOTE_POST = 'UP_VOTE_POST';
export const DOWN_VOTE_POST = 'DOWN_VOTE_POST';
export const DELETE_POST = 'DELETE_POST';

export function fetchPosts() {
    return (dispatch) => {
        return getAllPosts()
            .then((posts) => dispatch(getPosts(posts)))
    }
}

function getPosts(posts) {
    return {
        type: GET_POSTS,
        posts,
    }
}

export function fetchPostsByCategory(category) {
    return (dispatch) => {
        return getAllPostsByCategory(category)
            .then((posts) => dispatch(getPostsByCategory(posts, category)))
    }
}

function getPostsByCategory(posts, category) {
    return {
        type: GET_POSTS_CATEGORY,
        posts,
        category,
    }
}

export const deletePostId = (id) => dispatch => (
    deletePost(id)
        .then(post => dispatch({
            type: DELETE_POST,
            post
        }))
)

export const voteScoreUp = (id) => dispatch => (
    votePost(id, "upVote")
        .then(post => dispatch({
            type: UP_VOTE_POST,
            post
        }))
)

export const voteScoreDown = (id) => dispatch => (
    votePost(id, "downVote")
        .then(post => dispatch({
            type: DOWN_VOTE_POST,
            post
        }))
)
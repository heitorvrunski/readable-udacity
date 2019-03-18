import {
    getAllPosts,
    getAllPostsByCategory,
    votePost,
    deletePost,
    addPost,
    getAllComments,
    getPost,
    editPost
} from '../api';


export const GET_POSTS = 'GET_POSTS'
export const GET_POSTS_CATEGORY = 'GET_POSTS_CATEGORY'
export const UP_VOTE_POST = 'UP_VOTE_POST';
export const DOWN_VOTE_POST = 'DOWN_VOTE_POST';
export const DELETE_POST = 'DELETE_POST';
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const GET_POST = 'GET_POST'

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

export const fetchPost = id => dispatch =>
    getPost(id)
        .then(post =>
            getAllComments(post.id)
                .then(comments => (post.comments = comments))
                .then(() => post)
        )
        .then(post => dispatch(getPostId(post)))

function getPostId(post) {
    return {
        type: GET_POST,
        post,
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

export const addPostNew = data => dispatch =>
    addPost(data)
        .then(post =>
            getAllComments(post.id)
                .then(comments => (post.comments = comments))
                .then(() => post)
        )
        .then(post => dispatch(postsById(post)))

export const postsById = (post) => ({
    type: ADD_POST,
    post
})

export const editPostId = (data, id) => dispatch =>
    editPost(data, id)
        .then(post =>
            getAllComments(post.id)
                .then(comments => (post.comments = comments))
                .then(() => post)
        )
        .then(post => dispatch(postsEditById(post)))

export const postsEditById = (post) => ({
    type: EDIT_POST,
    post
})

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
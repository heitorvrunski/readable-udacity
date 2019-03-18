const api = "http://localhost:3001"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
    'Accept': 'application/json',
    'Authorization': token
}

export const getAllPosts = () =>
    fetch(`${api}/posts`, { headers })
        .then(res => res.json())
        .then(posts => posts.filter(post => !post.deleted))

export const getPost = id =>
    fetch(`${api}/posts/${id}`, {
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }
    }).then(data => data.json())

export const getAllCategories = () =>
    fetch(`${api}/categories`, {
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => data.categories)

export const getAllPostsByCategory = (category) =>
    fetch(`${api}/${category}/posts`, {
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())

export const addPost = data =>
    fetch(`${api}/posts`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(data => data.json())

export const editPost = (data, id) =>
    fetch(`${api}/posts/${id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(data => data.json())

export const deletePost = id =>
    fetch(`${api}/posts/${id}`, {
        method: 'DELETE',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }
    }).then(data => data.json())

export const votePost = (id, option) =>
    fetch(`${api}/posts/${id}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            option
        })
    }).then(res => res.json())

export const getAllComments = id =>
    fetch(`${api}/posts/${id}/comments`, {
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }
    })
        .then(data => data.json())
        .then(data => data)

export const addComment = (data) =>
    fetch(`${api}/comments`,
        {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(data => data.json())

export const voteComment = (id, vote) =>
    fetch(`${api}/comments/${id}`,
        {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ option: vote })
        })
        .then(data => data.json())

export const deleteComment = (id) =>
    fetch(`${api}/comments/${id}`,
        {
            method: 'DELETE',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            }
        })
        .then(data => data.json())
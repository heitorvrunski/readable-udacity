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

export const getAllCategories = () =>
    fetch(`${api}/categories`, { headers })
        .then(res => res.json())
        .then(data => data.categories)

export const getAllPostsByCategory = (category) =>
    fetch(`${api}/${category}/posts`, { headers })
        .then(res => res.json())

export const addPost = data =>
    fetch(`${api}/posts`, {
        method: 'POST',
        headers: {
            Authorization: 'whatever-you-want',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(data => data.json())

export const editPost = (data, id) =>
    fetch(`${api}/posts/${id}`, {
        method: 'PUT',
        headers: {
            Authorization: 'whatever-you-want',
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
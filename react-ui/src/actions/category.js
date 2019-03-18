import {
    getAllCategories
} from '../api';

export const GET_CATEGORIES = 'GET_CATEGORIES'
export const SET_CATEGORY = 'SET_CATEGORY'

export function fetchCategories() {
    return (dispatch) => {
        return getAllCategories()
            .then((categories) => dispatch(getCategories(categories)))
    }
}

function getCategories(categories) {
    return {
        type: GET_CATEGORIES,
        categories,
    }
}
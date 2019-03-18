import { combineReducers } from 'redux'
import posts from './post'
import categories from './categories'
import comments from './comment'
import activeScreen from './nav'

export default combineReducers({
    posts,
    categories,
    comments,
    activeScreen
})
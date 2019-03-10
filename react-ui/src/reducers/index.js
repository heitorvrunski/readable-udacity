import { combineReducers } from 'redux'
import posts from './post'
import categories from './categories'
import activeScreen from './nav'

export default combineReducers({
    posts,
    categories,
    activeScreen
})
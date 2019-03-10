import { SET_SCREEN } from '../actions/nav'

export default function activeScreen(state = 'home', action) {
    switch (action.type) {
        case SET_SCREEN:
        return action.screen
        default:
            return state
    }
}
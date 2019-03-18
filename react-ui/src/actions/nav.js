export const SET_SCREEN = 'SET_SCREEN'

export function setScreen(screen) {
    return (dispatch) => {
        return dispatch(setNav(screen))
    }
}

function setNav(screen) {
    return {
        type: SET_SCREEN,
        screen,
    }
}
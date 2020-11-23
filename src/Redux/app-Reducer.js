import { getAuthDataTC } from "./auth-Reducer";

let initialState = {
    initialized: false
}

const appDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_INITIALIZED': {
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return state;
    }
}

export const initializedAC = () => {
    return { type: 'SET_INITIALIZED' }
}


export const initializedTC = () => (dispatch) => {
    let promise1 = dispatch(getAuthDataTC());
    Promise.all([promise1]).then(() => {
        dispatch(initializedAC());
    })
}

export default appDataReducer;
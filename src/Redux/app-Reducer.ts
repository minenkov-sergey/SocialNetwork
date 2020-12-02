import { getAuthDataTC } from "./auth-Reducer";

export type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false
}

const SET_INITIALIZED = 'app-Reducer/SET_INITIALIZED'

const appDataReducer = (state = initialState, action: any): InitialStateType  => {
    switch (action.type) {
        case SET_INITIALIZED: {
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return state;
    }
}

type initializedACType = {
    type: typeof SET_INITIALIZED
}

export const initializedAC = (): initializedACType => ({ type: SET_INITIALIZED })

export const initializedTC = () => (dispatch: any) => {
    let promise1 = dispatch(getAuthDataTC());
    Promise.all([promise1]).then(() => {
        dispatch(initializedAC());
    })
}

export default appDataReducer;
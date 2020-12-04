import { getAuthDataTC } from "./auth-Reducer"
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from './redux-store';

export type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false
}

const SET_INITIALIZED = 'app-Reducer/SET_INITIALIZED'

const appDataReducer = (state = initialState, action: initializedACType): InitialStateType  => {
    switch (action.type) {
        case SET_INITIALIZED: {
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return state
    }
}

type initializedACType = { type: typeof SET_INITIALIZED }

export const initializedAC = (): initializedACType => ({ type: SET_INITIALIZED })


export const initializedTC = (): ThunkAction<Promise<void>, AppStateType, unknown, initializedACType> => async (dispatch) => {
    await dispatch(getAuthDataTC())
    .then(() => {
        dispatch(initializedAC())
    })
}

export default appDataReducer
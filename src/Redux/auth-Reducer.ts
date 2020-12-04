import { API, ResultCodesEnum } from '../api/api';
import { stopSubmit } from 'redux-form';
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from './redux-store';


let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isLogged: false,
    captchaUrl: null as string | null
}

export type InitialStateType = typeof initialState

const SET_AUTH_DATA = 'auth-Reducer/SET_AUTH_DATA'
const SET_CAPTCHA = 'auth-Reducer/SET_CAPTCHA'

const authDataReducer = (state = initialState, action: ActionsTypes):InitialStateType  => {

    switch (action.type) {
        case SET_AUTH_DATA: {
            return {
                ...state,
                ...action.authData
            }
        }
        case SET_CAPTCHA: {
            return {
                ...state,
                captchaUrl: action.captchaUrl
            }
        }
        default:
            return state;
    }
}

type ActionsTypes =  setAuthDataACType | setCaptchaACType 

type setAuthDataACauthDataType = {
    id: number | null, 
    email: string | null, 
    login: string | null, 
    isLogged: boolean
}

type setAuthDataACType = {
    type: typeof SET_AUTH_DATA,
    authData: setAuthDataACauthDataType
}

export const setAuthDataAC = (id: number | null, email: string | null, login: string | null, isLogged: boolean): setAuthDataACType => ({ type: SET_AUTH_DATA, authData: { id, email, login, isLogged }})

type setCaptchaACType = {
    type: typeof SET_CAPTCHA,
    captchaUrl: string
}

export const setCaptchaAC = (captchaUrl: string): setCaptchaACType => ({ type: SET_CAPTCHA, captchaUrl })

export const getAuthDataTC = (): ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> => {
    return async (dispatch) => {
        const response = await API.authMe();
        if (response.resultCode === ResultCodesEnum.Success) {
            let { id, email, login } = response.data;
            dispatch(setAuthDataAC(id, email, login, true));
        }
    }
}
///Type?
export const loginTC = (email: string, password: string, rememberMe:boolean = false, captcha:string|null = null) => async (dispatch: any) => {
        API.login(email, password, rememberMe, captcha).then((response) => {
            if (response.resultCode === ResultCodesEnum.Success) {
                dispatch(getAuthDataTC())
            } else {
                if (response.resultCode === ResultCodesEnum.CaptchaIsReq) {
                    dispatch(getCaptchaTC())
                }
                let errorMessage = response.messages[0]
                dispatch(stopSubmit('loginForm', { _error: errorMessage }))
            }
        })
    }


export const getCaptchaTC = (): ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> => async (dispatch) => {
    let response = await API.getCaptcha()
    const captchaUrl = response.data.url;
    dispatch(setCaptchaAC(captchaUrl))
}


export const logoutTC = (): ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> => async (dispatch) => {
        API.logout().then((response) => {
            if (response.resultCode === ResultCodesEnum.Success) {
                dispatch(setAuthDataAC(null, null, null, false))
            }
        })
    }

export default authDataReducer;
import { API } from '../api/api';
import { stopSubmit } from 'redux-form';


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

const authDataReducer = (state = initialState, action: any):InitialStateType  => {

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

export const getAuthDataTC = (): any => {
    return (dispatch: any) => {
        return API.authMe().then ((response:any) => {
            if (response.data.resultCode === 0) {
                let { id, email, login } = response.data.data
                dispatch(setAuthDataAC(id, email, login, true))
            }
        })
    }
}

export const loginTC = (email: string, password: string, rememberMe:boolean = false, captcha:string|null = null) => {
    return (dispatch: any) => {
        API.login(email, password, rememberMe, captcha).then((response:any) => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthDataTC())
            } else {
                if (response.data.resultCode === 10) {
                    dispatch(getCaptchaTC())
                }
                let errorMessage = response.data.messages[0]
                dispatch(stopSubmit('loginForm', { _error: errorMessage }))
            }
        })
    }
}

export const getCaptchaTC = () => async (dispatch: any) => {
    let response = await API.getCaptcha()
    const captchaUrl = response.data.url;
    dispatch(setCaptchaAC(captchaUrl))
}


export const logoutTC = () => {
    return (dispatch: any) => {
        API.logout().then((response:any) => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthDataAC(null, null, null, false))
            }
        })
    }
}




export default authDataReducer;
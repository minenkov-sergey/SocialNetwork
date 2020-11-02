
import { API } from './../api/api';
import { stopSubmit } from 'redux-form';

let initialState = {
    id: null,
    email: null,
    login: null,
    isLogged: false,
    captchaUrl: null
}


const authDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_AUTH_DATA': {
            return { 
                ...state,
                ...action.authData
            }
        }
        case 'SET_CAPTCHA': {
            return { 
                ...state,
                captchaUrl: action.captchaUrl
            }
        }
        default:
            return state;
    }
}

export const setAuthData = (id, email, login, isLogged) => ({ type: 'SET_AUTH_DATA', authData: {id, email, login, isLogged }})

export const setCaptchaAC = (captchaUrl) => ({ type: 'SET_CAPTCHA', captchaUrl })




export const getAuthDataTC = () => {
    return (dispatch) => {
       return API.authMe().then(response => {
            if (response.data.resultCode===0) {
                let {id, email, login} = response.data.data
        dispatch(setAuthData(id, email, login, true))}
    })
    }
}
export const loginTC = (email, password, rememberMe = false, captcha = null) => {
    return (dispatch) => {
        API.login(email, password, rememberMe, captcha).then(response => {
            if (response.data.resultCode===0) {
        dispatch(getAuthDataTC())
    } else { 
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaTC())
        }
        let errorMessage = response.data.messages[0]
        dispatch(stopSubmit('loginForm', {_error:errorMessage}))
            }
    })
    }
}

export const getCaptchaTC = () => async (dispatch) => {
    let response = await API.getCaptcha()
    const captchaUrl = response.data.url;
    dispatch(setCaptchaAC(captchaUrl))
}


export const logoutTC = () => {
    return (dispatch) => {
        API.logout().then(response => {
            if (response.data.resultCode===0) {
        dispatch(setAuthData(null, null, null, false))}
    })
    }
}




export default authDataReducer;
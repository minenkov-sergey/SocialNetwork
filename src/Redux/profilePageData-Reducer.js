import { API } from './../api/api';
import { stopSubmit } from 'redux-form';

let initialState = {
    newpostProfilePageData: '',
    profilePageData: [
        { id: 1, message: 'first post', likecount: 15 },
        { id: 2, message: 'second post', likecount: 6 }],
    userProfile: null,
    status: ''

}

const ADD_POST = 'profilePageData-Reducer/ADD_POST'
const SET_USER_PROFILE = 'profilePageData-Reducer/SET_USER_PROFILE'
const SET_STATUS = 'profilePageData-Reducer/SET_STATUS'
const DELETE_POST = 'profilePageData-Reducer/DELETE_POST'
const SET_AVATAR = 'profilePageData-Reducer/SET_AVATAR'


const profilePageDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let lengthArray = state.profilePageData.length + 1
            let newPost = {
                id: lengthArray,
                message: action.value,
                likecount: 0
            }
            return {
                ...state,
                profilePageData: [...state.profilePageData, newPost],
            }
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                userProfile: action.profile
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case DELETE_POST: {
            return {
                ...state,
                profilePageData: state.profilePageData.filter(p => p.id !== action.postId)
            }
        }
        case SET_AVATAR: {
            return {
                ...state,
                userProfile: { ...state.userProfile, photos: action.avatars }
            }
        }
        default:
            return state;
    }
}

export const deletePostAC = (postId) => ({ type: DELETE_POST, postId })

export const setSaveAvatarAC = (avatars) => ({ type: SET_AVATAR, avatars })

export const setProfileStatusAC = (status) => ({ type: SET_STATUS, status })

export const addPostAC = (value) => ({ type: ADD_POST, value })

export const setUserProfileAC = (profile) => ({ type: SET_USER_PROFILE, profile })


export const getUserProfileTC = (userId) => {
    return (dispatch) => {
        API.getProfile(userId)
            .then(response => {
                dispatch(setUserProfileAC(response.data))
            })
    }
}
export const getProfileStatusTC = (userId) => {
    return (dispatch) => {
        API.getProfileStatus(userId)
            .then(response => {
                dispatch(setProfileStatusAC(response.data))
            })
    }
}
export const setSaveAvatarTC = (avatar) => {
    return (dispatch) => {
        API.setAvatar(avatar)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setSaveAvatarAC(response.data.data.photos))
                }
            })
    }
}
export const updateProfileStatusTC = (status) => async (dispatch) => {
    try {
        const response = await API.updateProfileStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setProfileStatusAC(status))
        }
    }
    catch (error) { alert(error.message) }
}

export const saveProfileDataTC = (profileData) => async (dispatch, getState) => {
    const userId = getState().authData.id
    let response = await API.saveProfileData(profileData)
    if (response.data.resultCode === 0) {
        dispatch(getUserProfileTC(userId))
    }
    else {
        let errorMessage = response.data.messages[0]
        let field = errorMessage.slice(30, errorMessage.length - 1).toLowerCase()
        dispatch(stopSubmit('ProfileDataForm', { "contacts": { [field]: errorMessage } }))
        return Promise.reject(errorMessage)
    }
}



export default profilePageDataReducer;
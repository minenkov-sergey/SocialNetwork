
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


const profilePageDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD-POST': {
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
        case 'SET-USER-PROFILE': {
            return {
                ...state,
                userProfile: action.profile
            }
        }
        case 'SET-STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case 'DELETE-POST': {
            return {
                ...state,
                profilePageData: state.profilePageData.filter(p => p.id !== action.postId)
            }
        }
        case 'SET-AVATAR': {
            return {
                ...state,
                userProfile: { ...state.userProfile, photos: action.avatars }
            }
        }
        default:
            return state;
    }
}

export const getUserProfileTC = (userId) => {
    return (dispatch) => {
        API.getProfile(userId)
            .then(response => {
                dispatch(setUserProfile(response.data))
            })
    }
}
export const getProfileStatusTC = (userId) => {
    return (dispatch) => {
        API.getProfileStatus(userId)
            .then(response => {
                dispatch(setProfileStatus(response.data))
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
            dispatch(setProfileStatus(status))
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

export const deletePostAC = (postId) => {
    return { type: 'DELETE-POST', postId }
}

export const setSaveAvatarAC = (avatars) => {
    return { type: 'SET-AVATAR', avatars }
}

export const setProfileStatus = (status) => {
    return { type: 'SET-STATUS', status: status }
}

export const addPostActionCreator = (value) => {
    return { type: 'ADD-POST', value }
}
export const setUserProfile = (profile) => ({ type: 'SET-USER-PROFILE', profile })

export default profilePageDataReducer;
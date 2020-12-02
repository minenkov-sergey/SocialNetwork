import { API } from '../api/api';
import { stopSubmit } from 'redux-form';
import { PhotosType, PostType, ProfileType } from '../types/types';

export type InitialStateType = typeof initialState




let initialState = {
    newpostProfilePageData: '',
    profilePageData: [
        { id: 1, message: 'first post', likecount: 15 },
        { id: 2, message: 'second post', likecount: 6 }] as Array<PostType>,
    userProfile: null as ProfileType | null,
    status: ''

}

const ADD_POST = 'profilePageData-Reducer/ADD_POST'
const SET_USER_PROFILE = 'profilePageData-Reducer/SET_USER_PROFILE'
const SET_STATUS = 'profilePageData-Reducer/SET_STATUS'
const DELETE_POST = 'profilePageData-Reducer/DELETE_POST'
const SET_AVATAR = 'profilePageData-Reducer/SET_AVATAR'


const profilePageDataReducer = (state = initialState, action: any): InitialStateType => {
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
                userProfile: { ...state.userProfile, photos: action.avatars } as ProfileType
            }
        }
        default:
            return state;
    }
}

type deletePostACType = {
    type: typeof DELETE_POST,
    postId: number
}
export const deletePostAC = (postId:number): deletePostACType => ({ type: DELETE_POST, postId })

type setSaveAvatarACType = {
    type: typeof SET_AVATAR,
    avatars: PhotosType
}
export const setSaveAvatarAC = (avatars: PhotosType): setSaveAvatarACType => ({ type: SET_AVATAR, avatars })

type setProfileStatusACType = {
    type: typeof SET_STATUS,
    status: string | null
}
export const setProfileStatusAC = (status: string): setProfileStatusACType => ({ type: SET_STATUS, status })

type addPostACType = {
    type: typeof ADD_POST,
    value: string
}
export const addPostAC = (value: string): addPostACType => ({ type: ADD_POST, value })

type setUserProfileACType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}
export const setUserProfileAC = (profile: ProfileType): setUserProfileACType => ({ type: SET_USER_PROFILE, profile })


export const getUserProfileTC = (userId: number) => {
    return (dispatch: any) => {
        API.getProfile(userId)
            .then((response: any) => {
                dispatch(setUserProfileAC(response.data))
            })
    }
}
export const getProfileStatusTC = (userId: number) => {
    return (dispatch: any) => {
        API.getProfileStatus(userId)
            .then((response:any) => {
                dispatch(setProfileStatusAC(response.data))
            })
    }
}
export const setSaveAvatarTC = (avatar:PhotosType) => {
    return (dispatch:any) => {
        API.setAvatar(avatar)
            .then((response:any) => {
                if (response.data.resultCode === 0) {
                    dispatch(setSaveAvatarAC(response.data.data.photos))
                }
            })
    }
}
export const updateProfileStatusTC = (status:string) => async (dispatch: any) => {
    try {
        const response = await API.updateProfileStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setProfileStatusAC(status))
        }
    }
    catch (error) { alert(error.message) }
}

export const saveProfileDataTC = (profileData: ProfileType) => async (dispatch: any, getState: any) => {
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
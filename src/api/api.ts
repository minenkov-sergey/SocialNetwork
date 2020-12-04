import Axios  from 'axios';
import {  ProfileType, UserType } from '../types/types';

const instance = Axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': '2c22ff32-ed18-4be9-9b23-cba7cd28458c'
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0'
})

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
    CaptchaIsReq = 10
}
type GetUsersResponseType = {
    items:Array<UserType>
    totalCount: number
    error: string
}

type MeResponseType = {
    data: {id: number, email: string, login: string}
    resultCode: number
    messages: Array<string>
}
type LoginResponseType = {
    data: {userId: number}
    resultCode: number
    messages: Array<string>
}
type LogoutResponseType = {
    data: {}
    resultCode: number
    messages: Array<string>
}
type ToggleFollowResponseType = {
    data: {}
    resultCode: number
    messages: Array<string>
}
type UpdateProfileStatusType = {
    data: {}
    resultCode: number
    messages: Array<string>
}
type SaveProfileDataType= {
    data: {}
    resultCode: number
    messages: Array<string>
}
type CaptchaType = {
    url: string
}

export const API = {
    getUsers (currentPage: number, pageSize: number) {
        return instance.get<GetUsersResponseType>(`/users?page=${currentPage}&count=${pageSize}`).then(res => res.data)
    },
    getFollow (id: number) {
        return instance.post<ToggleFollowResponseType>(`/follow/${id}`).then(res => res.data)
    },
    getUnFollow (id: number) {
        return instance.delete<ToggleFollowResponseType>(`/follow/${id}`).then(res => res.data)
    },
    getProfile (id: number | null) {
        return instance.get<ProfileType>(`/profile/${id}`)
    },
    getProfileStatus (id: number) {
        return instance.get<string>(`/profile/status/${id}`)
    },
    updateProfileStatus (status: string | null) {
        return instance.put<UpdateProfileStatusType>(`/profile/status/`, {status:status})
    },
    authMe () {
        return instance.get<MeResponseType>(`/auth/me`).then(res => res.data)
    },
    login (email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
        return instance.post<LoginResponseType>(`/auth/login`, {email, password, rememberMe, captcha}).then(res => res.data)
    },
    logout () {
        return instance.delete<LogoutResponseType>(`/auth/login`).then(res => res.data)
    },
    setAvatar (avatarFile: any) {
        let formData = new FormData();
        formData.append('image', avatarFile)
        return instance.put(`/profile/photo`, formData,  {headers: {
            'Content-Type': 'multipar/form-data'
        }
    })
    },
    saveProfileData (profileData: ProfileType) {
        return instance.put<SaveProfileDataType>(`/profile`, profileData)
    },
    getCaptcha () {
        return instance.get<CaptchaType>(`/security/get-captcha-url/`)
    }
}

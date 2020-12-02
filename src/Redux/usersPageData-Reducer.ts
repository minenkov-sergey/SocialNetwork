import { API } from '../api/api';
import { PhotosType } from '../types/types';

type InitialStateType = typeof initialState

type UserType = {
    id: string
    name: string
    status: string | null
    photos: PhotosType
    followed: boolean
}

let initialState = {
    usersData: [] as Array<UserType>,
    pageSize: 30,
    totalUsersCount: 20,
    currentPage: 1,
    isFetching: false,
    isButtonDisabled: [] as Array<number>
}

const FOLLOW = 'usersPageData-Reducer/FOLLOW'
const UNFOLLOW = 'usersPageData-Reducer/UNFOLLOW'
const SET_USERS = 'usersPageData-Reducer/SET_USERS'
const SET_PAGE = 'usersPageData-Reducer/SET_PAGE'
const SET_TOTALCOUNT = 'usersPageData-Reducer/SET_TOTALCOUNT'
const TOGGLE_ISFETCHING = 'usersPageData-Reducer/TOGGLE_ISFETCHING'
const BUTTON_DISABLE = 'usersPageData-Reducer/BUTTON_DISABLE'




const usersPageDataReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                usersData: state.usersData.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u;
                })
            }
        }
        case UNFOLLOW: {
            return {
                ...state,
                usersData: state.usersData.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u;
                })
            }
        }
        case SET_USERS: {
            return {
                ...state,
                usersData: action.users
            }
        }
        case SET_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case SET_TOTALCOUNT: {
            return {
                ...state,
                totalUsersCount: action.totalCount
            }
        }
        case TOGGLE_ISFETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case BUTTON_DISABLE: {
            return {
                ...state,
                isButtonDisabled: action.toogle === true ? [...state.isButtonDisabled, action.userId]
                    : state.isButtonDisabled.filter(id => id !== action.userId)
            }
        }
        default:
            return state;
    }
}

type setFollowACType = { type: typeof FOLLOW, userId: number}
export const setFollowAC = (userId: number): setFollowACType => ({ type: FOLLOW, userId })

type setUnFollowACType = { type: typeof UNFOLLOW, userId: number}
export const setUnFollowAC = (userId: number): setUnFollowACType => ({ type: UNFOLLOW, userId })

type setUsersACType = { type: typeof SET_USERS, users: Array<UserType>}
export const setUsersAC = (users: Array<UserType>): setUsersACType => ({ type: SET_USERS, users })

type setCurrentPageACType = { type: typeof SET_PAGE, currentPage: number}
export const setCurrentPageAC = (currentPage: number): setCurrentPageACType => ({ type: SET_PAGE, currentPage })

type setTotalUsersCountACType = { type: typeof SET_TOTALCOUNT, totalCount: number}
export const setTotalUsersCountAC = (totalCount: number): setTotalUsersCountACType => ({ type: SET_TOTALCOUNT, totalCount })

type toggleIsFetchingACType = { type: typeof TOGGLE_ISFETCHING, isFetching: boolean}
export const toggleIsFetchingAC = (isFetching: boolean): toggleIsFetchingACType => ({ type: TOGGLE_ISFETCHING, isFetching })

type buttonDisableACType = { type: typeof BUTTON_DISABLE, toggle: boolean, userId: number}
export const buttonDisableAC = (toggle: boolean, userId: number): buttonDisableACType => ({ type: BUTTON_DISABLE, toggle, userId })

export const setUsersTC = (currentPage: number, pageSize: number) => {
    return async (dispatch: any) => {
        dispatch(toggleIsFetchingAC(true))
        dispatch(setCurrentPageAC(currentPage))
        let response = await API.getUsers(currentPage, pageSize)
        dispatch(setUsersAC(response.items))
        dispatch(setTotalUsersCountAC(response.totalCount))
        dispatch(toggleIsFetchingAC(false))
    }
}


export const unFollowTC = (userId: number) => {
    return async (dispatch: any) => {
        dispatch(buttonDisableAC(true, userId))
        let response = await API.getUnFollow(userId)
        if (response.resultCode === 0) { dispatch(setUnFollowAC(userId)) }
        dispatch(buttonDisableAC(false, userId))
    }
}

export const followTC = (userId: number) => {
    return async (dispatch: any) => {
        dispatch(buttonDisableAC(true, userId))
        let response = await API.getFollow(userId)
        if (response.resultCode === 0) { dispatch(setFollowAC(userId)) }
        dispatch(buttonDisableAC(false, userId))
    }
}



export default usersPageDataReducer;
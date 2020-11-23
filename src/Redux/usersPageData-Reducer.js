import { API } from './../api/api';

let initialState = {
    usersData: [],
    pageSize: 30,
    totalUsersCount: 20,
    currentPage: 1,
    isFetching: false,
    isButtonDisabled: []
}

const FOLLOW = 'usersPageData-Reducer/FOLLOW'
const UNFOLLOW = 'usersPageData-Reducer/UNFOLLOW'
const SET_USERS = 'usersPageData-Reducer/SET_USERS'
const SET_PAGE = 'usersPageData-Reducer/SET_PAGE'
const SET_TOTALCOUNT = 'usersPageData-Reducer/SET_TOTALCOUNT'
const TOGGLE_ISFETCHING = 'usersPageData-Reducer/TOGGLE_ISFETCHING'
const BUTTON_DISABLE = 'usersPageData-Reducer/BUTTON_DISABLE'

export const setFollowAC = (userId) => ({ type: FOLLOW, userId })

export const setUnFollowAC = (userId) => ({ type: UNFOLLOW, userId })

export const setUsersAC = (users) => ({ type: SET_USERS, users })

export const setCurrentPageAC = (currentPage) => ({ type: SET_PAGE, currentPage })

export const setTotalUsersCountAC = (totalCount) => ({ type: SET_TOTALCOUNT, totalCount })

export const toggleIsFetchingAC = (isFetching) => ({ type: TOGGLE_ISFETCHING, isFetching })

export const buttonDisableAC = (toggle, userId) => ({ type: BUTTON_DISABLE, toggle, userId })

const usersPageDataReducer = (state = initialState, action) => {
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

export const setUsersTC = (currentPage, pageSize) => {
    return async (dispatch) => {
        dispatch(toggleIsFetchingAC(true))
        dispatch(setCurrentPageAC(currentPage))
        let response = await API.getUsers(currentPage, pageSize)
        dispatch(setUsersAC(response.items))
        dispatch(setTotalUsersCountAC(response.totalCount))
        dispatch(toggleIsFetchingAC(false))
    }
}


export const unFollowTC = (userId) => {
    return async (dispatch) => {
        dispatch(buttonDisableAC(true, userId))
        let response = await API.getUnFollow(userId)
        if (response.resultCode === 0) { dispatch(setUnFollowAC(userId)) }
        dispatch(buttonDisableAC(false, userId))
    }
}

export const followTC = (userId) => {
    return async (dispatch) => {
        dispatch(buttonDisableAC(true, userId))
        let response = await API.getFollow(userId)
        if (response.resultCode === 0) { dispatch(setFollowAC(userId)) }
        dispatch(buttonDisableAC(false, userId))
    }
}



export default usersPageDataReducer;
import { createSelector } from "reselect"
import { AppStateType } from "../redux-store"

export const getUsersData = (state: AppStateType) => {
    return state.usersPageData.usersData
}
export const getUsersDataSuperSelector = createSelector( getUsersData, (users) => { return users}) 

export const getPageSize = (state: AppStateType) => {
    return state.usersPageData.pageSize
}
export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPageData.totalUsersCount
}
export const getCurrentPage = (state: AppStateType) => {
    return state.usersPageData.currentPage
}
export const getStatusIsFetching = (state: AppStateType) => {
    return state.usersPageData.isFetching
}
export const getButtonStatus = (state: AppStateType) => {
    return state.usersPageData.isButtonDisabled
}
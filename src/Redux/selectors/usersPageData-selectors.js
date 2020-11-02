import { createSelector } from "reselect"

export const getUsersData = (state) => {
    return state.usersPageData.usersData
}
export const getUsersDataSuperSelector = createSelector( getUsersData, (users) => { return users}) 

export const getPageSize = (state) => {
    return state.usersPageData.pageSize
}
export const getTotalUsersCount = (state) => {
    return state.usersPageData.totalUsersCount
}
export const getCurrentPage = (state) => {
    return state.usersPageData.currentPage
}
export const getStatusIsFetching = (state) => {
    return state.usersPageData.isFetching
}
export const getButtonStatus = (state) => {
    return state.usersPageData.isButtonDisabled
}
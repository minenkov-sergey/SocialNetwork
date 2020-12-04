import React from 'react'
import {useEffect} from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Users from './Users'
import Preloader from '../common/Preloader'
import { setUsersTC, followTC, unFollowTC } from '../../Redux/usersPageData-Reducer';
import { getPageSize, getTotalUsersCount, getCurrentPage, getStatusIsFetching, getButtonStatus, getUsersDataSuperSelector } from '../../Redux/selectors/usersPageData-selectors';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { UserType } from '../../types/types'
import { AppStateType } from '../../Redux/redux-store'

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
    isButtonDisabled: Array<number>
}

type MapDispatchPropsType = {
    unfollowButton: (userId:number) => void
    followButton: (userId:number) => void
    setUsers: (currentPage: number, pageSize: number) => void
}

type OwnPropsType = {
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType
    
const UsersContainer: React.FC<PropsType> = (props) => {

    useEffect ( () => {
        props.setUsers(props.currentPage, props.pageSize)
    // eslint-disable-next-line
    },[])

    const onClickPage = (pageNumber: number) => {
        props.setUsers(pageNumber, props.pageSize)
    }
        return (<>
            {props.isFetching? <Preloader /> : null}

            <Users totalUsersCount={props.totalUsersCount}
                pageSize={props.pageSize}
                currentPage={props.currentPage}
                users={props.users}
                unfollowButton={props.unfollowButton}
                followButton={props.followButton}
                onClickPage={onClickPage}
                isButtonDisabled={props.isButtonDisabled}
            />
            </>
        )
    }


let mapStatetoProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsersDataSuperSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getStatusIsFetching(state),
        isButtonDisabled: getButtonStatus(state)
    }
}

export default compose(
    withAuthRedirect,
    (connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStatetoProps, {followButton: followTC,
        unfollowButton: unFollowTC,
        setUsers: setUsersTC})
)(UsersContainer))
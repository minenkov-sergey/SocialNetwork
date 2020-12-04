import React from 'react'
import {useEffect} from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Users from './UsersJS'
import Preloader from '../common/Preloader'
import { setUsersTC, followTC, unFollowTC, setCurrentPageAC, buttonDisableAC } from '../../Redux/usersPageData-Reducer';
import { getPageSize, getTotalUsersCount, getCurrentPage, getStatusIsFetching, getButtonStatus, getUsersDataSuperSelector } from '../../Redux/selectors/usersPageData-selectors';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';


const UsersContainer = (props) => {

    useEffect ( () => {
        props.setUsers(props.currentPage, props.pageSize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const onClickPage = (pageNumber) => {
        props.setUsers(pageNumber, props.pageSize)
    }
        return (<>
            {props.isFetching === true ? <Preloader /> : null}

            <Users totalUsersCount={props.totalItemsCount}
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


let mapStatetoProps = (state) => {
    return {
        users: getUsersDataSuperSelector(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getStatusIsFetching(state),
        isButtonDisabled: getButtonStatus(state)
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        followButton: followTC,
        unfollowButton: unFollowTC,
        setPage: setCurrentPageAC,
        buttonDisable: buttonDisableAC,
        setUsers: setUsersTC
    }
}

export default compose(
    withAuthRedirect,
    (connect(mapStatetoProps, mapDispatchToProps()))
)(UsersContainer)
import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Users from './Users'
import Preloader from './../common/Preloader'
import { setUsersTC, followTC, unFollowTC, setCurrentPageAC, buttonDisableAC } from './../../Redux/usersPageData-Reducer';
import { getPageSize, getTotalUsersCount, getCurrentPage, getStatusIsFetching, getButtonStatus, getUsersDataSuperSelector } from './../../Redux/selectors/usersPageData-selectors';


class UsersComponent extends React.Component {

    componentDidMount = () => {
        this.props.setUsers(this.props.currentPage, this.props.pageSize)
    }
    onClickPage = (pageNumber) => {
        this.props.setUsers(pageNumber, this.props.pageSize)

        // this.props.toggleIsFetching(true)
        // this.props.setPage(pageNumber)
        // API.getUsers(pageNumber, this.props.pageSize).then(response => {
        //     this.props.setUsers(response.items)
        //     this.props.toggleIsFetching(false)
        // })
    }

    render() {

        return (<>
            {this.props.isFetching === true ? <Preloader /> : null}

            <Users totalUsersCount={this.props.totalItemsCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                users={this.props.users}
                unfollowButton={this.props.unfollowButton}
                followButton={this.props.followButton}
                onClickPage={this.onClickPage}
                isButtonDisabled={this.props.isButtonDisabled}
            />
        </>
        )
    }
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
    //withAuthRedirect,
    (connect(mapStatetoProps, mapDispatchToProps))
)(UsersComponent)
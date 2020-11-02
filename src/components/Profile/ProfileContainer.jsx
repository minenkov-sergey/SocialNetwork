import React from 'react';
import Profile from './Profile'
import { connect } from 'react-redux'
import {getUserProfileTC, getProfileStatusTC, updateProfileStatusTC, setSaveAvatarTC, saveProfileDataTC} from './../../Redux/profilePageData-Reducer'
import { withRouter } from 'react-router-dom';
//import { withAuthRedirect } from './../../hoc/withAuthRedirect';
import { compose } from 'redux';



class ProfileContainer extends React.Component {

  refreshProfile () {
    let userId = this.props.match.params.userId
    if (!userId) {
      userId = this.props.loggedId
      if (!userId) {
        this.props.history.push('/login')
      }
    } 
    this.props.setUserProfile(userId)
    this.props.getStatus(userId)
  }

  componentDidMount = () => {
    this.refreshProfile()
}

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (this.props.match.params.userId != prevProps.match.params.userId) {
    this.refreshProfile()
    }
  }
  render () {
    return (
      <Profile {...this.props} userProfile={this.props.userProfile} status={this.props.status} isOwner = {!this.props.match.params.userId} />
    )
  }
}


let mapStatetoProps = (state) => ({
    userProfile: state.profilePageData.userProfile,
    status: state.profilePageData.status,
    loggedId: state.authData.id,
    
  })

export default compose (
  connect(mapStatetoProps, {setUserProfile:getUserProfileTC, getStatus:getProfileStatusTC, updateStatus:updateProfileStatusTC, saveAvatar: setSaveAvatarTC, saveProfileDataTC: saveProfileDataTC}),
  withRouter,
  //withAuthRedirect
) ( ProfileContainer )

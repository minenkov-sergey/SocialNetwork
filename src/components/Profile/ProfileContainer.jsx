import React from 'react';
import Profile from './Profile'
import {useEffect} from 'react'
import { connect } from 'react-redux'
import { getUserProfileTC, getProfileStatusTC, updateProfileStatusTC, setSaveAvatarTC, saveProfileDataTC } from '../../Redux/profilePageData-Reducer'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';


const ProfileContainer = (props) => {

  useEffect(() => {
    let userId = props.match.params.userId
    if (!userId) {
      userId = props.loggedId
      if (!userId) {
        props.history.push('/login')
      }
    }
    props.setUserProfile(userId)
    props.getStatus(userId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[props.match.params.userId])

  return (
    <Profile {...props} userProfile={props.userProfile} status={props.status} isOwner={!props.match.params.userId} />
  )
}

let mapStatetoProps = (state) => ({
  userProfile: state.profilePageData.userProfile,
  status: state.profilePageData.status,
  loggedId: state.authData.id,

})

let mapDispatchtoProps = () => ({
  
    setUserProfile: getUserProfileTC,
    getStatus: getProfileStatusTC,
    updateStatus: updateProfileStatusTC,
    saveAvatar: setSaveAvatarTC,
    saveProfileDataTC: saveProfileDataTC
  })


export default compose(
  withAuthRedirect,
  connect(mapStatetoProps, mapDispatchtoProps()),
  withRouter
)(ProfileContainer)

import React from 'react';
import styles from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';



const Profile = (props) => {
  
  return (
    <div>
        <ProfileInfo isOwner = {props.isOwner} 
        userProfile={props.userProfile} 
        status={props.status} 
        updateStatus={props.updateStatus} 
        saveAvatar = {props.saveAvatar} 
        saveProfileDataTC ={props.saveProfileDataTC}/>
        <MyPostsContainer store = {props.store}/>
    </div>
  )
}
export default Profile;
import React from 'react';
import styles from './ProfileInfo.module.css';
import Preloader from './../../common/Preloader'
import ProfileStatusHooks from './ProfileStatusHooks.jsx'
import vkLogo from './../../../assets/ProfilePage/vkLogo.png'
import facebookLogo from './../../../assets/ProfilePage/facebookLogo.png'
import twitterLogo from './../../../assets/ProfilePage/twitterLogo.png'
import githubLogo from './../../../assets/ProfilePage/githubLogo.png'
import instLogo from './../../../assets/ProfilePage/instLogo.png'
import wwwLogo from './../../../assets/ProfilePage/wwwLogo.png'
import youtubeLogo from './../../../assets/ProfilePage/youtubeLogo.svg'
import userAvatar from './../../../assets/UsersPage/userAvatar.png'
import { useState } from 'react';
import ProfileDataReduxForm from './ProfileDataForm';




const ProfileInfo = (props) => {

  const [toggle, editModeToggle] = useState(false)


  if (!props.userProfile) {
    return <Preloader />
  }

  const avatarSelected = (e) => {
    if (e.target.files.length)
    props.saveAvatar (e.target.files[0])
  }

  const onSubmit = (formdata) => {
    props.saveProfileDataTC(formdata).then ( () => {
      editModeToggle(false)
    })
    }


  return (
    <div>
      <div>
        <img className={styles.wallpaper} alt={''} src='https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/advice/maps-satellite-images/satellite-image-of-globe.jpg'></img>
      </div>
      <div>
        <img src={props.userProfile.photos.large || userAvatar} alt={''}></img>
      </div>
      <div>
        {props.isOwner && <input type={'file'}  onChange={avatarSelected}/>}
      </div>
      <div>
      <b>Статус:</b><ProfileStatusHooks status={props.status} updateStatus={props.updateStatus} />
      </div>
      {toggle? 
      <ProfileDataReduxForm initialValues={props.userProfile} editModeToggle={editModeToggle}  onSubmit={onSubmit}/> 
      : <ProfileData userProfile={props.userProfile} isOwner={props.isOwner} editModeToggle={editModeToggle}/>}
    </div>
  )
}






const ProfileData = (props) => {
  
  

  return (
    <div>
      { props.isOwner? <button onClick={ () => {props.editModeToggle(true)} }>EditMode</button> : null}
  <div>
  <b>Имя: </b>{props.userProfile.fullName}
  </div>
  <div>
    <b>Обо мне: </b>{props.userProfile.aboutMe}
  </div>
  <div>
    <div>
    <b>В поиске работы? -  </b>{props.userProfile.lookingForAJob === true ? ' Да' : ' Нет'}
    </div>
    <div>
    <b>Профессиональные навыки:</b>{props.userProfile.lookingForAJobDescription}
    </div>
  </div>
  <b>Контакты: </b>
  <div className={styles.contacts}>
    <span><img src={facebookLogo} alt={''}></img>{props.userProfile.contacts.facebook}
    </span>
    <span><img src={wwwLogo} alt={''}></img>{props.userProfile.contacts.website}
    </span>
    <span><img src={vkLogo} alt={''}></img>{props.userProfile.contacts.vk}
    </span>
    <span><img src={twitterLogo} alt={''}></img>{props.userProfile.contacts.twitter}
    </span>
    <span><img src={instLogo} alt={''}></img>{props.userProfile.contacts.instagram}
    </span>
    <span><img src={youtubeLogo} alt={''}></img> {props.userProfile.contacts.youtube}
    </span>
    <span><img src={githubLogo} alt={''}></img>{props.userProfile.contacts.github}
    </span>
    <span><img src={'mainLink logo'} alt={''}></img>{props.userProfile.contacts.mainLink}
    </span>
  </div>
  </div>)
}
export default ProfileInfo;
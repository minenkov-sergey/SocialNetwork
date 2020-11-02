import React from 'react';
import styles from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import FriendsBar from './FriendsBar/FriendsBar'; 
import musicIcon from './../../assets/NavBar/music.png'
import settingsIcon from './../../assets/NavBar/settingsIcon.png'
import usersIcon from './../../assets/NavBar/usersIcon.png'
import newsIcon from './../../assets/NavBar/newsIcon.png'
import messagesIcon from './../../assets/NavBar/messagesIcon.png'
import homeIcon from './../../assets/NavBar/homeIcon.png'


const Navbar = (props) => {
  return (
    <div className={styles.navbar}>
      <div className={styles.menubar}>
        <div>
        <img src={homeIcon} alt={''}></img>
          <NavLink activeClassName={styles.activeLink} to='/Profile'>Profile</NavLink>
        </div>
        <div>
        <img src={messagesIcon} alt={''}></img>
          <NavLink activeClassName={styles.activeLink} to='/Dialogs'>Messages</NavLink>
        </div>
        <div>
        <img src={newsIcon} alt={''}></img>
          <NavLink activeClassName={styles.activeLink} to={'/News'}>News</NavLink>
        </div>
        <div>
        <img src={musicIcon} alt={''}></img>
          <NavLink activeClassName={styles.activeLink} to={'/Music'}>Music</NavLink>
        </div>
        <div>
        <img src={settingsIcon} alt={''}></img>
          <NavLink activeClassName={styles.activeLink} to={'/Settings'}>Settings</NavLink>
        </div>
        <div>
          <img src={usersIcon} alt={''}></img>
          <NavLink activeClassName={styles.activeLink} to={'/Users'}>Users</NavLink>
        </div>
      </div>
      <div className={styles.friendsBar}>
        <FriendsBar bestFriendsData={props.sidebarData.bestFriendsData} />
      </div>
    </div>
  )
}
export default Navbar;
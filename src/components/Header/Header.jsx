import React from 'react';
import styles from './Header.module.css'
import { NavLink } from 'react-router-dom';
import headerLogoIcon from './../../assets/headerLogoIcon.png'


const Header = (props) => {
  const logOutButton = () => {
    props.logout()
  }
  return (
    <header className={styles.header}>
      <img src={headerLogoIcon} alt={''}></img>
      <div className={styles.loginbar}>
        {props.isLogged ? <div>
          <div>
            {props.id}
          </div>
          <div>
            {props.email}
          </div>
          <div>
            {props.login}
          </div>
          <div>
            <button onClick={logOutButton}> LogOut</button>
          </div>
                      </div>
          : <NavLink to='/login'>Login</NavLink>}
      </div>
    </header>

  )
}
export default Header;
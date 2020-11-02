import React from 'react';
import styles from './Friend.module.css'


const Friend = (props) => {
    return (
        <div className={styles.friendAvatar} >
            <div>
                <img src='https://prioritet38.ru/wp-content/uploads/2020/07/user-avatar.png' alt={''}></img>
            </div>
            <div>
                {props.name}
            </div>
        </div>
    )
}

export default Friend;
import React from 'react'
import styles from './Users.module.css'
import * as axios from 'axios'
import userAvatar from './../../assets/UsersPage/userAvatar.png'

const Users = (props) => {

    if (props.users.length === 0) {
        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => { 
            props.setUsers(response.data.items)}
        )}

    // props.setUsers([
    //     { id: 1, followed: true, avatar:'https://prioritet38.ru/wp-content/uploads/2020/07/user-avatar.png', name: 'Dmitry K.', status: 'Hey yo', location: {contry: 'Belarus', city: 'Grodno'} },
    //     { id: 2, followed: false, avatar:'https://prioritet38.ru/wp-content/uploads/2020/07/user-avatar.png' , name: 'Svetlana D.', status: 'lovely', location: {contry: 'USA', city: 'Manhattan'} },
    //     { id: 3, followed: false, avatar:'https://prioritet38.ru/wp-content/uploads/2020/07/user-avatar.png' , name: 'Sergey S.', status: 'subscribe pls', location: {contry: 'Bulgaria', city: 'Bulg'} },
    //     { id: 4, followed: true, avatar:'https://prioritet38.ru/wp-content/uploads/2020/07/user-avatar.png' , name: 'Andrew T.', status: 'dunno', location: {contry: 'Russia', city: 'Moscow'} }
    // ])

    return (
        <div>
            {props.users.map(u =>
                <div key={u.id} className={styles.userInfo}>
                    <div className={styles.avbut}>
                        <div className={styles.avatar}>
                            <img src={u.photos.small != null ? u.photos.small : userAvatar }></img>
                        </div>
                        <div className={styles.followButton}>
                            {u.followed ?
                                <button onClick={() => { props.unfollowButton(u.id) }}>Unfollow</button>
                                : <button onClick={() => { props.followButton(u.id) }}>Follow</button>}
                        </div>
                    </div>
                    <div className={styles.namestatus}>
                        <div className={styles.name}>
                            {u.name}
                        </div>
                        <div className={styles.status}>
                            {u.status}
                        </div>
                    </div>
                    <div className={styles.location}>
                        <div className={styles.contry}>
                            {'u.location.contry'}
                        </div>
                        <div className={styles.city}>
                            {'u.location.city'}
                        </div>
                    </div>
                </div>)}
            <div className={styles.moreUsersButton}>
                <button>Show more</button>
            </div>
        </div >
    )
}

export default Users;
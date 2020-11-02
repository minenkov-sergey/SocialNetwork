import React from 'react';
import styles from './FriendsBar.module.css';
import Friend from './Friends/Friend';

const FriendsBar = (props) => {
    let bestFriends = props.bestFriendsData.map((friend) => {
        return (
            <Friend name={friend.name} id={friend.id} key={friend.id} />
        )
    }
    );
    return (
        <div className={styles.content}>
            <div className={styles.h2}>Friends</div>
            <div className={styles.bestFriendsitem}>
                {bestFriends}
            </div>
        </div>
    )
}

export default FriendsBar;
import React from 'react';
import styles from './Post.module.css';

const Post = (props) => {
  return (
    <div>
      <div className={styles.post}>
        <div className={`${styles.item} ${styles.gold}`}>
        <img src='https://html5css.ru/howto/img_avatar.png' alt={''}></img>
        {props.message}
        <br></br>
        {props.likecount}
          <button>Like</button>
          <button>Dislike</button>
        </div>
      </div>
    </div>
  )
}
export default Post;
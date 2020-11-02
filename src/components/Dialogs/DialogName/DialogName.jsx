import React from 'react';
import styles from './../Dialogs.module.css'
import { NavLink } from 'react-router-dom';

const DialogName = (props) => {
    return (
        <div className={styles.dialogsName + " " + styles.active}>
            <NavLink className={styles.dialogsName} to={'/dialogs/' + props.id}>{props.name}</NavLink>
        </div>
    )
}


export default DialogName;
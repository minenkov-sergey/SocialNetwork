
import React, { useState } from 'react';
import { useEffect } from 'react';


const ProfileStatusHooks = (props) => {

    let [editMode, editModeToggle] = useState(true)
    let [status, setStatusText] = useState(props.status)

    useEffect( () => {
        setStatusText(props.status)
    }, [props.status] )

const editModeOn = () => {
    editModeToggle(false)
}
const editModeOff = () => {
    editModeToggle(true)
    props.updateStatus(status)
}
const onStatusChanged = (e) => {
    setStatusText(e.currentTarget.value)
}

        return (
            <div> {editMode ?
                <div>
                    <span onDoubleClick={editModeOn}>{props.status || '--No Status--'}</span>
                </div>
                :
                <div>
                    <input onChange= {onStatusChanged} onBlur={editModeOff} autoFocus={true} value = {status} /> 
                </div>
            }</div>
        )
    }

export default ProfileStatusHooks
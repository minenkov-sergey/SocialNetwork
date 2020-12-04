
import React, { useState, ChangeEvent } from 'react';
import { useEffect } from 'react';

type PropsType = {
    status: string
    updateStatus: (status:string) => void
}


const ProfileStatus: React.FC<PropsType> = (props) => {

    let [editMode, editModeToggle] = useState<boolean>(true)
    let [status, setStatusText] = useState<string>(props.status)

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
const onStatusChanged = (e: ChangeEvent<HTMLInputElement>) => {
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

export default ProfileStatus
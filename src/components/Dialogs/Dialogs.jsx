import React from 'react';
import styles from './Dialogs.module.css'
import DialogName from './DialogName/DialogName';
import Message from './Message/Message';
import AddMessageReduxForm from './AddMessage/AddMessageForm';


const Dialogs = (props) => {

    let dialogsElements = props.dialogsPageData.dialogsNamesData.map((dialog) => {
        return <DialogName name={dialog.name} id={dialog.id} key={dialog.id} />
    });

    let messagesElements = props.dialogsPageData.messagesData.map((msg) => {
        return <Message message={msg.message} id={msg.id} key={msg.id} />
    })


    const onSubmit = (value) => {
        props.addMessage(value.newMessageData)
    }

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsNames}>
                {dialogsElements}
            </div>
            <div className={styles.messages}>
                {messagesElements}
                <div>
                    <AddMessageReduxForm onSubmit={onSubmit}/>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;

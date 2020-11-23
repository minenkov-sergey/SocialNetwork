import React from 'react';
import { Field, reduxForm } from 'redux-form';
import styles from './AddMessageForm.module.css'

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={styles.textarea}>
                <Field name='newMessageData' type='textarea' component='input' placeholder='Введите сообщение'/>
            </div>
            <div className={styles.text_button}>
                <button>Отправить сообщение</button>
            </div>
        </form>
    )
}

const AddMessageReduxForm = reduxForm({
    // a unique name for the form
    form: 'dialogsNewMessageForm'
  })(AddMessageForm)

  export default AddMessageReduxForm
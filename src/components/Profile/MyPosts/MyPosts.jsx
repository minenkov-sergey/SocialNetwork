import React from 'react';
import styles from './MyPosts.module.css';
import Post from './Post/Post.jsx';
import { Field, reduxForm } from 'redux-form';
import {TextArea} from './../../common/FormComponents/FormComponents'
import { maxLengthCreator } from '../../common/FormComponents/validators';
import { required } from './../../common/FormComponents/validators';



const MyPosts = (props) => {
    let postsElements = props.postsPageData.profilePageData.map((post) => {
        return <Post message={post.message} likecount={post.likecount} key={post.id} />
    }
    );

    const onSubmit = (value) => {
        props.addPost(value.newMessageData)
    }

    


    return (
        <div className={styles.myposts}>
            <div><h3>Myposts</h3></div>
                <div>
                <AddMessageReduxForm onSubmit={onSubmit}/>
                </div>
            <div className={styles.post}>
                {postsElements}
            </div>
        </div>
    )
}
export default MyPosts;

const maxLengthText = maxLengthCreator(10)

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={styles.postbox}>
                <div>
                    <Field  name='newMessageData' type='textarea' component={ TextArea } placeholder='Введите сообщение' validate={[required, maxLengthText]}/>
                </div>
                <div>
                    <button>Add Post</button>
                </div>
            </div>
        </form>
    )
}





const AddMessageReduxForm = reduxForm({
    // a unique name for the form
    form: 'profileNewMessageForm'
})(AddMessageForm)
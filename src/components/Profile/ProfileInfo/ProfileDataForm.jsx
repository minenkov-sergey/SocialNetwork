
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import styles from './ProfileDataForm.module.css';
import vkLogo from './../../../assets/ProfilePage/vkLogo.png'
import facebookLogo from './../../../assets/ProfilePage/facebookLogo.png'
import twitterLogo from './../../../assets/ProfilePage/twitterLogo.png'
import githubLogo from './../../../assets/ProfilePage/githubLogo.png'
import instLogo from './../../../assets/ProfilePage/instLogo.png'
import wwwLogo from './../../../assets/ProfilePage/wwwLogo.png'
import youtubeLogo from './../../../assets/ProfilePage/youtubeLogo.svg'
import { Input } from '../../common/FormComponents/FormComponents';

const ProfileDataForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <button>Save</button>
            </div>
            <div>
            
                <b>Имя: </b><Field name='fullName' component={Input} type='text' />
            </div>
            <div>
                <b>Обо мне: </b><Field name='aboutMe' component={Input} type='text' />
            </div>
            <div>
                <div>
                    <b>В поиске работы? -  </b> <Field name='lookingForAJob' component={Input} type='checkbox' />
                </div>
                <div>
                <b>Профессиональные навыки:</b> <Field name='lookingForAJobDescription' component={Input} type='text' />
                </div>
            </div>
            <b>Контакты: </b>
            <div className={styles.contacts}>
                <span><img src={facebookLogo} alt={''}></img><Field name='contacts.facebook' component={Input} type='text' />
                </span>
                <span><img src={wwwLogo} alt={''}></img><Field name='contacts.website' component={Input} type='text' />
                </span>
                <span><img src={vkLogo} alt={''}></img><Field name='contacts.vk' component={Input} type='text' />
                </span>
                <span><img src={twitterLogo} alt={''}></img><Field name='contacts.twitter' component={Input} type='text' />
                </span>
                <span><img src={instLogo} alt={''}></img><Field name='contacts.instagram' component={Input} type='text' />
                </span>
                <span><img src={youtubeLogo} alt={''}></img> <Field name='contacts.youtube' component={Input} type='text' />
                </span>
                <span><img src={githubLogo} alt={''}></img><Field name='contacts.github' component={Input} type='text' />
                </span>
            {/* <span><img src={'mainLink logo'} alt={''}></img>{props.userProfile.contacts.mainLink}</span> */}
            </div>
        </form>
    )
}

const ProfileDataReduxForm = reduxForm({
    // a unique name for the form
    form: 'ProfileDataForm'
})(ProfileDataForm)


export default ProfileDataReduxForm



{/* 
//   <div>
//                 <Field name='email' component={Input} type='text' placeholder='Login' validate={[required]}/>
//             </div>
//             <div>
//             <Field name='password' component={Input} placeholder='Password' validate={[required]} type='password'/>
//             </div>
//             <div>
//             <Field name='rememberMe' component={Input} type='checkbox' /> Remember Me */}

import  React  from 'react';
import styles from './FormComponents.module.css'



export const TextArea = ({input, meta, ...props}) => {

    const hasError = meta.touched && meta.error

    return (
        <div className={styles.formcomponent + ' ' + (hasError? styles.error : "" )}>
            <div>
                <textarea {...props} {...input}/>
            </div>
            <div>
                {hasError &&<span>{meta.error}</span>}
            </div>
        </div>
    )
}


export const Input = ({input, meta, ...props}) => {

    const hasError = meta.touched && meta.error

    return (
        <div className={styles.formcomponent + ' ' + (hasError? styles.error : "" )}>
            <div>
                <input {...props} {...input}/>
            </div>
            <div>
                {hasError &&<span>{meta.error}</span>}
            </div>
        </div>
    )
}

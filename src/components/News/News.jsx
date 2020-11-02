import React from 'react';
import styles from './News.module.css'


const News = (props) => {
    return (
        <div>
            <div className={styles.pageHeader}>
                News
            </div>
            {props.newsHT.map(e =>
                <div key={e.id} className={styles.newsRows}>
                    <div className={styles.newsHeader}>
                        {e.header}
                    </div>
                    <div className={styles.newsText}>
                        {e.text}
                    </div>
                </div>)}
        </div>
    )
}
export default News;
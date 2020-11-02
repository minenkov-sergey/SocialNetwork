import React, { useState } from 'react'
import styles from './Paginator.module.css'


const Paginator = (props) => {
    let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize)
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i + ' ')
    }
    let portionSize = 10;
    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1) 
    let leftPortionElementNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionElementNumber = portionNumber * portionSize

    return (
        <div>
                { portionNumber > 1 && <button className={styles.leftButton} onClick={ () => {setPortionNumber (portionNumber - 1)} }>{'...'}</button>}
                {pages
                    .filter(f => 
                        f >= leftPortionElementNumber && f <= rightPortionElementNumber
                    )
                    .map(p => { 
                    return <span key = {p+1} className={props.currentPage === p && styles.activePage} onClick={(e) => { props.onClickPage(p) }}>{p}</span>
                })}
                {portionCount > portionNumber &&
                <button className={styles.rightButton} onClick={ () => {setPortionNumber (portionNumber + 1)} }>{'...'}</button>}
        </div >
    )
}

export default Paginator
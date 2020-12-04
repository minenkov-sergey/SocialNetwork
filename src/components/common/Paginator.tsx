import React, { useState } from 'react'
import styles from './Paginator.module.css'
import cn from 'classnames'

type PropsType = {
    totalItemsCount: number
    pageSize: number
    onClickPage: (pageNumber: number) => void
    currentPage: number
}

const Paginator: React.FC<PropsType> = (props) => {
    let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize)
    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let portionSize: number = 10;
    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState<number>(1)
    let leftPortionElementNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionElementNumber = portionNumber * portionSize

    return (
        <div>
            { portionNumber > 1 && <button className={styles.leftButton} onClick={() => { setPortionNumber(portionNumber - 1) }}>{'...'}</button>}
            {pages
                .filter(f => f >= leftPortionElementNumber && f <= rightPortionElementNumber)
                .map(p => {
                    return <span key={p + 1} className={ cn({[styles.activePage] : props.currentPage === p}, styles.paginator )} onClick={(e) => { props.onClickPage(p) }}>{p}</span>
                })}
            {portionCount > portionNumber &&
                <button className={styles.rightButton} onClick={() => { setPortionNumber(portionNumber + 1) }}>{'...'}</button>}
        </div >
    )
}

export default Paginator
import React from 'react'
import classes from './popNewsItem.module.scss'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface IPopNewsItem {
    id: number
    views: number
    text: string
}

const PopNewsItem: React.FC<IPopNewsItem> = ({ text, views }) => {
    return (
        <div className={classes.newsItem}>
            <span className={classes.newsItem__text}>
                {text}
            </span>
            <p className={classes.views}><FontAwesomeIcon icon={faEye} /> {views}</p>
        </div>
    )
}

export default PopNewsItem
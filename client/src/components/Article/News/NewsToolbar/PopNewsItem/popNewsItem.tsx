import React from 'react'
import classes from './popNewsItem.module.scss'
// import { faEye } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface IPopNewsItem {
    id: number
    text: string
    title: string
    link: string
    copyright: string
    date: string
}

const PopNewsItem: React.FC<IPopNewsItem> = ({ title, copyright, link }) => {
    return (
        <div className={classes.newsItem}>
            <a className={classes.newsItem_link} href={link}>
                <span className={classes.newsItem__text}>
                    {title}
                </span>
                {/* <p className={classes.views}><FontAwesomeIcon icon={faEye} /> {views}</p> */}
                <p className={classes.views}>{copyright}</p>
            </a>
        </div>
    )
}

export default PopNewsItem
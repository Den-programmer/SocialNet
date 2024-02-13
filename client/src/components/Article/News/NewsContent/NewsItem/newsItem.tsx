import React from 'react'
import classes from './newsItem.module.scss'

interface INewsItem {
    id: number
    title: string
    text: string
    link: string
    date: string
    copyright: string
    chooseNewsPageId: (itemId: number | null) => void
}

const NewsItem: React.FC<INewsItem> = ({ title, date, id, text, link, copyright, chooseNewsPageId }) => {
    return (
        <div onClick={() => chooseNewsPageId(id)} className={classes.newsItem}>
            <div className={classes.newsItem__body}>
                <p className={classes.date}>{date}</p>
                <h2 className={classes.newsItem__title}>{title}</h2>
                <p className={classes.newsItem__text}>
                    {text}
                </p>
                <div className={classes.newsItem__link}>
                    <a target="_blank" href={link}>{link}</a>
                </div>  
                <p className={classes.newsItem__copyright}>
                    {copyright}
                </p>
            </div>
        </div>
    )
}

export default NewsItem
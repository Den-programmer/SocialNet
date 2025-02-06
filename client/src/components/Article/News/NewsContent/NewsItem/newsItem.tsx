import React from 'react'
import classes from './newsItem.module.scss'
import { Link } from '@material-ui/core'

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
                    <Link
                        component="button"
                        target="_blank"
                        href={link}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {link}
                    </Link>
                </div>
                <p className={classes.newsItem__copyright}>
                    {copyright}
                </p>
            </div>
        </div>
    )
}

export default NewsItem
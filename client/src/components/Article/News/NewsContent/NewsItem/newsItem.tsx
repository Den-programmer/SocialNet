import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './newsItem.module.scss'

interface INewsItem {
    id: number
    title: string
    text: string
    date: string
    photo: string
    chooseNewsPageId: (itemId: number | null) => void
}

const NewsItem: React.FC<INewsItem> = ({ title, text, date, id, photo, chooseNewsPageId }) => {
    return (
        <NavLink onClick={() => chooseNewsPageId(id)} to={`/News/${id}`} className={classes.newsItem}>
            <img className={classes.newsItem__photo} src={photo} alt="" />
            <div className={classes.newsItem__body}>
                <p className={classes.date}>{date}</p>
                <h2 className={classes.newsItem__title}>{title}</h2>
                <p className={classes.newsItem__text}>
                    {text}
                </p>
            </div>
        </NavLink>
    )
}

export default NewsItem
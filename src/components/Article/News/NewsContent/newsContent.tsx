import React from 'react'
import classes from './newsContent.module.scss'
import { newsType } from '../../../../types/NewsTypes/newsTypes'
import NewsItem from './NewsItem/newsItem'

interface INewsContent {
    news: Array<newsType>
    chooseNewsPageId: (itemId: number | null) => void
}

const NewsContent:React.FC<INewsContent> = ({ news, chooseNewsPageId }) => {
    const NewsData = news.map((item: newsType) => {
        return <NewsItem key={item.id} chooseNewsPageId={chooseNewsPageId} id={item.id} title={item.title} text={item.text} photo={item.photo} date={item.date}/>
    })
    return (
        <div className={classes.newsContent}>
            {NewsData}
        </div>
    )
}

export default NewsContent
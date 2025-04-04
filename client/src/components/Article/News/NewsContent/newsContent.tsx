import React, { useEffect } from 'react'
import classes from './newsContent.module.scss'
import { newsType } from '../../../../types/NewsTypes/newsTypes'
import NewsItem from './NewsItem/newsItem'
import Preloader from '../../../common/preloader/preloader'

interface INewsContent {
    news: Array<newsType>
    isLoading: boolean
    chooseNewsPageId: (itemId: number | null) => void
    requestNews: () => void
    requestPopularNews: () => void
}

const NewsContent:React.FC<INewsContent> = ({ news, chooseNewsPageId, requestNews, requestPopularNews, isLoading }) => {
    useEffect(() => {
        requestNews()   
        requestPopularNews()
    }, [])
    if(isLoading) return <Preloader />
    const NewsData = news.map((item: newsType) => {
        return <NewsItem key={item.id} chooseNewsPageId={chooseNewsPageId} link={item.link} text={item.text} id={item.id} title={item.title} copyright={item.copyright} date={item.date}/>
    })
    return (
        <div className={classes.newsContent}>
            {NewsData}
        </div>
    )
}

export default NewsContent
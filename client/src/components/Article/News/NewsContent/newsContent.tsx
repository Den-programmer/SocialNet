import React from 'react'
import classes from './newsContent.module.scss'
import NewsItem from './NewsItem/newsItem'
import Preloader from '../../../common/preloader/preloader'
import { useGetAllNewsQuery } from '../../../../DAL/newsAPi'
import { chooseNewsPageId } from '../../../../BLL/reducer-news'

interface INewsContent { }

const NewsContent: React.FC = () => {
    const { data: articles, isLoading, error } = useGetAllNewsQuery()

    if (isLoading) return <Preloader />
    if (error) return <div className={classes.error}>Error loading news</div>
    if (!articles || articles.length === 0) return <div>No news found</div>

    return (
        <div className={classes.newsContent}>
            {articles.map((item) => (
                <NewsItem
                    key={item.id}
                    chooseNewsPageId={chooseNewsPageId}
                    link={item.link}
                    text={item.text}
                    id={item.id}
                    title={item.title}
                    copyright={item.copyright}
                    date={item.date}
                />
            ))}
        </div>
    )
}

export default NewsContent
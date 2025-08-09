import React from 'react'
import { newsType } from '../../../../types/NewsTypes/newsTypes'
import classes from './newsToolbar.module.scss'
import PopNewsItem from './PopNewsItem/popNewsItem'
import { useGetPopularNewsQuery } from '../../../../DAL/newsAPi'
import { ServerResType } from '../../../../DAL/api'

interface INewsToolbar {}

const NewsToolbar:React.FC<INewsToolbar> = ({  }) => {
    const { data: popularNews = [] } = useGetPopularNewsQuery<ServerResType<Array<newsType>>>()
    const popNewsData = popularNews.map((item: newsType) => {
        return <PopNewsItem key={item.id} id={item.id} 
        text={item.text} title={item.title} 
        copyright={item.copyright} 
        link={item.link} date={item.date}/>
    })
    return (
        <div className={classes.newsToolbar}>
            <h3 className={classes.title}>Popular</h3>
            <div className={classes.horizontal_line}></div>
            <div className={classes.newsToolbar__Content}>
                {popNewsData}
            </div>
        </div>
    )
}

export default NewsToolbar
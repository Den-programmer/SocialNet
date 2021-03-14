import React from 'react'
import { newsType } from '../../../../types/NewsTypes/newsTypes'
import classes from './newsToolbar.module.scss'
import PopNewsItem from './PopNewsItem/popNewsItem'

interface INewsToolbar {
    popularNews: Array<newsType>
}

const NewsToolbar:React.FC<INewsToolbar> = ({ popularNews }) => {
    const popNewsData = popularNews.map((item: newsType) => {
        return <PopNewsItem key={item.id} id={item.id} text={item.text} views={item.views}/>
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
import React from 'react'
import classes from './news.module.css'

interface NewsPropType {}

const News:React.FC<NewsPropType> = (props) => {
    return(
        <div className={classes.news}>
            <h1>Тут должны быть новости, ну или посты других пользователей!</h1>
        </div>
    )
}

export default News
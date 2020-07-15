import React from 'react'
import classes from './search.module.css'

interface MessagesSearchType {}

const Search:React.FC<MessagesSearchType> = ({}) => {
    return (
        <div className={classes.search}>
            <input placeholder="Search..." type="text" />
        </div>
    )
}  

export default Search
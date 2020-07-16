import React from 'react'
import classes from './searchNewFriends.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

interface ISearchNewFriends {}

const SearchNewFriends: React.FC<ISearchNewFriends> = (props) => {
    return (
        <div className={classes.search}>
            <label htmlFor="searchInput"><FontAwesomeIcon className={classes.iconSearch} icon={faSearch} /></label>
            <input id="searchInput" type="text" />
        </div>
    )
}

export default SearchNewFriends
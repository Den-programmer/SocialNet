import React from 'react'
import classes from './tracksSearching.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

interface ITracksSearching { }

const TracksSearching: React.FC<ITracksSearching> = (props) => {
    const search = React.createRef<HTMLInputElement>()
    const onSearchIconClick = () => {
        const node = search.current
        if (node) node.focus()
    }
    return (
        <React.Fragment>
            <div className={classes.musicTitle}>
                <h1>Tracks for you!</h1>
            </div>
            <div className={classes.searchInput}>
                <FontAwesomeIcon title="Click to search!" onClick={onSearchIconClick} className={classes.searchIcon} icon={faSearch} />
                <input ref={search} type="text" />
            </div>
        </React.Fragment>
    )
}

export default TracksSearching
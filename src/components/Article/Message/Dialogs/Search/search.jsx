import React from 'react';
import classes from './search.module.css';

const Search = () => {
    return (
        <div className={classes.search}>
            <input placeholder="Search..." type="text" />
        </div>
    );
}  

export default Search;
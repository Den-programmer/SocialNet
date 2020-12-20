import React from 'react'
import { createStyles, fade, Theme, withStyles, makeStyles } from '@material-ui/core/styles'
import { InputBase, OutlinedInput } from '@material-ui/core'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'

interface MessagesSearchType { }

const useStyles = makeStyles((theme: Theme) => createStyles({
    search: {
        width: '100%'
    },
    field: {
        width: '100%',
        marginBottom: '15px',
        borderRadius: '50px'
    },
    searchIcon: {
        color: '#222222'
    }
}))

const Search: React.FC<MessagesSearchType> = (props) => {
    const classes = useStyles()
    return (
        <div className={classes.search}>
            <OutlinedInput className={classes.field} placeholder="Search Messages..." 
            startAdornment={<InputAdornment position="start"><SearchIcon className={classes.searchIcon}/></InputAdornment>}/>
        </div>
    )
}

export default Search
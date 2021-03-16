import React, { ChangeEvent } from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { OutlinedInput } from '@material-ui/core'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'

interface IMessagesSearch { 
    trim: string
    setMessagesTrim: (trim: string) => void
}

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


const Search: React.FC<IMessagesSearch> = ({ setMessagesTrim, trim }) => {
    const classes = useStyles()
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMessagesTrim(e.currentTarget.value)
        console.log(e.currentTarget.value)
    }
    return (
        <div className={classes.search}>
            <OutlinedInput onChange={handleChange} value={trim} className={classes.field} placeholder="Search Messages..." 
            startAdornment={<InputAdornment position="start"><SearchIcon className={classes.searchIcon} /></InputAdornment>} />
        </div>
    )
}

export default Search
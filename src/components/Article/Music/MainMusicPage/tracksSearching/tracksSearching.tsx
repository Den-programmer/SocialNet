import React, { ChangeEvent, useRef } from 'react'
import classes from './tracksSearching.module.css'
import { createStyles, makeStyles, TextField } from '@material-ui/core'

interface ITracksSearching {
    setFilterTerm: (term: string) => void
}

const TracksSearching: React.FC<ITracksSearching> = ({ setFilterTerm }) => {
    const search = useRef<any>()
    const useStyles = makeStyles(() => createStyles({
        input: {
            width: '60%'
        }
    }))
    const s = useStyles()
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setFilterTerm(e.currentTarget.value)
    }
    return (
        <div className={classes.searchInput}>
            <TextField ref={search} onChange={onChangeInputHandler} className={s.input} variant="outlined" />
        </div> 
    )
}

export default TracksSearching
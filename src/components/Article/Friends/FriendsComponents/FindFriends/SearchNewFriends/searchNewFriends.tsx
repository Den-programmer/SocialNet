import React from 'react'
import { Container, TextField, Theme, makeStyles, createStyles } from '@material-ui/core'

interface ISearchNewFriends {}

const useStyles = makeStyles((theme: Theme) => createStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
        margin: '15px auto'
    },
    textfield: {
        width: '90%'
    }
}))

const SearchNewFriends: React.FC<ISearchNewFriends> = (props) => {
    const classes = useStyles()
    return (
        <Container className={classes.container}>
            <TextField className={classes.textfield} label="Search field" type="search" variant="filled" />
        </Container>
    )
}

export default SearchNewFriends
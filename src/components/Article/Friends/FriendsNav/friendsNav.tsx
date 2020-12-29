import React from 'react'
import { createFriendsNavBtn } from '../../../../utils/helpers/functions/function-helpers'
import { makeStyles, Theme, createStyles, Container } from '@material-ui/core'

interface IFriendsNav { }

const useStyles = makeStyles((theme: Theme) => createStyles({
    container: {
        display: 'flex',
        alignItems: 'center'
    }
}))

const FriendsNav: React.FC<IFriendsNav> = (props) => {
    const classes = useStyles()
    return (
        <Container className={classes.container}>
            {createFriendsNavBtn("Here's your friends!", "/Friends/DataFriends", "Friends")}
            {createFriendsNavBtn("You can find new friend here!", "/Friends/FindUsers", "Find Friends")}
        </Container>
    )
}

export default FriendsNav
import React from 'react'
import { createFriendsNavBtn } from '../../../../utils/helpers/functions/function-helpers'
import { makeStyles, Theme, createStyles, Container, useMediaQuery } from '@material-ui/core'

interface IFriendsNav { }

const useStyles = makeStyles((theme: Theme) => createStyles({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '40px auto'
    }
}))

const FriendsNav: React.FC<IFriendsNav> = (props) => {
    const classes = useStyles()
    const isSmallScreen = useMediaQuery('(max-width: 600px)')
    const findFriends = isSmallScreen ? 'Find' : 'Find Friends'
    return (
        <Container className={classes.container}>
            <div>
                {createFriendsNavBtn("Here's your friends!", "/Friends/DataFriends", "Friends")}
                {createFriendsNavBtn("You can find new friend here!", "/Friends/FindUsers", findFriends)}
            </div>
            <div>
                {createFriendsNavBtn("Untermensches", "/Blacklist", "Blacklist")}
            </div>
        </Container>
    )
}

export default FriendsNav
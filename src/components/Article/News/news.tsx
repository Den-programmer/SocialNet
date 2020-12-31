import React from 'react'
import { Container, Theme, makeStyles, createStyles } from '@material-ui/core'

interface NewsPropType {}

const useStyles = makeStyles((theme: Theme) => createStyles({
    container: {
        minHeight: '100vh'
    }
}))

const News:React.FC<NewsPropType> = (props) => {
    const classes = useStyles()
    return (
        <Container className={classes.container}>
            <h1>In developing...</h1>
        </Container>
    )
}

export default News
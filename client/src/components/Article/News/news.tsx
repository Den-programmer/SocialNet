import React from 'react'
import { Container, Theme, makeStyles, createStyles } from '@material-ui/core'
import NewsContentContainer from './NewsContent/newsContentContainer'
import { getIsSidebarOpenStatus } from '../../../BLL/selectors/sidebar-selectors'
import { useSelector } from 'react-redux'
import NewsToolbar from './NewsToolbar/newsToolbarContainer'

interface NewsPropType {}

const useStyles = makeStyles((theme: Theme) => createStyles({
    container: {
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'space-around'
    },
    smContainer: {
        width: '80%',
        display: 'flex',
        minHeight: '100vh',
        justifyContent: 'space-around'
    }
}))

const News:React.FC<NewsPropType> = (props) => {
    const isSidebarOpen = useSelector(getIsSidebarOpenStatus)
    const classes = useStyles()
    return (
        <Container className={isSidebarOpen ? classes.smContainer : classes.container}>
            <NewsContentContainer />
            <NewsToolbar />
        </Container>
    )
}

export default News
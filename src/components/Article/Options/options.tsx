import React from 'react'
import OptionsNav from './OptionsNavigation/optionsNav'
import MainOptionsPage from './mainOptionsPage/mainOptionsPage'
import { Container, makeStyles, Theme, createStyles } from '@material-ui/core'

interface PropsType {}

const useStyles = makeStyles((theme: Theme) => createStyles({
    options: {
        display: 'flex'
    }
}))

const Options:React.FC<PropsType> = (props) => {
    const classes = useStyles()
    return(
        <Container className={classes.options}>
            <OptionsNav />
            <MainOptionsPage />
        </Container>
    )
}

export default Options
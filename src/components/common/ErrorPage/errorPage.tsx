import React from 'react'
import sad from './img/sadImage.png'
import { Container, makeStyles, Theme, createStyles } from '@material-ui/core'
import { NavLink } from 'react-router-dom'

interface IErrorPage {

}

const useStyles = makeStyles((theme: Theme) => createStyles({
    errorPage: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
    },
    errorImage: {
        userSelect: 'none',
        width: '350px',
        height: '450px'
    },
    contentContainer: {
        margin: '0px 50px',
        textAlign: 'center'
    },
    mainTitle: {
        color: '#222222',
        textTransform: 'uppercase',
        fontSize: '25px'
    },
    subtitle: {
        color: '#5f5f5f' ,
        fontWeight: 'bold',
        fontSize: '18px'
    },
    navlink: {
        color: '#8F2243'
    }
}))

const ErrorPage:React.FC<IErrorPage> = (props) => {
    const classes = useStyles()
    return (
        <Container className={classes.errorPage}>
            <div className={classes.contentContainer}>
                <img className={classes.errorImage} src={sad} alt=""/>
            </div>
            <div className={classes.contentContainer}>
                <h1 className={classes.mainTitle}>Sorry, this is page not found!</h1>
                <h4 className={classes.subtitle}>Try to go to the <NavLink className={classes.navlink} to='/Profile'>profile page</NavLink>!</h4>
            </div>
        </Container>
    )
}

export default ErrorPage
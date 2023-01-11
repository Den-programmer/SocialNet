import React from 'react'
import classes from './Footer.module.css'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { footLinkType } from '../../types/FooterTypes/footerTypes'
import FootLinks from './FootLinks/FootLinks'

interface FooterProps {
    footLinks: Array<footLinkType>
    year: number
    footInf: string
    drawerWidth: number
    isSidebarOpen: boolean
}

const Footer: React.FC<FooterProps> = (props) => {
    const useStyles = makeStyles((theme: Theme) => createStyles({
        footerWrapper: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        footerWrapperShift: {
            width: `calc(100% - ${props.drawerWidth}px)`,
            marginLeft: props.drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
    }))
    const s = useStyles()
    return (
        <footer className={props.isSidebarOpen ? s.footerWrapperShift : s.footerWrapper}>
            <div className={classes.footer}>
                <div className={classes.container}>
                    <div className={classes.signature}>
                        <h4>&copy; {props.year}  All rights reserved!</h4>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
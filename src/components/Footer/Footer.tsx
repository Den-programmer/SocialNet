import React from 'react'
import classes from './Footer.module.css'
import { footLinkType } from '../../types/FooterTypes/footerTypes'
import FootLinks from './FootLinks/FootLinks'

interface FooterProps {
    footLinks: Array<footLinkType>
    year: number
    footInf: string
}

const Footer:React.FC<FooterProps> = (props) => {
    return (
        <footer className={classes.footer}>
            <div className={classes.container}>
                <div className={classes.inf}>
                    <h2>{props.footInf}</h2>
                </div>
                <FootLinks footLinks={props.footLinks}/>
                <div className={classes.signature}>
                    <h4>&copy; {props.year}  All rights reserved!</h4>
                </div>
            </div>
        </footer>
    )
}

export default Footer
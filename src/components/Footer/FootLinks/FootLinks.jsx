import React from 'react';
import classes from './FootLinks.module.css';

const FootLinks = (props) => {

    let footLinks = props.footLinks.map((l) => {
        return <li><a id={l.id} href="#" className={classes.navLink}>{l.name}</a></li>
    });

    return(
        <div className={classes.FootLinks}>
            <ul className={classes.nav}>
                {footLinks}
            </ul>
        </div>
    );
}
export default FootLinks; 
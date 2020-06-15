import React from 'react';
import classes from './FootLinks.module.css';
import FootLink from './FootLink/footLink';

const FootLinks = ({footLinks}) => {

    let FootLinks = footLinks.map((l) => {
        return <FootLink key={l.id} id={l.id} path={l.url} name={l.name}/>
    });

    return(
        <div className={classes.FootLinks}>
            <ul className={classes.nav}>
                {FootLinks}
            </ul>
        </div>
    );
}
export default FootLinks; 
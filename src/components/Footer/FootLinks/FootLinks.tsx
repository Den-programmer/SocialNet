import React from 'react';
import classes from './FootLinks.module.css';
import FootLink from './FootLink/footLink';
import { footLinkType } from '../../../types/FooterTypes/footerTypes';

interface FootLinksPropsType {
    footLinks: Array<footLinkType>
}

const FootLinks:React.FC<FootLinksPropsType> = ({footLinks}) => {

    let FootLinks = footLinks.map((l) => {
        return <FootLink key={l.id} id={l.id} path={l.path} name={l.name}/>
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
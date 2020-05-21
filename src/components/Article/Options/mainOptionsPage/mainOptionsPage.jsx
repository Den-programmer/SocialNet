import React from 'react';
import classes from './mainOptionsPage.module.css';
import AccountOptionsContainer from './accountOptions/accountOptionsContainer';

const MainOptionsPage = (props) => {
    return (
        <div className={classes.mainOptionsPage}>
            <AccountOptionsContainer />
        </div>
    );
}

export default MainOptionsPage;
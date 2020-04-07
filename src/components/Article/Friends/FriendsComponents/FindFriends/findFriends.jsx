import React from 'react';
import classes from './findFriends.module.css';
import SearchNewfriends from './SearchNewFriends/searchNewFriends';
import UsersColumnContainer from './usersColumn/usersColumnContainer';
import BtnShowMore from './Btn_ShowMore/btn_showMore';



const FindFriends = (props) => {
    return (
        <div className={classes.findFriends}>
            <SearchNewfriends />
            <UsersColumnContainer  />
            <BtnShowMore />
            {/* You can find new friend here! */}
        </div>
    );
}

export default FindFriends;
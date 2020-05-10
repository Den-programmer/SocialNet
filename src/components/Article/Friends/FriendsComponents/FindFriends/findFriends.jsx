import React from 'react';
import classes from './findFriends.module.css';
import SearchNewfriends from './SearchNewFriends/searchNewFriends';
import UsersColumnContainer from './usersColumn/usersColumnContainer';
import UsersPageSwitcher from './UsersPageSwitcher/UsersPageSwitcher';
import {Redirect} from 'react-router-dom';

const FindFriends = (props) => {
    if(!props.isAuth) return <Redirect to='/login'/>
    return (
        <div className={classes.findFriends}>
            <SearchNewfriends />
            <UsersColumnContainer  />
            <UsersPageSwitcher pageSize={props.usersInf.pageSize} 
                               totalUsersCount={props.usersInf.totalCount}
                               currentPage={props.usersInf.currentPage}
                               changePage={props.changePage}/>
        </div>
    );
}


export default FindFriends;
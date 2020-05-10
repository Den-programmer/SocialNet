import React from 'react';
import classes from './dialogs.module.css';
import Search from './Search/search';
import MessagesTitle from './MessagesTitle/messagesTitle';
import Users from './Users/users';
import { Redirect } from 'react-router-dom';

const Dialogs = (props) => {

    if(!props.isAuth) return <Redirect to='/login'/>

    return (
        <div className={classes.dialogs}>
            <Search />
            <MessagesTitle title="Messages"/>
            <Users dialogsData={props.dialogsData}/>
        </div>
    );
}

export default Dialogs;
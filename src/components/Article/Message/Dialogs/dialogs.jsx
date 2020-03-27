import React from 'react';
import classes from './dialogs.module.css';
import Search from './Search/search';
import MessagesTitle from './MessagesTitle/messagesTitle';
import Users from './Users/users';

const Dialogs = (props) => {
    return (
        <div className={classes.dialogs}>
            <Search />
            <MessagesTitle title="Messages"/>
            <Users messagesPage={props.messagesPage}/>
        </div>
    );
}

export default Dialogs;
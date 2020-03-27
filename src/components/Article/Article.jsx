import React from 'react';
import classes from './Article.module.css';
import Profile from './Profile/profile';
import Messages from './Message/message';
import News from './News/news';
import Music from './Music/music';
import Options from './Options/options';
import { Route } from 'react-router-dom';

const Article = (props) => {
    return (
        <article className={classes.article}>
            <Route exact path='/Profile' render={() => (<Profile profilePage={props.profilePage}
                                                        dispatch={props.dispatch}/>)} />
            <Route exact path='/Messages' render={() => (<Messages messagesPage={props.messagesPage} 
                                                        dispatch={props.dispatch} />)} />
            <Route exact path='/News' component={News} />
            <Route exact path='/Music' component={Music} />
            <Route exact path='/Options' component={Options} />
        </article>
    );
}
export default Article; 

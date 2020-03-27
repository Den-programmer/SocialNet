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
            <Route exact path='/Profile' render={() => (<Profile render={props.render}
                                                        profilePage={props.profilePage}
                                                        dispatch={props.dispatch}
                                                        state={props.state} 
                                                        posts={props.posts}/>)} />
            <Route exact path='/Messages' render={() => (<Messages render={props.render} 
                                                                   messagesPage={props.messagesPage}
                                                                   Messages={props.Messages}
                                                                   newMessageValue={props.newMessageValue} 
                                                                   dispatch={props.dispatch} 
                                                                   dialogsData={props.dialogsData}/>)} />
            <Route exact path='/News' component={News} />
            <Route exact path='/Music' component={Music} />
            <Route exact path='/Options' component={Options} />
        </article>
    );
}
export default Article; 

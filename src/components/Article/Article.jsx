import React from 'react';
import classes from './Article.module.css';
import Profile from './Profile/profile';
import Messages from './Message/message';
import News from './News/news';
import Music from './Music/music';
import Options from './Options/options';
import { Route } from 'react-router-dom';
import FindFriends from './Friends/FriendsComponents/FindFriends/findFriends';
import FriendsNav from './Friends/FriendsNav/friendsNav';
import FriendsByButtonContainer from './Friends/FriendsComponents/friendsByButton/friendsByButtonContainer';

const Article = (props) => {
    return (
        <article className={classes.article}>
            <Route exact path='/Profile' render={() => (<Profile/>)} />
            <Route exact path='/Messages' render={() => (<Messages/>)} />
            <Route exact path='/News' component={News} />
            <Route exact path='/Music' component={Music} />
            <Route exact path='/Options' component={Options} />
            <Route exact path='/Friends' render={() => (<FriendsNav/>)}/>
            <Route exact path='/Friends/DataFriends' render={() => (<React.Fragment>
                    <FriendsNav/>
                    <FriendsByButtonContainer/>
                </React.Fragment>)}/>
            <Route exact path='/Friends/FindUsers' render={() => (<React.Fragment>
                    <FriendsNav/>
                    <FindFriends/>
                </React.Fragment>)}/>
        </article>
    );
}
export default Article; 

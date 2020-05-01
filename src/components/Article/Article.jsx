import React from 'react';
import classes from './Article.module.css';
import ProfileContainer from './Profile/profileContainer';
import Messages from './Message/message';
import News from './News/news';
import Music from './Music/music';
import Options from './Options/options';
import { Route } from 'react-router-dom';
import FindFriendsContainer from './Friends/FriendsComponents/FindFriends/findFriendsContainer';
import FriendsNav from './Friends/FriendsNav/friendsNav';
import FriendsByButtonContainer from './Friends/FriendsComponents/friendsByButton/friendsByButtonContainer';

const Article = (props) => {
    return (
        <article className={classes.article}>
            <Route path='/Profile/:userId?' render={() => (<ProfileContainer/>)} />
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
                    <FindFriendsContainer/>
                </React.Fragment>)}/>  
        </article>
    );
}
export default Article; 

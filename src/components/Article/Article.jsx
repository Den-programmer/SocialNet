import React from 'react';
import classes from './Article.module.css';
import ProfileContainer from './Profile/profileContainer';
import MessagesContainer from './Message/messagesContainer';
import News from './News/news';
import Music from './Music/music';
import Options from './Options/options';
import { Route } from 'react-router-dom';
import FindFriendsContainer from './Friends/FriendsComponents/FindFriends/findFriendsContainer';
import FriendsNavContainer from './Friends/FriendsNav/friendsNavContainer';
import FriendsByButtonContainer from './Friends/FriendsComponents/friendsByButton/friendsByButtonContainer';

const Article = (props) => {
    return (
        <article className={classes.article}>
            <Route path='/Profile/:userId?' render={() => (<ProfileContainer/>)} />
            <Route exact path='/Messages' render={() => (<MessagesContainer/>)} />
            <Route exact path='/News' component={News} />
            <Route exact path='/Music' component={Music} />
            <Route exact path='/Options' component={Options} />
            <Route exact path='/Friends' render={() => (<FriendsNavContainer/>)}/>
            <Route exact path='/Friends/DataFriends' render={() => (<React.Fragment>
                    <FriendsNavContainer/>
                    <FriendsByButtonContainer/>
                </React.Fragment>)}/>
            <Route exact path='/Friends/FindUsers' render={() => (<React.Fragment>
                    <FriendsNavContainer />
                    <FindFriendsContainer/>
                </React.Fragment>)}/>  
        </article>
    );
}
export default Article; 

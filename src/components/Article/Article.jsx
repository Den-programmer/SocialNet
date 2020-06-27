import React from 'react';
import classes from './Article.module.css';
import ProfileContainer from './Profile/profileContainer';
import MessagesContainer from './Message/messagesContainer';
import News from './News/news';
import Music from './Music/music';
import OptionsContainer from './Options/optionsContainer';
import { Route } from 'react-router-dom';
import FindFriendsContainer from './Friends/FriendsComponents/FindFriends/findFriendsContainer';
import FriendsNavContainer from './Friends/FriendsNav/friendsNavContainer';
import FriendsByButtonContainer from './Friends/FriendsComponents/friendsByButton/friendsByButtonContainer';
import OptionsNav from './Options/OptionsNavigation/optionsNav';
import GeneralOptionsContainer from './Options/mainOptionsPage/generalOptions/generalOptionsContainer';
import AccountOptionsContainer from './Options/mainOptionsPage/accountOptions/accountOptionsContainer';
import ErrorPage from '../common/ErrorPage/errorPage';

// const Music = React.lazy(() => import('./Music/music'));
// const OptionsContainer = React.lazy(() => import('./Options/optionsContainer'));

const Article = (props) => {
    return (
        <article className={classes.article}>
            {/* Profile! */}
            <Route path='/Profile/:userId?' render={() => (<ProfileContainer/>)} />
            {/* Messages! */}
            <Route exact path='/Messages' render={() => (<MessagesContainer/>)} />
            {/* News! */}
            <Route exact path='/News' render={() => (<News/>)} />
            {/* Music! */}
            <Route exact path='/Music' render={() => (<Music />)}/>
            {/* Options! */}
            <Route exact path='/Options' render={() => (<OptionsContainer />)} />
            <Route path="/Options/account" render={() => (<div className={classes.dFlex}>
                    <OptionsNav/>
                    <AccountOptionsContainer />
                </div>)} />
            <Route exact path='/Options/general' render={() => (<div className={classes.dFlex}>
                    <OptionsNav/>
                    <GeneralOptionsContainer />
                </div>)} />
            {/* Friends! */}
            <Route exact path='/Friends' render={() => (<FriendsNavContainer/>)}/>
            <Route exact path='/Friends/DataFriends' render={() => (<React.Fragment>
                    <FriendsNavContainer/>
                    <FriendsByButtonContainer/>
                </React.Fragment>)}/>
            <Route exact path='/Friends/FindUsers' render={() => (<React.Fragment>
                    <FriendsNavContainer />
                    <FindFriendsContainer/>
                </React.Fragment>)}/>  
            <Route path="*" render={() => (<ErrorPage />)}/>    
        </article>
    );
}
export default Article; 

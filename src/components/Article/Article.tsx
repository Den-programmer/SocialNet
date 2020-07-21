import React from 'react'
import classes from './Article.module.css'
import ProfileContainer from './Profile/profileContainer'
import MessagesContainer from './Message/messagesContainer'
import News from './News/news'
import Music from './Music/music'
import OptionsContainer from './Options/optionsContainer'
import { Route, Redirect, Switch } from 'react-router-dom'
import FindFriendsContainer from './Friends/FriendsComponents/FindFriends/findFriendsContainer'
import FriendsNavContainer from './Friends/FriendsNav/friendsNavContainer'
import FriendsByButtonContainer from './Friends/FriendsComponents/friendsByButton/friendsByButtonContainer'
import OptionsNav from './Options/OptionsNavigation/optionsNav'
import GeneralOptionsContainer from './Options/mainOptionsPage/generalOptions/generalOptionsContainer'
import AccountOptionsContainer from './Options/mainOptionsPage/accountOptions/accountOptionsContainer'
import ErrorPage from '../common/ErrorPage/errorPage'
import LikedTracksContainer from './Music/LikedTracks/likedTracksContainer'
import MusicPageNavContainer from './Music/MusicPageNavigation/musicPageNavContainer'
import PlaylistsContainer from './Music/Playlists/playlistsContainer'
import AlbumsContainer from './Music/Albums/albumsContainer'
import FollowingContainer from './Music/Following/followingContainer'

// const Music = React.lazy(() => import('./Music/music'))
// const OptionsContainer = React.lazy(() => import('./Options/optionsContainer'))

interface ArticlePropType {}

const Article:React.FC<ArticlePropType> = (props) => {
    return (
        <article className={classes.article}>
            <Switch>
                {/* Profile! */} 
                <Route exact path='/Profile/:userId?' render={() => (<ProfileContainer />)} />
                {/* Messages! */}
                <Route exact path='/Messages' render={() => (<MessagesContainer />)} />
                {/* News! */}
                <Route path='/News' render={() => (<News />)} />
                {/* Music! */}
                <Route path='/Music/likedTracks' render={() => (<><MusicPageNavContainer /><LikedTracksContainer /></>)}/>
                <Route path='/Music/PlayLists' render={() => (<><MusicPageNavContainer /><PlaylistsContainer /></>)}/>
                <Route path='/Music/Albums' render={() => (<><MusicPageNavContainer /><AlbumsContainer /></>)}/>
                <Route path='/Music/following' render={() => (<><MusicPageNavContainer /><FollowingContainer /></>)}/>
                <Route exact path='/Music' render={() => (<Music />)} />
                {/* Options! */}
                <Route path="/Options/account" render={() => (<div className={classes.dFlex}>
                    <OptionsNav />
                    <AccountOptionsContainer />
                </div>)} />
                <Route path='/Options/general' render={() => (<div className={classes.dFlex}>
                    <OptionsNav />
                    <GeneralOptionsContainer />
                </div>)} />
                <Route path='/Options' render={() => (<OptionsContainer />)} />
                {/* Friends! */}
                <Route path='/Friends/DataFriends' render={() => (<React.Fragment>
                    <FriendsNavContainer />
                    <FriendsByButtonContainer />
                </React.Fragment>)} />
                <Route exact path='/Friends/FindUsers' render={() => (<React.Fragment>
                    <FriendsNavContainer />
                    <FindFriendsContainer />
                </React.Fragment>)} />
                <Route path='/Friends' render={() => (<FriendsNavContainer />)} />
                <Route exact path='/SocialNet' render={() => (<Redirect to={'/Profile'} />)} />
                <Route exact path='/' render={() => (<Redirect to={'/Profile'} />)} />

                  {/* 404 NOT FOUND! */}

                <Route path="*" render={() => <ErrorPage />} />
            </Switch>
        </article>
    )
}

export default Article

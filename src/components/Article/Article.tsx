import React from 'react'
import '../../App.css'
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
import MembersContainer from '../Members/membersContainer'
import { makeStyles, createStyles, Theme } from '@material-ui/core'

interface ArticlePropType {
    userDialogId: number | null
    isSidebarOpen: boolean
    drawerWidth: number
}

const Article: React.FC<ArticlePropType> = ({ userDialogId, isSidebarOpen, drawerWidth }) => {
    const useStyles = makeStyles((theme: Theme) => createStyles({
        content: {
            flexGrow: 1,
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: drawerWidth,
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        },
        profileContainer: {
            display: 'flex',
            padding: '64px 0px'
        },
        DataFriendsContainer: {
            padding: '64px 0px'
        },
        FindFriendsContainer: {
            padding: '64px 0px'
        }
    }))
    const classes = useStyles()
    return (
        <article className={!isSidebarOpen ? classes.contentShift : classes.content}>
            <Switch>
                {/* Profile! */}
                <Route exact path='/Profile/:userId?' render={() => (<div className={classes.profileContainer}><ProfileContainer /><MembersContainer /></div>)} />
                {/* Messages! */}
                <Route path={'/Messages/dialog/' + userDialogId} render={() => <MessagesContainer />} />
                <Route exact path='/Messages' render={() => (<MessagesContainer />)} />
                {/* News! */}
                <Route path='/News' render={() => (<News />)} />
                {/* Music! */}
                <Route path='/Music/likedTracks' render={() => (<><MusicPageNavContainer /><LikedTracksContainer /></>)} />
                <Route path='/Music/PlayLists' render={() => (<><MusicPageNavContainer /><PlaylistsContainer /></>)} />
                <Route path='/Music/Albums' render={() => (<><MusicPageNavContainer /><AlbumsContainer /></>)} />
                <Route path='/Music/following' render={() => (<><MusicPageNavContainer /><FollowingContainer /></>)} />
                <Route exact path='/Music' render={() => (<Music />)} />
                {/* Options! */}
                <Route path="/Options/account" render={() => (<div className="flex-container">
                    <OptionsNav />
                    <AccountOptionsContainer />
                </div>)} />
                <Route path='/Options/general' render={() => (<div className="flex-container">
                    <OptionsNav />
                    <GeneralOptionsContainer />
                </div>)} />
                <Route path='/Options' render={() => (<OptionsContainer />)} />
                {/* Notifications! */}
                <Route path='/Notifications' render={() => (<div>Here is Notifications in developing!</div>)} />
                {/* Friends! */}
                <Route path='/Friends/DataFriends' render={() => (<div className={classes.DataFriendsContainer}>
                    <FriendsNavContainer />
                    <FriendsByButtonContainer />
                </div>)} />
                <Route exact path='/Friends/FindUsers' render={() => (<div className={classes.FindFriendsContainer}>
                    <FriendsNavContainer />
                    <FindFriendsContainer />
                </div>)} />
                <Route path='/Friends' render={() => (<FriendsNavContainer />)} />

                {/* Another! */}

                <Route exact path='/SocialNet' render={() => (<Redirect to={'/Profile'} />)} />
                <Route exact path='/' render={() => (<Redirect to={'/Profile'} />)} />

                {/* 404 NOT FOUND! */}

                <Route path="*" render={() => <ErrorPage />} />
            </Switch>
        </article>
    )
}

export default Article

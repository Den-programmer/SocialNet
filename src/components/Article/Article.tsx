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
import PlaylistsContainer from './Music/Playlists/playlistsContainer'
import AlbumsContainer from './Music/Albums/albumsContainer'
import FollowingContainer from './Music/Following/followingContainer'
import MembersContainer from '../Members/membersContainer'
import { makeStyles, createStyles, Theme, Container } from '@material-ui/core'
import ProfileMainContentContainer from './Profile/ProfileMainContent/profileMainContentContainer'
import Wall from './Profile/Wall/wall'
import SecurityOptions from './Options/mainOptionsPage/securityOptions/securityOptionsContainer'
import ContactsOptions from './Options/mainOptionsPage/ContactsOptions/contactsOptionsContainer'
import Notifications from './Notifications/notificationsContainer'

interface ArticlePropType {
    userDialogId: number
    isSidebarOpen: boolean
    drawerWidth: number
    isAuth: boolean
    lastUrl: string
}

const Article: React.FC<ArticlePropType> = ({ userDialogId, isSidebarOpen, drawerWidth, isAuth, lastUrl }) => {
    const useStyles = makeStyles((theme: Theme) => createStyles({
        content: {
            flexGrow: 1,
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            marginLeft: drawerWidth,
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            }),
            marginLeft: 0,
        },
        container: {
            paddingTop: '64px'
        },
        displayContainer: {
            display: 'flex',
            paddingTop: '64px',
            paddingBottom: '64px'
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
                <Route exact path='/Profile/:userId?' render={() => (<div className={classes.displayContainer}><ProfileContainer /><MembersContainer /></div>)} />
                <Route exact path='/Wall' render={() => (<div className={classes.container}><ProfileMainContentContainer /><Wall /></div>)}/>
                {/* Messages! */}
                <Route path={'/Messages/dialog/' + userDialogId} render={() => (<div className={classes.container}>
                    <div><ProfileMainContentContainer /><MessagesContainer /></div>
                </div>)} />
                <Route exact path='/Messages' render={() => (<div className={classes.container}>
                    <ProfileMainContentContainer /><div className="flex-container"><MessagesContainer /></div>
                </div>)} />
                {/* News! */}
                <Route path='/News' render={() => (<div className={classes.container}><News /></div>)} />
                {/* Music! */}
                <Route path='/Music/likedTracks' render={() => (<div className={classes.container}><LikedTracksContainer /></div>)} />
                <Route path='/Music/PlayLists' render={() => (<div className={classes.container}><PlaylistsContainer /></div>)} />
                <Route path='/Music/Albums' render={() => (<div className={classes.container}><AlbumsContainer /></div>)} />
                <Route path='/Music/following' render={() => (<div className={classes.container}><FollowingContainer /></div>)} />
                <Route exact path='/Music' render={() => (<div className={classes.container}><Music /></div>)} />
                {/* Options! */}
                <Route path="/Options/account" render={() => (<Container className={classes.displayContainer}>
                    <OptionsNav />
                    <AccountOptionsContainer />
                </Container>)} />
                <Route path='/Options/general' render={() => (<Container className={classes.displayContainer}>
                    <OptionsNav />
                    <GeneralOptionsContainer />
                </Container>)} />
                <Route path='/Options/security' render={() => (<Container className={classes.displayContainer}>
                    <OptionsNav />
                    <SecurityOptions />
                </Container>)} />
                <Route path='/Options/contacts' render={() => (<Container className={classes.displayContainer}>
                    <OptionsNav />
                    <ContactsOptions />
                </Container>)} />
                <Route path='/Options' render={() => (<div className={classes.displayContainer}><OptionsContainer /></div>)} />
                {/* Notifications! */}
                <Route path='/Notifications' render={() => (<div className={classes.container}>
                    <ProfileMainContentContainer />
                    <Notifications />
                </div>)} />
                {/* Friends! */}
                <Route path='/Friends/DataFriends' render={() => (<div className={classes.DataFriendsContainer}>
                    <ProfileMainContentContainer />
                    <FriendsNavContainer />
                    <FriendsByButtonContainer />
                </div>)} />
                <Route exact path='/Friends/FindUsers' render={() => (<div className={classes.FindFriendsContainer}>
                    <ProfileMainContentContainer />
                    <FriendsNavContainer />
                    <FindFriendsContainer />
                </div>)} />
                <Route path='/Friends' render={() => (<FriendsNavContainer />)} />

                {/* Another! */}

                <Route exact path='/SocialNet' render={() => (<Redirect to={'/Profile'} />)} />
                <Route exact path='/' render={() => (<Redirect to={'/Profile'} />)} />
                {isAuth && <Route exact path='/login' render={() => (<Redirect to={lastUrl} />)} />}
                
                {/* 404 NOT FOUND! */}

                <Route path="*" render={() => (<div className={classes.container}><ErrorPage /></div>)} />
            </Switch>
        </article>
    )
}

export default Article

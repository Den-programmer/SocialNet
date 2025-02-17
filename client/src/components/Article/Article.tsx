import React from 'react'
import { Suspense, lazy } from "react"
import { Route, Redirect, Switch } from 'react-router-dom'
import '../../App.css'
import { makeStyles, createStyles, Theme, Container } from '@material-ui/core'
import Preloader from '../common/preloader/preloader'
const ProfileContainer = lazy(() => import("./Profile/profileContainer"))
const MessagesContainer = lazy(() => import("./Message/messagesContainer"))
const News = lazy(() => import("./News/news"))
const Notifications = lazy(() => import("./Notifications/notificationsContainer"))
const OptionsContainer = lazy(() => import("./Options/optionsContainer"))
const FindFriendsContainer = lazy(() => import("./Friends/FriendsComponents/FindFriends/findFriendsContainer"))
const FriendsNavContainer = lazy(() => import('./Friends/FriendsNav/friendsNavContainer'))
const FriendsByButtonContainer = lazy(() => import("./Friends/FriendsComponents/friendsByButton/friendsByButtonContainer"))
const OptionsNav = lazy(() => import("./Options/OptionsNavigation/optionsNav"))
const GeneralOptionsContainer = lazy(() => import("./Options/mainOptionsPage/generalOptions/generalOptionsContainer"))
const AccountOptionsContainer = lazy(() => import("./Options/mainOptionsPage/accountOptions/accountOptionsContainer"))
const ErrorPage = lazy(() => import("../common/ErrorPage/errorPage"))
const MembersContainer = lazy(() => import("../Members/membersContainer"))
const SecurityOptions = lazy(() => import("./Options/mainOptionsPage/securityOptions/securityOptionsContainer"))
const ContactsOptions = lazy(() => import("./Options/mainOptionsPage/ContactsOptions/contactsOptionsContainer"))
const Wall = lazy(() => import('./Profile/Wall/wall'))
const ProfileMainContentContainer = lazy(() => import('./Profile/ProfileMainContent/profileMainContentContainer'))
const SingleNewsPageContent = lazy(() => import('./News/SingleNewsPageContent/singleNewsPageContent'))
const BlacklistContainer = lazy(() => import('./Friends/FriendsComponents/Blacklist/blacklistContainer'))
// import Music from './Music/music'
// import MusicPageNav from './Music/MusicPageNavigation/musicPageNavContainer'
// import Audio from '../common/audio/audioContain'
// import LikedTracksContainer from './Music/LikedTracks/likedTracksContainer'
// import PlaylistsContainer from './Music/Playlists/playlistsContainer'
// import AlbumsContainer from './Music/Albums/albumsContainer'
// import FollowingContainer from './Music/Following/followingContainer'

interface ArticlePropType {
    userDialogId: string
    isSidebarOpen: boolean
    drawerWidth: number
    isAuth: boolean
    lastUrl: string
    newsPageId: number | null
    isMembersColumnOpen: boolean
}

const Article: React.FC<ArticlePropType> = React.memo(({ userDialogId, isSidebarOpen, drawerWidth, isAuth, lastUrl, newsPageId, isMembersColumnOpen }) => {
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
                <Suspense fallback={<Preloader />}>
                    {/* Profile! */}
                    <Route exact path='/Profile/:userId?' render={() => (<div className={classes.displayContainer}><ProfileContainer />{isMembersColumnOpen && <MembersContainer />}</div>)} />
                    <Route exact path='/Wall' render={() => (<div className={classes.container}><ProfileMainContentContainer /><Wall /></div>)} />
                    {/* Messages! */}
                    <Route path={'/Messages/dialog/' + userDialogId} render={() => (<div className={classes.container}>
                        <div><ProfileMainContentContainer /><MessagesContainer /></div>
                    </div>)} />
                    <Route exact path='/Messages' render={() => (<div className={classes.container}>
                        <ProfileMainContentContainer /><div className="flex-container"><MessagesContainer /></div>
                    </div>)} />
                    {/* News! */}

                    <Route path={`/News/${newsPageId && newsPageId}`} render={() => (<div style={{ background: '#F7F9FC' }} className={classes.container}><SingleNewsPageContent /></div>)} />
                    <Route path={`/News`} render={() => (<div style={{ background: '#F7F9FC' }} className={classes.container}><News /></div>)} />
                    {/* Music! */}
                    {/* <Route path='/Music/likedTracks' render={() => (<div className={classes.container}><MusicPageNav /><LikedTracksContainer /></div>)} />
                <Route path='/Music/PlayLists' render={() => (<div className={classes.container}><MusicPageNav /><PlaylistsContainer /></div>)} />
                <Route path='/Music/Albums' render={() => (<div className={classes.container}><MusicPageNav /><AlbumsContainer /></div>)} />
                <Route path='/Music/following' render={() => (<div className={classes.container}><MusicPageNav /><FollowingContainer /></div>)} />
                <Route exact path='/Music' render={() => (<div className={classes.container}><MusicPageNav /><Music /></div>)} /> */}
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

                    <Route path='/Blacklist' render={() => (<div className={classes.DataFriendsContainer}>
                        <ProfileMainContentContainer />
                        <FriendsNavContainer />
                        <BlacklistContainer />
                    </div>)} />

                    {/* Another! */}

                    <Route exact path='/SocialNet' render={() => (<Redirect to={'/Profile'} />)} />
                    <Route exact path='/' render={() => (<Redirect to={'/Profile'} />)} />
                    {isAuth && <Route exact path='/login' render={() => (<Redirect to={lastUrl} />)} />}
                </Suspense>
                {/* 404 NOT FOUND! */}

                <Route path="*" render={() => (<div className={classes.container}><ErrorPage /></div>)} />
            </Switch>
            {/* <Audio /> */}
        </article>
    )
})

export default Article

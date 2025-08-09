import React, { Suspense, lazy, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import '../../App.css'
import { Layout, Spin } from 'antd'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { selectUserDialogId } from '../../BLL/selectors/messages-selectors'
import { selectLastUrl, selectIsAuthStatus } from '../../BLL/selectors/auth-selectors'
import { selectIsMembersColumnOpenedStatus } from '../../BLL/selectors/profile-selectors'
import { selectHeaderHeight } from '../../BLL/selectors/selectors'
import { initialize } from '../../BLL/reducer-app'

const { Content } = Layout

const ProfileContainer = lazy(() => import("./Profile/profileContainer"))
const Messages = lazy(() => import("./Message/message"))
const News = lazy(() => import("./News/news"))
const Notifications = lazy(() => import("./Notifications/notifications"))
const FindFriends = lazy(() => import("./Friends/FriendsComponents/FindFriends/findFriends"))
const FriendsNav = lazy(() => import('./Friends/FriendsNav/friendsNav'))
const FriendsByButton = lazy(() => import("./Friends/FriendsComponents/friendsByButton/friendsByButton"))
const OptionsNav = lazy(() => import("./Options/OptionsNavigation/optionsNav"))
const GeneralOptions = lazy(() => import("./Options/mainOptionsPage/generalOptions/generalOptions"))
const AccountOptions = lazy(() => import("./Options/mainOptionsPage/accountOptions/accountOptions"))
const ErrorPage = lazy(() => import("../common/ErrorPage/errorPage"))
const MembersContainer = lazy(() => import("../Members/members"))
const SecurityOptions = lazy(() => import("./Options/mainOptionsPage/securityOptions/securityOptions"))
const ContactsOptions = lazy(() => import("./Options/mainOptionsPage/ContactsOptions/contactsOptions"))
const Wall = lazy(() => import('./Profile/Wall/wall'))
const ProfileMainContent = lazy(() => import('./Profile/ProfileMainContent/profileMainContent'))
const SingleNewsPageContent = lazy(() => import('./News/SingleNewsPageContent/singleNewsPageContent'))
const Blacklist = lazy(() => import('./Friends/FriendsComponents/Blacklist/blacklist'))

interface ArticlePropType {
  isSidebarOpen: boolean
  drawerWidth: number
}

const Article: React.FC<ArticlePropType> = React.memo(({
  isSidebarOpen,
  drawerWidth
}) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initialize())
  }, [])

  const headerHeight = useAppSelector(selectHeaderHeight)
  const userDialogId = useAppSelector(selectUserDialogId)
  const lastUrl = useAppSelector(selectLastUrl)
  const isMembersColumnOpen = useAppSelector(selectIsMembersColumnOpenedStatus)
  const isAuth = useAppSelector(selectIsAuthStatus)

  const contentStyle: React.CSSProperties = {
    marginLeft: isSidebarOpen ? drawerWidth : 0,
    paddingTop: headerHeight + ' px',
    transition: 'margin 0.3s ease'
  }


  return (
    <Layout>
      <Content style={contentStyle}>
        <Suspense fallback={<div className="preloader-wrapper"><Spin size="large" /></div>}>
          <Routes>
            <Route path='/Profile/:userId' element={<div className="flex-content"><ProfileContainer />{isMembersColumnOpen && <MembersContainer />}</div>} />
            <Route path='/Profile' element={<div className="flex-content"><ProfileContainer />{isMembersColumnOpen && <MembersContainer />}</div>} />
            <Route path='/Wall' element={<div className="flex-content"><ProfileMainContent /><Wall /></div>} />
            {/* Maybe it has to be changed to route param - :userDialogId */}<Route path={`/Messages/dialog/${userDialogId}`} element={<div className="flex-content"><ProfileMainContent /><Messages/></div>} /> 
            <Route path='/Messages' element={<div className="flex-content"><ProfileMainContent /><Messages /></div>} />
            <Route path={`/News/:newsId`} element={<SingleNewsPageContent />} />
            <Route path='/News' element={<News />} />
            <Route path='/Options/account' element={<div className="flex-content"><OptionsNav /><AccountOptions /></div>} />
            <Route path='/Options/general' element={<div className="flex-content"><OptionsNav /><GeneralOptions /></div>} />
            <Route path='/Options/security' element={<div className="flex-content"><OptionsNav /><SecurityOptions /></div>} />
            <Route path='/Options/contacts' element={<div className="flex-content"><OptionsNav /><ContactsOptions /></div>} />
            <Route path='/Notifications' element={<div className="flex-content"><ProfileMainContent /><Notifications /></div>} />
            <Route path='/Friends/DataFriends' element={<div className="flex-content"><ProfileMainContent /><FriendsNav /><FriendsByButton /></div>} />
            <Route path='/Friends/FindUsers' element={<div className="flex-content"><ProfileMainContent /><FriendsNav/><FindFriends /></div>} />
            <Route path='/Friends' element={<FriendsNav/>} />
            <Route path='/Blacklist' element={<div className="flex-content"><ProfileMainContent /><FriendsNav /><Blacklist /></div>} />
            <Route path='/' element={<Navigate to='/Profile' replace />} />
            {isAuth && <Route path='/login' element={<Navigate to={lastUrl} replace />} />}
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </Content>
    </Layout>
  )
})

export default Article
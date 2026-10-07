import React from 'react'
import './App.css'
import { useAppSelector } from './hooks/hooks'

import { selectIsSidebarOpenStatus, selectSidebarWidth } from './BLL/selectors/sidebar-selectors'
import { selectIsAuthStatus } from './BLL/selectors/auth-selectors'

import SideBar from './components/SideBar/SideBarContainer'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Article from './components/Article/Article'
import Authentication from './components/Authentication/authentication'
import CookieSettingsButton from './components/cookie-consent/CookieSettingsButton'

const App: React.FC = () => {
  const isAuth = useAppSelector(selectIsAuthStatus)
  const drawerWidth = useAppSelector(selectSidebarWidth)
  const isSidebarOpen = useAppSelector(selectIsSidebarOpenStatus)
  
  return (
    <>
      {isAuth ? (
        <div className="App">
          <SideBar />
          <div>
            <Header />
            <Article isSidebarOpen={isSidebarOpen} drawerWidth={drawerWidth} />
            <Footer />
          </div>
        </div>
      ) : (
        <Authentication />
      )}
      <CookieSettingsButton />
    </>
  )
}

export default App
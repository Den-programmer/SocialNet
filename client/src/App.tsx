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
import CookieConsent from 'react-cookie-consent'

const App: React.FC = () => {
  const isAuth = useAppSelector(selectIsAuthStatus)
  const drawerWidth = useAppSelector(selectSidebarWidth)
  const isSidebarOpen = useAppSelector(selectIsSidebarOpenStatus)

  return (
    <>
      <CookieConsent
        location="bottom"
        buttonText="Consent"
        cookieName="myCookieConsent"
        expires={150}
        style={{ background: '#222', color: '#fff' }}
        buttonStyle={{ background: '#4CAF50', color: '#fff' }}
      >
        Vi use cookies 🍪 to ensure the website is working properly.
      </CookieConsent>

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
    </>
  )
}

export default App
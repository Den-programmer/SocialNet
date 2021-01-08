import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import store, { RootState } from './BLL/redux'
import Header from './components/Header/HeaderContainer'
import Footer from './components/Footer/FooterContainer'
import Article from './components/Article/ArticleContainer'
import { connect, Provider } from 'react-redux'
import { initialize } from './BLL/reducer-app'
import Preloader from './components/common/preloader/preloader'
import Authentication from './components/Authentication/authentication'
import { getAppInitializationStatus } from './BLL/selectors/selectors'
import { getIsAuthStatus } from './BLL/selectors/auth-selectors'
import SideBar from './components/SideBar/SideBarContainer'
import { actions } from './BLL/reducer-app'
import { getSidebarWidth, getIsSidebarOpenStatus } from './BLL/selectors/sidebar-selectors'

interface IApp {
  Initialized: boolean
  isAuth: boolean
  drawerWidth: number
  isSidebarOpen: boolean
  initialize: () => void
  getCurrentDate: (date: string) => void
}

const App: React.FC<IApp> = (props) => {
  useEffect(() => {
    props.initialize()
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const monthNumber = date.getDate()
    const stringDate = `${monthNumber}.0${month}.${year}`
    props.getCurrentDate(stringDate)
  }, [])
  if (!props.Initialized) {
    return <Preloader />
  }
  return (
    <BrowserRouter><Provider store={store}>
      {props.isAuth ? <div className="App">
        <SideBar />
        <div>
          <Header />
          <Article isSidebarOpen={props.isSidebarOpen} drawerWidth={props.drawerWidth}/>
          <Footer />
        </div>
      </div>
        : <Authentication />}
    </Provider></BrowserRouter>
  )
}


const mapStateToProps = (state: RootState) => ({
  Initialized: getAppInitializationStatus(state),
  isAuth: getIsAuthStatus(state),
  drawerWidth: getSidebarWidth(state),
  isSidebarOpen: getIsSidebarOpenStatus(state)
})

const { getCurrentDate } = actions

const AppContainer = connect(mapStateToProps, { initialize, getCurrentDate })(App)

const MyApp = () => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
}

export default MyApp

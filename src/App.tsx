import React from 'react'
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
import { getAppInitializationStatus, getAppFontSize } from './BLL/selectors/selectors'
import { getIsAuthStatus } from './BLL/selectors/auth-selectors'
import SideBar from './components/SideBar/SideBarContainer'
import { actions } from './BLL/reducer-app'

interface IApp {
  Initialized: boolean
  isAuth: boolean
  size: number
  initialize: () => void
  getCurrentDate: (date: string) => void
}

class App extends React.Component<IApp> {
  style = { fontSize: this.props.size + 'px !important' }
  componentDidMount() {
    this.props.initialize()
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const monthNumber = date.getDate()
    const stringDate = `${monthNumber}.0${month}.${year}`
    this.props.getCurrentDate(stringDate)
  }
  render() {
    if (!this.props.Initialized) {
      return <Preloader />
    }
    return (
      <BrowserRouter><Provider store={store}>
      {this.props.isAuth ?
        <div style={this.style} className="App">
          <div className="main-page">
            <Header />
            <div className="flex-container">
              <SideBar />
              <Article />
            </div>
            <Footer />
          </div>
        </div>
        : <Authentication />}
      </Provider></BrowserRouter>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  Initialized: getAppInitializationStatus(state),
  isAuth: getIsAuthStatus(state),
  size: getAppFontSize(state)
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

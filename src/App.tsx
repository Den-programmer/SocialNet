import React from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import store, { RootState } from './BLL/redux'
import HeaderContainer from './components/Header/HeaderContainer'
import FooterContainer from './components/Footer/FooterContainer'
import Article from './components/Article/Article'
import { connect, Provider } from 'react-redux'
import { initialize } from './BLL/reducer-app'
import Preloader from './components/common/preloader/preloader'
import Authentication from './components/Authentication/authentication'
import { getAppInitializationStatus, getAppFontSize } from './BLL/selectors/selectors'
import { getIsAuthStatus } from './BLL/selectors/auth-selectors'
import SideBarContainer from './components/SideBar/SideBarContainer'

interface IApp {
  Initialized: boolean
  isAuth: boolean
  size: number
  initialize: () => void
}

class App extends React.Component<IApp> {
  style = { fontSize: this.props.size + 'px !important' }
  componentDidMount() {
    this.props.initialize()
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
            <HeaderContainer />
            <div className="flex-container">
              <SideBarContainer />
              <Article />
            </div>
            <FooterContainer />
          </div>
        </div>
        : <Authentication />}
      </Provider></BrowserRouter>
    )
  }
}

let mapStateToProps = (state: RootState) => ({
  Initialized: getAppInitializationStatus(state),
  isAuth: getIsAuthStatus(state),
  size: getAppFontSize(state)
}) 

const AppContainer = connect(mapStateToProps, { initialize })(App)

const MyApp = () => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
}

export default MyApp

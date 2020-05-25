import React from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import SideBar from './components/SideBar/SideBar';
import FooterContainer from './components/Footer/FooterContainer';
import { BrowserRouter } from 'react-router-dom';
import Article from './components/Article/Article';
import { connect } from 'react-redux';
import { initialize } from './BLL/reducer-app';
import Preloader from './components/common/preloader/preloader';

class App extends React.Component {
  componentDidMount() {
    this.props.initialize();
  }
  render() {
    if (!this.props.Initialized) {
      return <Preloader />
    }
    return (
      <BrowserRouter>
      <div className="App">
          <div className="main-page">
            <HeaderContainer />
            <div className="flex-container">
              <SideBar />
              <Article />
            </div>
            <FooterContainer />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    Initialized: state.app.isInitialized,
  }
} 

const AppContainer = connect(mapStateToProps, { initialize })(App);

export default AppContainer;

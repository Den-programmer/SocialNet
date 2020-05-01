import React from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import SideBar from './components/SideBar/SideBar';
import FooterContainer from './components/Footer/FooterContainer';
import { BrowserRouter, Route } from 'react-router-dom';
import Article from './components/Article/Article';
import Authentication from './components/Authentication/authentication';

function App(props) {

  return (
    <BrowserRouter>
      <div className="App">
        <div className="main-page">
          <HeaderContainer />
          <Route path="/login" render={() => (<div className="page-authentication"><Authentication /></div>)} />
          <Route path="/" render={() => (<div className="flex-container">
            <SideBar />
            <Article />
          </div>)} />
          <FooterContainer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

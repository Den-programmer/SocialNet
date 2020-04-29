import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import SideBar from './components/SideBar/SideBar';
import FooterContainer from './components/Footer/FooterContainer';
import { BrowserRouter } from 'react-router-dom';
import Article from './components/Article/Article';

function App(props) {
  
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="flex-container">
          <SideBar />
          <Article/>
        </div>
        <FooterContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;

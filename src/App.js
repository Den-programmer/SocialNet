import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import SideBar from './components/SideBar/SideBar';
import Article from './components/Article/Article';
import Footer from './components/Footer/Footer';
import { BrowserRouter } from 'react-router-dom';

function App(props) {
  
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="flex-container">
          <SideBar Friends={props.Friends}/>
          <Article/>
        </div>
        <Footer footLinks={props.footer.footLinks} year={props.footer.year} footInf={props.footer.footInf} />
      </div>
    </BrowserRouter>
  );
}

export default App;

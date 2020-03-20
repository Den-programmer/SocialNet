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
          <SideBar state={props.state}/>
          <Article render={props.render}
              dispatch={props.dispatch}
              state={props.state}
              functionAddPost={props.functionAddPost} 
              posts={props.posts} 
              dialogsData={props.dialogsData}/>
        </div>
        <Footer footLinks={props.state.Footer.footLinks} year={props.state.Footer.year} footInf={props.state.Footer.footInf} />
      </div>
    </BrowserRouter>
  );
}

export default App;

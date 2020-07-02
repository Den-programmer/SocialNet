import React from 'react';
import classes from './Header.module.css';
import Logo from './logo/logo';
import LoginBtn from './LoginBtn/loginBtn';

interface HeaderProps {
  isAuth: boolean
  logout():void
}

const Header:React.FC<HeaderProps> = ({isAuth, logout}) => {
    return(
      <header className={classes.header}>
        <div className={classes.container}>
          <Logo />
          <LoginBtn isAuth={isAuth} logout={logout}/>
        </div>
      </header>
    );
  }


export default Header;
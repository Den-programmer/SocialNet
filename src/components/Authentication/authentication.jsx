import React from 'react';
import classes from './authentication.module.css';

const Authentication = (props) => {
    return (
        <div className={classes.authentication}>
            <div className="container">
                <div className={classes.login}>
                    <div className={classes.title}>
                        <h3>Login</h3>
                    </div>
                    <div>
                        <div className={classes.formBlock}>
                            <form>
                                <div className={classes.formItem}>
                                    <label htmlFor="emailLogin">
                                        <h4>Email</h4>
                                    </label>
                                    <input id="emailLogin" type="text" />
                                </div>
                                <div className={classes.formItem}>
                                    <label htmlFor="passwordLogin">
                                        <h4>Password</h4>
                                    </label>
                                    <input id="passwordLogin" type="password" />
                                </div>
                            </form>
                        </div>
                        <div className={classes.confirmation}>
                            <div className={classes.rememberMe}>
                                <input id="rememberMe" type="checkbox" />
                                <label htmlFor="rememberMe">
                                    <p>Remember me!</p>
                                </label>
                            </div>
                            <div className={classes.btn_login}>
                                <button>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Authentication;
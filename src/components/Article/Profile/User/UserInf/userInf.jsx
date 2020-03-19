import React from 'react';
import classes from './userInf.module.css';


const UserInf = (props) => {

    return (
        <div className={classes.userInf}>
            <div className={classes.name}>
                <h2>
                    {props.name}
                </h2>
            </div>
            <div className={classes.biography}>
                <p>Date of Birth: {props.birthDate} </p>
                <p>City: {props.city} </p>
                <p>Education: {props.education} </p>
                <p>Web Site: {props.href} </p>
            </div>
        </div>
    );
}

export default UserInf;
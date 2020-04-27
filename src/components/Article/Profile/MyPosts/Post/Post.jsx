import React from 'react';
import classes from './Post.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
 

const Post = (props) => {
    return (
        <div className={classes.post}>
            <img className={classes.post__author} src={props.avatar} alt="author" />
            <h3 className={classes.post__title}>
                {props.postTitle}
            </h3>
            <p className={classes.post__text}>
                {props.postInf}
            </p>
            <div className={classes.dFlex}>
                <FontAwesomeIcon icon={faHeart} /><p className={classes.m}>{props.likesCount}</p>
            </div>
        </div>
    );
}

export default Post;
import React from 'react';
import classes from './Post.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Notifications from './notifications/notifications';
 

class Post extends React.Component {

    state = {
        isEdit: false
    }
    postTitle = React.createRef();
    postInf = React.createRef();

    onPostChange = () => {
        // It would be better if I had current API, so I could save previous value of post title and post information!
        let newPostTitle = this.postTitle.current.value;
        let newPostInf = this.postInf.current.value;
        if (newPostTitle === '') {
            newPostTitle = 'Untitled'
        } else if (newPostInf === '') newPostInf = 'This is some text that has no meaning!'
        this.props.editPost(this.props.id, newPostTitle, newPostInf);    
    }
    activateEditMode = () => {
        this.setState({
            isEdit: true
        });
    }
    deactivateEditMode = () => {
        this.setState({
            isEdit: false
        });
    }

    render() {
        return (
            <div className={classes.post}>
                <div className={classes.wrapper}>
                    <img className={classes.post__author} src={this.props.avatar} alt="author" />
                    <Notifications id={this.props.id} deletePost={this.props.deletePost}/>
                </div>
                {this.state.isEdit ? <div className={classes.editPostTitle}>
                    <input className={classes.editInputs} ref={this.postTitle} onChange={this.onPostChange} value={this.props.postTitle}/>
                </div> : <h3 onClick={this.activateEditMode} className={classes.post__title}>
                    {this.props.postTitle}
                </h3>}
                {this.state.isEdit ? <div className={classes.editPostInf}>
                    <input className={classes.editInputs} ref={this.postInf} onChange={this.onPostChange} value={this.props.postInf}/>
                </div> : <p onClick={this.activateEditMode} className={classes.post__text}>
                    {this.props.postInf}
                </p>}
                {this.state.isEdit ? <div className={classes.confirm_btn} onClick={this.deactivateEditMode}><button>Confirm</button></div> : <div className={classes.dFlex}>
                    <FontAwesomeIcon icon={faHeart} /><p className={classes.m}>{this.props.likesCount}</p>
                </div>}
            </div>
        );
    }
}

export default Post;
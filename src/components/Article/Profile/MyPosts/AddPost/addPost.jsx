import React from 'react';
import classes from './addPost.module.css';
import {addPostActionCreator} from '../../../../../BLL/reducer-profile';

const AddPost = (props) => {
    let newPostTitle = React.createRef();
    let newPostInformat = React.createRef();

    let addPost = () => {
        newPostTitle = newPostTitle.current.value;
        newPostInformat = newPostInformat.current.value;
        props.dispatch(addPostActionCreator(newPostTitle, newPostInformat));
        props.profilePage.ValueOfPostTitle = '';
        props.profilePage.ValueOfPostInf = '';
    }

    let onPostTitleChange = () => {
        let newPostTitleVal = newPostTitle.current.value;
        props.state.profilePage.ValueOfPostTitle = newPostTitleVal;
        newPostTitle.current.value = props.state.profilePage.ValueOfPostTitle;
        props.render();
    }
    let onPostInfChange = () => {
        let newPostInformatVal = newPostInformat.current.value;
        props.state.profilePage.ValueOfPostInf = newPostInformatVal;
        newPostInformat.current.value =  props.state.profilePage.ValueOfPostInf;
        props.render();
    }

    return (
        <div className={classes.addPost}>
            <div className={classes.inputs}>
                <div>
                    <input onChange={ onPostTitleChange } 
                           ref={newPostTitle} 
                           value={props.profilePage.ValueOfPostTitle} 
                           placeholder="Post Name" 
                           type="text" />
                </div>
                <div>
                    <input onChange={ onPostInfChange } 
                           ref={newPostInformat} 
                           value={props.profilePage.ValueOfPostInf} 
                           placeholder="Post Text" 
                           type="text" />
                </div>
            </div>
            <div>
                <button onClick={addPost} className={classes.btn_addPost}>Add Post</button>
            </div>
        </div>
    );

}


export default AddPost;
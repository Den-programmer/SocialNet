import React from 'react';
import classes from './addPost.module.css';

const AddPost = (props) => {
    let newPostTitle = React.createRef();
    let newPostInformat = React.createRef();

    let addPost = () => {
        newPostTitle = newPostTitle.current.value;
        newPostInformat = newPostInformat.current.value;
        props.addPost(newPostTitle, newPostInformat);
    }

    let onPostTitleChange = () => {
        let newPostTitleVal = newPostTitle.current.value;
        props.onPostTitleChange(newPostTitleVal);
        newPostTitleVal = props.profilePage.ValueOfPostTitle;
    }
    let onPostInfChange = () => {
        let newPostInformatVal = newPostInformat.current.value;
        props.onPostInfChange(newPostInformatVal);
        newPostInformatVal =  props.profilePage.ValueOfPostInf;
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
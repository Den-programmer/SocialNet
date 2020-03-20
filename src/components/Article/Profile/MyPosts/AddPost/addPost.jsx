import React from 'react';
import classes from './addPost.module.css';

const AddPost = (props) => {
    let newPostTitle = React.createRef();
    let newPostInformat = React.createRef();
    let addPost = () => {
        newPostTitle = newPostTitle.current.value;
        newPostInformat = newPostInformat.current.value;
        // props.addpost(newPostTitle, newPostInformat);
        props.dispatch({type: 'ADD-POST', newPostTitle:newPostTitle, newPostInformat:newPostInformat,});
        props.state.profilePage.ValueOfPostTitle = '';
        props.state.profilePage.ValueOfPostInf = '';
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
                           value={props.state.profilePage.ValueOfPostTitle} 
                           placeholder="Post Name" 
                           type="text" />
                </div>
                <div>
                    <input onChange={ onPostInfChange } 
                           ref={newPostInformat} 
                           value={props.state.profilePage.ValueOfPostInf} 
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
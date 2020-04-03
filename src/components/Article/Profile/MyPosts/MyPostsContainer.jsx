import React from 'react';
import MyPosts from './MyPosts';
import { addPostActionCreator } from '../../../../BLL/reducer-profile';
import { onPostTitleChangeActionCreator } from '../../../../BLL/reducer-profile';
import { onPostInfChangeActionCreator } from '../../../../BLL/reducer-profile';
import storeContext from '../../../../storeContext';

const MyPostsContainer = (props) => {
    return (
        <storeContext.Consumer>
            {(store) => {
                let addPost = (newPostTitle, newPostInformat) => {
                    store.dispatch(addPostActionCreator(newPostTitle, newPostInformat));
                }

                let onPostTitleChange = (newPostTitleVal) => {
                    store.dispatch(onPostTitleChangeActionCreator(newPostTitleVal));
                }

                let onPostInfChange = (newPostInformatVal) => {
                    store.dispatch(onPostInfChangeActionCreator(newPostInformatVal));
                }

                let state = store.getState();

                return <MyPosts profilePage={state.profilePage} onPostInfChange={onPostInfChange}
                    onPostTitleChange={onPostTitleChange}
                    addPost={addPost}
                    posts={state.profilePage.posts} />
            }
            }
        </storeContext.Consumer>
    );
}



export default MyPostsContainer;
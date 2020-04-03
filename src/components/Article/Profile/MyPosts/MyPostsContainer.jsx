import MyPosts from './MyPosts';
import { addPostActionCreator } from '../../../../BLL/reducer-profile';
import { onPostTitleChangeActionCreator } from '../../../../BLL/reducer-profile';
import { onPostInfChangeActionCreator } from '../../../../BLL/reducer-profile';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
    return {
        profilePage:state.profilePage,
        posts:state.profilePage.posts,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostTitle, newPostInformat) => {
            dispatch(addPostActionCreator(newPostTitle, newPostInformat));
        },
        onPostTitleChange: (newPostTitleVal) => {
            dispatch(onPostTitleChangeActionCreator(newPostTitleVal));
        },
        onPostInfChange: (newPostInformatVal) => {
            dispatch(onPostInfChangeActionCreator(newPostInformatVal));
        },
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
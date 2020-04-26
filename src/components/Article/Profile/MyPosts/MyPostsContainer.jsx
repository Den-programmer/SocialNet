import MyPosts from './MyPosts';
import { addPost, onPostInfChange, onPostTitleChange } from '../../../../BLL/reducer-profile';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
    return {
        profilePage:state.profilePage,
        posts:state.profilePage.posts,
    }
}

const MyPostsContainer = connect(mapStateToProps, {
    addPost: addPost,
    onPostTitleChange: onPostTitleChange,
    onPostInfChange: onPostInfChange
})(MyPosts);

export default MyPostsContainer;
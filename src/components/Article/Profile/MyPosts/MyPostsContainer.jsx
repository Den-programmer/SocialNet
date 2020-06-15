import MyPosts from './MyPosts';
import { addPost, deletePost, editPost } from '../../../../BLL/reducer-profile';
import { connect } from 'react-redux';
import { getUsersProfile, getPosts } from '../../../../BLL/selectors/selectors';

let mapStateToProps = (state) => {
    return {
        posts: getPosts(state),
        profile: getUsersProfile(state),
    }
}

const MyPostsContainer = connect(mapStateToProps, { addPost, deletePost, editPost })(MyPosts);

export default MyPostsContainer;
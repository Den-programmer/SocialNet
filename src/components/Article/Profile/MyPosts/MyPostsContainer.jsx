import MyPosts from './MyPosts';
import { addPost } from '../../../../BLL/reducer-profile';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
    return {
        profilePage:state.profilePage,
        posts:state.profilePage.posts,
        profile: state.profilePage.profile,
    }
}

const MyPostsContainer = connect(mapStateToProps, { addPost })(MyPosts);

export default MyPostsContainer;
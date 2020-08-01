import MyPosts from './MyPosts'
import { actions } from '../../../../BLL/reducer-profile'
import { connect } from 'react-redux'
import { getUsersProfile, getPosts } from '../../../../BLL/selectors/profile-selectors'
import { RootState } from '../../../../BLL/redux'

const mapStateToProps = (state: RootState) => ({
    posts: getPosts(state),
    profile: getUsersProfile(state)
})

const { addPost, deletePost, editPost } = actions

const MyPostsContainer = connect(mapStateToProps, { addPost, deletePost, editPost })(MyPosts)

export default MyPostsContainer
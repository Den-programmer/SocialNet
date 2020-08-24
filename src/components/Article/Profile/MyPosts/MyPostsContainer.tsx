import MyPosts from './MyPosts'
import { actions } from '../../../../BLL/reducer-profile'
import { connect } from 'react-redux'
import { getUsersProfile, getPosts, getUsersName, getIsAddPostModalOpenStatus, getIsPostModalOpenStatus } from '../../../../BLL/selectors/profile-selectors'
import { RootState } from '../../../../BLL/redux'

const mapStateToProps = (state: RootState) => ({
    userName: getUsersName(state),
    posts: getPosts(state),
    profile: getUsersProfile(state),
    isPostModalOpen: getIsPostModalOpenStatus(state),
    isAddPostModalOpen: getIsAddPostModalOpenStatus(state)
})

const { addPost, deletePost, editPost, setIsAddPostWindowOpen, setIsPostModalOpen } = actions

const MyPostsContainer = connect(mapStateToProps, { addPost, deletePost, editPost, setIsAddPostWindowOpen, setIsPostModalOpen })(MyPosts)

export default MyPostsContainer
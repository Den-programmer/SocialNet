import MyPosts from './MyPosts'
import { actions, createPost, requireUsersPosts } from '../../../../../BLL/reducer-profile'
import { setTextError } from '../../../../../BLL/reducer-app'
import { connect } from 'react-redux'
import { getUsersProfile, getPosts, getUsersName, getIsAddPostModalOpenStatus, getIsPostModalOpenStatus } from '../../../../../BLL/selectors/profile-selectors'
import { RootState } from '../../../../../BLL/redux'
import { getMessageError } from '../../../../../BLL/selectors/selectors'

const mapStateToProps = (state: RootState) => ({
    userName: getUsersName(state),
    posts: getPosts(state),
    profile: getUsersProfile(state),
    isPostModalOpen: getIsPostModalOpenStatus(state),
    isAddPostModalOpen: getIsAddPostModalOpenStatus(state),
    messageError: getMessageError(state),
    userId: getUsersProfile(state).userId
})

const { deletePost, setIsAddPostWindowOpen, finishEditing, onPostTitleChange, onPostInfChange, setIsPostModalOpen, setIsPostTitleEdited, setIsPostInfEdited } = actions

const MyPostsContainer = connect(mapStateToProps, 
  { createPost, 
    deletePost,
    setIsAddPostWindowOpen, 
    setIsPostModalOpen, 
    setTextError,
    setIsPostTitleEdited, 
    setIsPostInfEdited,
    finishEditing,
    onPostTitleChange,
    onPostInfChange,
    requireUsersPosts
  })(MyPosts)

export default MyPostsContainer
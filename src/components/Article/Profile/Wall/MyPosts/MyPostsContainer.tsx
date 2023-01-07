import MyPosts from './MyPosts'
import { actions } from '../../../../../BLL/reducer-profile'
import { setTextError } from '../../../../../BLL/reducer-app'
import { connect } from 'react-redux'
import { getUsersProfile, getPosts, getUsersName, getIsAddPostModalOpenStatus, getIsPostModalOpenStatus } from '../../../../../BLL/selectors/profile-selectors'
import { RootState } from '../../../../../BLL/redux'
import { getDate, getMessageError } from '../../../../../BLL/selectors/selectors'

const mapStateToProps = (state: RootState) => ({
    userName: getUsersName(state),
    posts: getPosts(state),
    profile: getUsersProfile(state),
    isPostModalOpen: getIsPostModalOpenStatus(state),
    isAddPostModalOpen: getIsAddPostModalOpenStatus(state),
    currentDate: getDate(state),
    messageError: getMessageError(state)
})

const { addPost, deletePost, editPost, setIsAddPostWindowOpen, finishEditing, onPostTitleChange, onPostInfChange, setIsPostModalOpen, setIsPostTitleEdited, setIsPostInfEdited } = actions

const MyPostsContainer = connect(mapStateToProps, 
    { addPost, 
      deletePost, 
      editPost, 
      setIsAddPostWindowOpen, 
      setIsPostModalOpen, 
      setTextError,
      setIsPostTitleEdited, 
      setIsPostInfEdited,
      finishEditing,
      onPostTitleChange,
      onPostInfChange
    })(MyPosts)

export default MyPostsContainer
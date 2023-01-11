import { connect } from 'react-redux'
import { RootState } from '../../../../../../BLL/redux'
import { setUserPhotoThunk } from '../../../../../../BLL/reducer-profile'
import DeleteAvatar from './deleteAvatar'
import { actions } from '../../../../../../BLL/reducer-notifications'
import { getMessageError } from '../../../../../../BLL/selectors/selectors'

const mapStateToProps = (state: RootState) => ({
    error: getMessageError(state)
})

const { addNotification } = actions

const DeleteAvatarContainer = connect(mapStateToProps, { setUserPhoto: setUserPhotoThunk, addNotification })(DeleteAvatar)

export default DeleteAvatarContainer
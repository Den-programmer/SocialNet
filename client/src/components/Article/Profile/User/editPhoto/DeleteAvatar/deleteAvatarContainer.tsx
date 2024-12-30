import { connect } from 'react-redux'
import { RootState } from '../../../../../../BLL/redux'
import { setUserPhotoThunk } from '../../../../../../BLL/reducer-profile'
import DeleteAvatar from './deleteAvatar'
import { createNotification } from '../../../../../../BLL/reducer-notifications'
import { getMessageError } from '../../../../../../BLL/selectors/selectors'

const mapStateToProps = (state: RootState) => ({
    error: getMessageError(state)
})

const DeleteAvatarContainer = connect(mapStateToProps, { setUserPhoto: setUserPhotoThunk, createNotification })(DeleteAvatar)

export default DeleteAvatarContainer
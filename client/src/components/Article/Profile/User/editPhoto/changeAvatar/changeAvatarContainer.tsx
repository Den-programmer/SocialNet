import { connect } from "react-redux"
import { RootState } from '../../../../../../BLL/redux'
import ChangeAvatar from "./changeAvatar"
import { getMessageError } from "../../../../../../BLL/selectors/selectors"
import { setUserPhotoThunk } from '../../../../../../BLL/reducer-profile'
import { actions } from "../../../../../../BLL/reducer-notifications"

const mapStateToProps = (state: RootState) => ({
    error: getMessageError(state)
})

const { addNotification } = actions

const ChangeAvatarContainer = connect(mapStateToProps, { setUserPhoto: setUserPhotoThunk, addNotification })(ChangeAvatar)

export default ChangeAvatarContainer
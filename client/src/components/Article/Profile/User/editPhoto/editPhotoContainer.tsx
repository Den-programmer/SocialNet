import { connect } from "react-redux"
import { RootState } from "../../../../../BLL/redux"
import EditPhoto from "./editPhoto"
import { getChangePhotosMenu, getChangePhotosMenuItemId } from "../../../../../BLL/selectors/profile-selectors"
import { actions } from '../../../../../BLL/reducer-profile'

const mapStateToProps = (state: RootState) => ({
    changePhotosMenu: getChangePhotosMenu(state),
    changePhotosMenuItemId: getChangePhotosMenuItemId(state)
})

const { choosePhotosMenuItem } = actions

const EditPhotoContainer = connect(mapStateToProps, { choosePhotosMenuItem })(EditPhoto)

export default EditPhotoContainer
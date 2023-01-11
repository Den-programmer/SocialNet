import { connect } from 'react-redux'
import UserChatProfile from './userChatProfile'
import { RootState } from '../../../../BLL/redux'
import { getDialogsData } from '../../../../BLL/selectors/messages-selectors'

const mapStateToProps = (state: RootState) => ({
    dialogsData: getDialogsData(state)
})

const UserChatProfileContainer = connect(mapStateToProps, {})(UserChatProfile)

export default UserChatProfileContainer
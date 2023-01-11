import { connect } from 'react-redux'
import { RootState } from '../../../../../../BLL/redux'
import ChangeBackground from './changeBackground'
import { getMessageError } from '../../../../../../BLL/selectors/selectors'
import { actions } from '../../../../../../BLL/reducer-profile'
import { actions as actions2 } from '../../../../../../BLL/reducer-notifications'

const { setProfileBackground } = actions

const mapStateToProps = (state: RootState) => ({
    error: getMessageError(state)
})

const { addNotification } = actions2

const ChangeBackgroundContainer = connect(mapStateToProps, { setProfileBackground, addNotification })(ChangeBackground)

export default ChangeBackgroundContainer
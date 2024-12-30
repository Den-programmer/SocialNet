import { connect } from 'react-redux'
import { RootState } from '../../../../../../BLL/redux'
import ChangeBackground from './changeBackground'
import { getMessageError } from '../../../../../../BLL/selectors/selectors'
import { actions } from '../../../../../../BLL/reducer-profile'
import { createNotification } from '../../../../../../BLL/reducer-notifications'

const { setProfileBackground } = actions

const mapStateToProps = (state: RootState) => ({
    error: getMessageError(state)
})


const ChangeBackgroundContainer = connect(mapStateToProps, { setProfileBackground, createNotification })(ChangeBackground)

export default ChangeBackgroundContainer
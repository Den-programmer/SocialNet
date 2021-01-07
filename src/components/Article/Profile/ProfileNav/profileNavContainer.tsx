import { connect } from 'react-redux'
import ProfileNav from './profileNav'
import { RootState } from '../../../../BLL/redux'
import { getProfileNavigationMenu } from '../../../../BLL/selectors/profile-selectors'
import { actions } from '../../../../BLL/reducer-profile'
import { actions as actions2 } from '../../../../BLL/reducer-sidebar'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

const { changeProfileNavItemChosenStatus } = actions
const { choosePage } = actions2

const mapStateToProps = (state: RootState) => ({
    profileNav: getProfileNavigationMenu(state)
})

const ProfileNavContainer = compose<React.ComponentType>(
    connect(mapStateToProps, { changeProfileNavItemChosenStatus, choosePage }),
    withRouter
)(ProfileNav)

export default ProfileNavContainer
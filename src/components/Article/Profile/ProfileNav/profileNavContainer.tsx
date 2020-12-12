import { connect } from 'react-redux'
import ProfileNav from './profileNav'
import { RootState } from '../../../../BLL/redux'
import { getProfileNavigationMenu } from '../../../../BLL/selectors/profile-selectors'
import { actions } from '../../../../BLL/reducer-profile'

const { changeProfileNavItemChosenStatus, setStandartProfileNavOptions } = actions

const mapStateToProps = (state: RootState) => ({
    profileNav: getProfileNavigationMenu(state)
})

const ProfileNavContainer = connect(mapStateToProps, { changeProfileNavItemChosenStatus, setStandartProfileNavOptions })(ProfileNav)

export default ProfileNavContainer
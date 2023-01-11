import { connect } from 'react-redux'
import { RootState } from '../../../../../BLL/redux'
import { getBlacklist } from '../../../../../BLL/selectors/users-selectors'
import Blacklist from './blacklist'
import { actions } from '../../../../../BLL/reducer-friends'

const mapStateToProps = (state: RootState) => ({
    blacklist: getBlacklist(state)
})

const { deleteFromBlacklist } = actions

const BlacklistContainer = connect(mapStateToProps, { deleteFromBlacklist })(Blacklist)

export default BlacklistContainer
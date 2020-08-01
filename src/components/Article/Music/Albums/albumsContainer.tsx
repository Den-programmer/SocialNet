import { connect } from 'react-redux'
import { compose } from 'redux'
import { RootState } from '../../../../BLL/redux'
import Albums from './albums'
import { withAuthRedirect } from '../../../../HOC/withAuthRedirect'

const mapStateToProps = (state: RootState) => ({})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {}),
    withAuthRedirect
)(Albums)
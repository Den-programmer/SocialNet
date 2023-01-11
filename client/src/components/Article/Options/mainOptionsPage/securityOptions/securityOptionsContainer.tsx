import { connect } from 'react-redux'
import { RootState } from '../../../../../BLL/redux'
import SecurityOptions from './securityOptions'

const mapStateToProps = (state: RootState) => ({})

const SecurityOptionsContainer = connect(mapStateToProps, {})(SecurityOptions)

export default SecurityOptionsContainer
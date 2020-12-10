import { connect } from "react-redux"
import { RootState } from "../../BLL/redux"
import Members from './members'

const mapStateToProps = (state:RootState) => ({})

const MembersContainer = connect(mapStateToProps, {})(Members)

export default MembersContainer
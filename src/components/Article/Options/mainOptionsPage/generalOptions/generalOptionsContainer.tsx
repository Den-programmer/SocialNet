import { connect } from 'react-redux'
import GeneralOptions from './generalOptions'
import { RootState } from '../../../../../BLL/redux'

const mapStateToProps = (state: RootState) => ({

})


const GeneralOptionsContainer = connect(mapStateToProps, {  })(GeneralOptions)

export default GeneralOptionsContainer
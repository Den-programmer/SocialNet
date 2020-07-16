import { connect } from 'react-redux'
import GeneralOptions from './generalOptions'
import { setFontSize } from '../../../../../BLL/reducer-app'
import { RootState } from '../../../../../BLL/redux'
import { getFontSizeValues } from '../../../../../BLL/selectors/selectors'

let mapStateToProps = (state: RootState) => ({
    fontSizeValues: getFontSizeValues(state)
})

const GeneralOptionsContainer = connect(mapStateToProps, { setFontSize })(GeneralOptions)

export default GeneralOptionsContainer
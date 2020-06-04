import { connect } from 'react-redux';
import GeneralOptions from './generalOptions';
import { setFontSize } from '../../../../../BLL/reducer-app';

let mapStateToProps = (state) => {
    return {
        fontSizeValues: state.app.options.fontSize
    }
}

const GeneralOptionsContainer = connect(mapStateToProps, { setFontSize })(GeneralOptions);

export default GeneralOptionsContainer;
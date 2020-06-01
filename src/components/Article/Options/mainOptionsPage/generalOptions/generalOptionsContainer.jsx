import { connect } from 'react-redux';
import GeneralOptions from './generalOptions';

let mapStateToProps = (state) => {
    return {
        fontSizeValues: state.app.options.fontSize
    }
}

const GeneralOptionsContainer = connect(mapStateToProps, {  })(GeneralOptions);

export default GeneralOptionsContainer;
import { connect } from 'react-redux';
import Options from './options';
import { withAuthRedirect } from '../../../HOC/withAuthRedirect';

// withAuthRedirect
const OptionsContainer = connect(null, null)(Options);

export default OptionsContainer;
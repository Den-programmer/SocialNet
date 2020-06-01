import { connect } from 'react-redux';
import Options from './options';
import { withAuthRedirect } from '../../../HOC/withAuthRedirect';

const OptionsContainer = withAuthRedirect(connect(null, null)(Options));

export default OptionsContainer;
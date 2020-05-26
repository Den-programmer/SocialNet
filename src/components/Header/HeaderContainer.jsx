import Header from './Header';
import { connect } from 'react-redux';
import { logout } from '../../BLL/reducer-auth';
import { getLoginName, getIsAuthStatus } from '../../BLL/selectors/selectors';

let mapStateToProps = (state) => {
    return {
        loginName: getLoginName(state),
        isAuth: getIsAuthStatus(state)
    }
}

const HeaderContainer = connect(mapStateToProps, { logout })(Header);

export default HeaderContainer;
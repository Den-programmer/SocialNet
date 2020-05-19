import Header from './Header';
import { connect } from 'react-redux';
import { logout } from '../../BLL/reducer-auth';

let mapStateToProps = (state) => {
    return {
        loginName: state.auth.login,
        isAuth: state.auth.isAuth
    }
}

const HeaderContainer = connect(mapStateToProps, { logout })(Header);

export default HeaderContainer;
import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { setAuthUserData } from '../../BLL/reducer-auth';
import { ProfileAPI } from '../../DAL/api';

class HeaderAPI extends React.Component {
    componentDidMount() {
        ProfileAPI.auth().then(data => {
            let {id, email, login} = data.data;
            this.props.setAuthUserData(id, email, login, data.resultCode);
        });
    }
    render() {
        return (
            <Header loginName={this.props.login}/>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        login: state.auth.login,
        isAuth: state.auth.isAuth
    }
}

const HeaderContainer = connect(mapStateToProps, { setAuthUserData })(HeaderAPI);

export default HeaderContainer;
import React from 'react';
import * as axios from 'axios';
import Header from './Header';
import { connect } from 'react-redux';
import { setAuthUserData } from '../../BLL/reducer-auth';

class HeaderAPI extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        }).then(response => {
            let {id, email, login} = response.data.data;
            this.props.setAuthUserData(id, email, login, response.data.resultCode);
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
import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { setAuthUserData, authentication } from '../../BLL/reducer-auth';

class HeaderAPI extends React.Component {
    componentDidMount() {
        this.props.authentication();
    }
    render() {
        return (
            <Header loginName={this.props.login}/>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        login: state.auth.login
    }
}

const HeaderContainer = connect(mapStateToProps, { setAuthUserData, authentication })(HeaderAPI);

export default HeaderContainer;
import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getIsAuthStatus } from '../BLL/selectors/auth-selectors'
import { RootState } from '../BLL/redux'

let mapStateToPropsForRedirect = (state: RootState) => ({
    isAuth: getIsAuthStatus(state)
})

interface IRedirectComponent {
    isAuth: boolean
}

export const withAuthRedirect = (Component: any) => {
    class RedirectComponent extends React.Component<IRedirectComponent> {
        render() {
            if(!this.props.isAuth) return <Redirect to="/login" />

            return <Component {...this.props}/>
        }
    }

    const ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)

    return ConnectedAuthRedirectComponent
}
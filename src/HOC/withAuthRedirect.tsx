import React, { ComponentType } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getIsAuthStatus } from '../BLL/selectors/auth-selectors'
import { RootState } from '../BLL/redux'

const mapStateToPropsForRedirect = (state: RootState) => ({
    isAuth: getIsAuthStatus(state)
} as mapStatePropsType)

type mapStatePropsType = { isAuth: boolean }

type mapDispatchPropsType = {}

interface IRedirectComponent { isAuth: boolean }

export function withAuthRedirect<WCP>(Component: ComponentType<WCP>) {
    const RedirectComponent: React.FC<IRedirectComponent> = (props) => {
        const { isAuth, ...restProps } = props
        if (!isAuth) return <Redirect to="/login" />

        return <Component {...restProps as WCP} />
    }

    const ConnectedAuthRedirectComponent = 
    connect<mapStatePropsType, mapDispatchPropsType, WCP, RootState>(mapStateToPropsForRedirect)(RedirectComponent)

    return ConnectedAuthRedirectComponent
}
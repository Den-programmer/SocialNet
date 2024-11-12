import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '@material-ui/core'
import classes from './help.module.scss'
import { format, parseISO } from 'date-fns'

export const createFriendsNavBtn = (hint: string, link: string, nameOfBtn: string) => {
    return (
        <NavLink title={hint} className={classes.friends_button} to={link}>
            {nameOfBtn}
        </NavLink>
    )
}

export const createReviewChangesBtn = (func: (...args: any[]) => void, url?: string, error?: string, currentPageUrl?: string) => {
    const hasError = error && error !== ''
    const currentPageUrlCheckout = currentPageUrl ? currentPageUrl : '/'
    return (
        <NavLink onClick={func} to={hasError ? currentPageUrlCheckout : url ? url : currentPageUrlCheckout}>
            <Button color="primary" variant="contained">Rewiew Change</Button>
        </NavLink>
    )
}

export const formatDate = (dateString: string): string => {
    const date = parseISO(dateString)
    return format(date, 'dd/MM/yyyy')
}

export const scrollToTop = (topNumber: number = 0) => {
    window.scrollTo({
        top: topNumber,
        behavior: 'smooth'
    });
}
import React from 'react'
import classes from './biography.module.scss'
import { Container } from '@material-ui/core'

interface IBiography {
    userName: string
    AboutMe: string | null
}

const Biography: React.FC<IBiography> = ({ userName, AboutMe }) => {
    return (
        <Container>
            <div className={classes.biography}>
                <h2 className={classes.title}>Biography</h2>
                <div className={classes.bioTable}>
                <div className={classes.bioTableItem}>
                    <div className={classes.bioTableItem__property}>
                        <p>Name</p>
                    </div>
                    <div className={classes.bioTableItem__value}>
                        <p>{userName}</p>
                    </div>
                </div>
                <div className={classes.bioTableItem}>
                    <div className={classes.bioTableItem__property}>
                        <p>Gender</p>
                    </div>
                    <div className={classes.bioTableItem__value}>
                        <p>Male</p>
                    </div>
                </div>
                <div className={classes.bioTableItem}>
                    {AboutMe && <div className={classes.bioTableItem__property}>
                        <p>About Me</p>
                    </div>}
                    {AboutMe && <div className={classes.bioTableItem__value}>
                        <span className={classes.bioTableItem__value_second_style}>{AboutMe}</span>
                    </div>}
                </div>
            </div>
            </div>
        </Container>
    )
}

export default Biography
import React from 'react';
import classes from './biography.module.scss';
import { Container } from '@material-ui/core';

interface IBiography {
    gender: string;
    userName: string;
    AboutMe: string | null;
}

const Biography: React.FC<IBiography> = ({ userName, AboutMe, gender }) => {
    return (
        <Container maxWidth="lg">
            <div className={classes.biography}>
                <h2 className={classes.title}>Biography</h2>
                <table className={classes.bioTable}>
                    <tbody>
                        <tr className={classes.bioTableItem}>
                            <th>Name</th>
                            <td>{userName}</td>
                        </tr>
                        <tr className={classes.bioTableItem}>
                            <th>Gender</th>
                            <td>{gender}</td>
                        </tr>
                        {AboutMe && (
                            <tr className={classes.bioTableItem}>
                                <th>About Me</th>
                                <td className={classes.bioTableItem__value_second_style}>{AboutMe}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Container>
    );
};

export default Biography;
import React, { useEffect } from 'react';
import classes from './notifications.module.scss';
import { makeStyles, createStyles, Theme, Container, Checkbox, Button } from '@material-ui/core';
import { notificationType } from '../../../BLL/reducer-notifications';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';

interface INotifications {
    notifications: Array<notificationType>;
    isMainCheckboxAcvtive: boolean;
    setNotificationsChosenStatus: (status: boolean) => void;
    setNotificationStatus: (itemId: number) => void;
    deleteNotifications: (itemId: number) => void;
    deleteAllNotifications: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        notifications: {
            minHeight: '100vh',
        },
        checkbox: {
            zIndex: 100,
        },
        notificationsIcon: {
            fontSize: '240px',
            color: '#E3E3E3',
        },
    })
);

const Notifications: React.FC<INotifications> = (props) => {
    useEffect(() => {
        props.setNotificationsChosenStatus(false);
    }, []);

    const s = useStyles();

    const notificationsItems = props.notifications.map((item: notificationType) => (
        <div key={item.id} className={classes.notificationRow}>
            <Checkbox
                checked={item.isChecked}
                onClick={() => props.setNotificationStatus(item.id)}
                className={s.checkbox}
                color="primary"
                name="notifications"
            />
            <div className={classes.notificationContent}>
                <span className={classes.notificationItem__title}>{item.title}</span>
            </div>
            <div className={classes.notificationType}>
                <span>{item.type}</span>
            </div>
            {item.isChecked && (
                <Button
                    onClick={() => props.deleteNotifications(item.id)}
                    color="primary"
                    className={classes.deleteButton}
                >
                    Delete
                </Button>
            )}
        </div>
    ));

    return (
        <Container className={s.notifications}>
            <div>
                <h2 className={classes.title}>Notifications</h2>
            </div>
            <div className={classes.notificationsContent}>
                <div className={classes.notificationsHeader}>
                    <Checkbox
                        checked={props.isMainCheckboxAcvtive}
                        onClick={() => props.setNotificationsChosenStatus(!props.isMainCheckboxAcvtive)}
                        className={s.checkbox}
                        color="primary"
                        name="notifications"
                    />
                    <span className={classes.headerColumn}>Notification</span>
                    <span className={classes.headerColumn}>Type</span>
                </div>
                <div className={classes.notificationsListWrapper}>
                    {notificationsItems.length !== 0 ? (
                        <div className={classes.notificationsList}>{notificationsItems}</div>
                    ) : (
                        <div className={classes.noNotifications}>
                            <NotificationsOffIcon className={s.notificationsIcon} />
                            <h4 className={classes.noNotifications__title}>No notifications yet!</h4>
                        </div>
                    )}
                </div>
            </div>
        </Container>
    );
};

export default Notifications
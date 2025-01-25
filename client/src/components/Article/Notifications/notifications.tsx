import React, { useEffect, useState } from 'react';
import classes from './notifications.module.scss';
import { makeStyles, createStyles, Theme, Container, Checkbox, Button } from '@material-ui/core';
import { notificationType } from '../../../BLL/reducer-notifications';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';

interface INotifications {
    notifications: Array<notificationType>;
    isMainCheckboxAcvtive: boolean;
    setNotificationsChosenStatus: (status: boolean) => void;
    updateIsCheckedStatus: (itemId: string) => void;
    removeNotification: (itemId: string) => void
    clearAllNotifications: (notifications: string[]) => void
    fetchNotifications: () => void
    isDeletingLoading: boolean
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
    const [isNotificationChecked, setIsNotificationChecked] = useState<boolean>(false);
    useEffect(() => {
        props.fetchNotifications();
        props.setNotificationsChosenStatus(false);
    }, []);

    const s = useStyles();

    useEffect(() => {
        const isAnyChecked = props.notifications.some((item: notificationType) => item.isChecked);
        setIsNotificationChecked(isAnyChecked);
    }, [props.notifications])

    const notificationsItems = props.notifications.map((item: notificationType) => {
        const checkboxHandler = () => props.updateIsCheckedStatus(item._id)
        return <div key={item._id} className={classes.notificationRow}>
            <Checkbox
                checked={item.isChecked}
                onClick={checkboxHandler}
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
                    onClick={() => props.removeNotification(item._id)}
                    color="primary"
                    className={classes.deleteButton}
                    disabled={!isNotificationChecked || props.isDeletingLoading}
                >
                    Delete
                </Button>
            )}
        </div>
    });

    const opacity0 = {
        opacity: 0
    }
    const opacity1 = {
        opacity: 1
    }

    const handleDeleteChosenNotifications = () => {
        const checkedNotifications = props.notifications.filter((notification) => notification.isChecked);
        const checkedNotificationIds = checkedNotifications.map((notification) => notification._id);
        props.clearAllNotifications(checkedNotificationIds);
    }

    const opacityCondition = isNotificationChecked ? opacity1 : opacity0
    const checkboxHandler = () => {
        props.setNotificationsChosenStatus(!props.isMainCheckboxAcvtive)
    }
    return (
        <Container className={s.notifications}>
            <div>
                <h2 className={classes.title}>Notifications</h2>
            </div>
            <div className={classes.notificationsContent}>
                <div className={classes.notificationsHeader}>
                    <Checkbox style={opacityCondition}
                        checked={props.isMainCheckboxAcvtive}
                        onClick={checkboxHandler}
                        className={s.checkbox}
                        color="primary"
                        name="notifications"
                    />
                    <span className={classes.headerColumn}>Notification</span>
                    <span className={classes.headerColumn}>Type</span>
                    <Button style={opacityCondition}
                        onClick={handleDeleteChosenNotifications}
                        color="primary"
                        variant='contained'
                        className={classes.deleteButton}
                        disabled={!isNotificationChecked || props.isDeletingLoading}
                    >
                        Delete
                    </Button>
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
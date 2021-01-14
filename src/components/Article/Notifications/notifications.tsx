import React, { useEffect } from 'react'
import classes from './notifications.module.scss'
import { makeStyles, createStyles, Theme, Container, Checkbox, Button } from '@material-ui/core'
import { notificationType } from '../../../BLL/reducer-notifications'
import noNotifications from './images/no-notifications.png'
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff'

interface INotifications {
    notifications: Array<notificationType>
    isMainCheckboxAcvtive: boolean
    setNotificationsChosenStatus: (status: boolean) => void
    setNotificationStatus: (itemId: number) => void
    deleteNotifications: (itemId: number) => void
    deleteAllNotifications: () => void
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    notifications: {
        minHeight: '100vh'
    },
    checkbox: {
        zIndex: 100
    },
    notificationsIcon: {
        fontSize: '240px',
        color: '#E3E3E3'
    }
}))

const Notifications: React.FC<INotifications> = (props) => {
    useEffect(() => {
        props.setNotificationsChosenStatus(false)
    }, [])
    const s = useStyles()
    const notificationsItems = props.notifications.map((item: notificationType) => {
        return (
            <div key={item.id} className={classes.notificationItem}>
                <div className={classes.checkboxWrapper}>
                    <Checkbox checked={item.isChecked} onClick={() => props.setNotificationStatus(item.id)}
                        className={s.checkbox}
                        color="primary" name="notifications" />
                    {props.isMainCheckboxAcvtive && <div className={classes.background}></div>}
                </div>
                <h4 className={classes.notificationItem_title}>{item.title}</h4>
                <h5 className={classes.notificationItem_type}>{item.type}</h5>
                {item.isChecked && <Button onClick={() => props.deleteNotifications(item.id)} color="primary">Delete</Button>}
            </div>
        )
    })
    return (
        <Container className={s.notifications}>
            <div>
                <h2 className={classes.title}>Notifications</h2>
            </div>
            <div className={classes.notificationsContent}>
                <div className={classes.notificationsControlWrapper}>
                    <div className={classes.notificationsControl}>
                        {notificationsItems.length !== 0 && <div className={classes.checkboxWrapper}>
                            <Checkbox checked={props.isMainCheckboxAcvtive} onClick={() => props.setNotificationsChosenStatus(!props.isMainCheckboxAcvtive)}
                                className={s.checkbox}
                                color="primary" name="notifications" />
                            {props.isMainCheckboxAcvtive && <div className={classes.background}></div>}
                        </div>}
                        <h4 className={classes.notificationsControl__title}>Notification</h4>
                        <h5 className={classes.notificationsControl__type}>Type</h5>
                        {props.isMainCheckboxAcvtive && <Button onClick={() => props.deleteAllNotifications()} color="primary" variant="contained">Delete All</Button>}
                    </div>
                </div>
                <div className={classes.notificationsListWrapper}>
                    {notificationsItems.length !== 0 ? <div className={classes.notificationsList}>
                        {notificationsItems}
                    </div> : <div className={classes.noNotifications}>
                        <NotificationsOffIcon className={s.notificationsIcon}/>
                        <h4 className={classes.noNotifications__title}>No notifications yet!</h4>
                    </div>}
                </div>
            </div>
        </Container>
    )
}

export default Notifications
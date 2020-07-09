import React from 'react'
import classes from './trackNotifications.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { trackNotificationType } from '../../../../../../BLL/reducer-music'
import TrackNotification from './trackNotification/trackNotification'

interface TrackNotificationsPropType {
    trackNotifications: Array<trackNotificationType>
}

interface trackStateType {
    isMenu: boolean
}

class TrackNotifications extends React.Component<TrackNotificationsPropType> {
    state = {
        isMenu: false
    } as trackStateType

    trackNotifications = this.props.trackNotifications.map((item: trackNotificationType) => {
        return <TrackNotification key={item.id} id={item.id} title={item.title}/>
    })

    openMenu = () => {
        if (this.state.isMenu) {
            this.setState({ isMenu: false })
        } else {
            this.setState({ isMenu: true })
        }
    }

    render() {
        return (
            <div className={classes.notifications}>
                <div onClick={this.openMenu} className={classes.notificationIconBlock}>
                    <FontAwesomeIcon className={classes.notificationIcon} icon={faEllipsisV} />
                </div>
                {this.state.isMenu && <div className={classes.notifications}>
                    {this.trackNotifications}
                </div>}
            </div>
        )
    }
}

export default TrackNotifications;
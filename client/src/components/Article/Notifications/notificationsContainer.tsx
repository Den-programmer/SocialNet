import { connect } from "react-redux"
import { RootState } from "../../../BLL/redux"
import Notifications from "./notifications"
import { getNotifications, getMainCheckboxStatus } from "../../../BLL/selectors/notifications-selectors"
import { actions, clearAllNotifications, fetchNotifications, removeNotification, updateIsCheckedStatus } from "../../../BLL/reducer-notifications"

const { setNotificationsChosenStatus, setNotificationStatus } = actions

const mapStateToProps = (state: RootState) => ({
    notifications: getNotifications(state),
    isMainCheckboxAcvtive: getMainCheckboxStatus(state),
})

const NotificationsContainer = connect(mapStateToProps, { updateIsCheckedStatus, setNotificationsChosenStatus, setNotificationStatus, clearAllNotifications, removeNotification, fetchNotifications })(Notifications)

export default NotificationsContainer
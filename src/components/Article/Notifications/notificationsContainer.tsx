import { connect } from "react-redux"
import { RootState } from "../../../BLL/redux"
import Notifications from "./notifications"
import { getNotifications, getMainCheckboxStatus } from "../../../BLL/selectors/notifications-selectors"
import { actions } from "../../../BLL/reducer-notifications"

const { setNotificationsChosenStatus, setNotificationStatus, deleteNotifications, deleteAllNotifications } = actions

const mapStateToProps = (state: RootState) => ({
    notifications: getNotifications(state),
    isMainCheckboxAcvtive: getMainCheckboxStatus(state)
})

const NotificationsContainer = connect(mapStateToProps, { setNotificationsChosenStatus, setNotificationStatus, deleteNotifications, deleteAllNotifications })(Notifications)

export default NotificationsContainer
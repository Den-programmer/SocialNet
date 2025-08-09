import React, { useEffect } from 'react'
import { Button, Checkbox, Typography, Row, Col, Empty } from 'antd'
import {
  useGetNotificationsQuery,
  useDeleteNotificationMutation
} from '../../../DAL/notificationApi'
import classes from './notifications.module.scss'
import { selectIsDeletingLoading, selectMainCheckboxStatus, selectNotifications } from '../../../BLL/selectors/notifications-selectors'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { notificationActions } from '../../../BLL/reducer-notifications'

const { Title, Text } = Typography

const Notifications: React.FC = () => {
  const dispatch = useAppDispatch()

  const { toggleAllCheckedStatus, toggleNotificationChecked } = notificationActions

  const notifications = useAppSelector(selectNotifications)
  const isMainChecked = useAppSelector(selectMainCheckboxStatus)
  const isDeleting = useAppSelector(selectIsDeletingLoading)

  const { refetch } = useGetNotificationsQuery()
  const [deleteNotification] = useDeleteNotificationMutation()

  useEffect(() => {
    refetch()
  }, [refetch])

  const handleToggleAll = () => {
    dispatch(toggleAllCheckedStatus(!isMainChecked))
  }

  const handleToggleSingle = (id: string) => {
    dispatch(toggleNotificationChecked(id))
  }

  const handleDeleteSingle = async (id: string) => {
    await deleteNotification(id)
    refetch()
  }

  const handleDeleteMany = async () => {
    const ids = notifications.filter(n => n.isChecked).map(n => n._id)
    for (const id of ids) {
      await deleteNotification(id)
    }
    refetch()
  }

  const isAnyChecked = notifications.some(n => n.isChecked)

  return (
    <div className={classes.notifications}>
      <Title level={2}>Notifications</Title>

      <div className={classes.notificationsContent}>
        <Row align="middle" className={classes.notificationsHeader}>
          <Col span={2}>
            <Checkbox
              checked={isMainChecked}
              onChange={handleToggleAll}
              style={{ opacity: isAnyChecked ? 1 : 0 }}
            />
          </Col>
          <Col span={16}>
            <Text strong>Notification</Text>
          </Col>
          <Col span={4}>
            <Text strong>Type</Text>
          </Col>
          <Col span={2}>
            <Button
              danger
              type="primary"
              onClick={handleDeleteMany}
              disabled={!isAnyChecked || isDeleting}
              style={{ opacity: isAnyChecked ? 1 : 0 }}
            >
              Delete
            </Button>
          </Col>
        </Row>

        {notifications.length ? (
          <div className={classes.notificationsList}>
            {notifications.map(n => (
              <Row key={n._id} align="middle" className={classes.notificationRow}>
                <Col span={2}>
                  <Checkbox
                    checked={n.isChecked}
                    onChange={() => handleToggleSingle(n._id)}
                  />
                </Col>
                <Col span={16}>
                  <Text>{n.title}</Text>
                </Col>
                <Col span={4}>
                  <Text type="secondary">{n.type}</Text>
                </Col>
                <Col span={2}>
                  {n.isChecked && (
                    <Button
                      danger
                      type="link"
                      onClick={() => handleDeleteSingle(n._id)}
                      disabled={isDeleting}
                    >
                      Delete
                    </Button>
                  )}
                </Col>
              </Row>
            ))}
          </div>
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No notifications yet!"
            className={classes.noNotifications}
          />
        )}
      </div>
    </div>
  )
}

export default Notifications
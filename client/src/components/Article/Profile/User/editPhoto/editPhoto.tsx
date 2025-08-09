import React, { useState } from 'react'
import { Modal, Tooltip } from 'antd'
import { CameraOutlined, CloseOutlined } from '@ant-design/icons'
import classes from './editPhoto.module.scss'
import ChangeAvatar from './changeAvatar/changeAvatar'
import DeleteAvatar from './DeleteAvatar/deleteAvatar'
import ChangeBackground from './ChangeBackground/changeBackground'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks'
import { selectChangePhotosMenu, selectChangePhotosMenuItemId } from '../../../../../BLL/selectors/profile-selectors'
import { profileActions } from '../../../../../BLL/reducer-profile'


const EditPhoto: React.FC= ({ }) => {
  const [open, setOpenStatus] = useState(false)
  const [isModalOpen, setIsModalOpenStatus] = useState(false)

  const changePhotosMenu = useAppSelector(selectChangePhotosMenu)
  const changePhotosMenuItemId = useAppSelector(selectChangePhotosMenuItemId)

  const dispatch = useAppDispatch()

  const choosePhotosMenuItemId = (id: number) => dispatch(profileActions.choosePhotosMenuItem(id))

  const activeStyle = {
    backgroundColor: '#4dcadd',
    border: '1px solid #FFF',
    color: '#FFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '7.5px',
    userSelect: 'none',
    cursor: 'pointer'
  }

  const commonStyle = {}

  const menuItems = changePhotosMenu.map(item => (
    <div
      key={item.id}
      onClick={() => choosePhotosMenuItemId(item.id)}
      className={item.isActive ? classes.menuItemActive : classes.menuItem}
      style={{ cursor: 'pointer' }}
    >
      {item.title}
    </div>
  ))

  return (
    <>
      <Tooltip title="Upload your photos">
        <div
          onClick={() => setIsModalOpenStatus(true)}
          className={classes.editPhotoWrapper}
          onMouseEnter={() => setOpenStatus(true)}
          onMouseLeave={() => setOpenStatus(false)}
          style={open ? activeStyle : commonStyle}
        >
          <CameraOutlined style={{ fontSize: open ? 16 : 24, paddingRight: open ? 0 : undefined, color: '#FFF', opacity: 0.7, textShadow: '0 1px 2px rgba(0,0,0,.8)' }} />
          {open && <div className={classes.editPhotoContent__text}>Upload your photos</div>}
        </div>
      </Tooltip>

      <Modal
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className={classes.menu}>{menuItems}</div>
            <CloseOutlined onClick={() => setIsModalOpenStatus(false)} style={{ cursor: 'pointer' }} />
          </div>
        }
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpenStatus(false)}
        centered
        styles={{ body: { width: 480, height: 200 }}}
      >
        {changePhotosMenuItemId === 1 ? (
          <ChangeAvatar setIsModalOpenStatus={setIsModalOpenStatus} />
        ) : changePhotosMenuItemId === 2 ? (
          <DeleteAvatar setIsModalOpenStatus={setIsModalOpenStatus} />
        ) : (
          <ChangeBackground setIsModalOpenStatus={setIsModalOpenStatus} />
        )}
      </Modal>
    </>
  )
}

export default EditPhoto
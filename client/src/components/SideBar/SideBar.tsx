import React from 'react'
import { Drawer, Divider, List, Button } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import SidebarItem from './SidebarItem/sidebarItem'
import { useLocation } from 'react-router-dom'
import { scrollToTop } from '../../utils/helpers/functions/function-helpers'
import {
  UserOutlined,
  MailOutlined,
  NotificationOutlined,
  BellOutlined,
  SettingOutlined,
  TeamOutlined
} from '@ant-design/icons'
import { SidebarIconMapType } from '../../types/SidebarTypes/sidebarTypes'

interface SideBarPropsType {
  navLinks: Array<any>
  isSidebarOpen: boolean
  sidebarWidth: number
  changeProfileNavItemChosenStatus: (itemId: number) => void
  changeSidebarIsOpenStatus: (status: boolean) => void
  choosePage: (isChosen: number) => void
}

const SideBar: React.FC<SideBarPropsType> = ({
  navLinks,
  isSidebarOpen,
  sidebarWidth,
  changeProfileNavItemChosenStatus,
  changeSidebarIsOpenStatus,
  choosePage
}) => {
  const location = useLocation()
  const isMobile = window.innerWidth <= 1000
  const drawerWidth = isMobile ? '100vw' : `${sidebarWidth}px`

  const handleDrawerClose = () => {
    changeSidebarIsOpenStatus(false)
  }

  const handleListClick = () => {
    setTimeout(() => {
      scrollToTop()
      if (isMobile) handleDrawerClose()
    }, 250)
  }



  const iconMap: SidebarIconMapType = {
    UserOutlined: UserOutlined,
    MailOutlined: MailOutlined,
    NotificationOutlined: NotificationOutlined,
    BellOutlined: BellOutlined,
    SettingOutlined: SettingOutlined,
    TeamOutlined: TeamOutlined
  }

  return (
    <Drawer
      title={
        <Button
          type="text"
          onClick={handleDrawerClose}
          icon={document.dir === 'ltr' ? <LeftOutlined /> : <RightOutlined />}
        />
      }
      placement="left"
      closable={false}
      onClose={handleDrawerClose}
      open={isSidebarOpen}
      width={drawerWidth}
      styles={{
        body: {
          padding: 0,
          backgroundColor: '#30445C'
        }
      }}
      mask={isMobile}
    >
      <Divider style={{ margin: 0, backgroundColor: '#ccc' }} />
      <div onClick={handleListClick}>
        <List
          itemLayout="vertical"
          dataSource={navLinks}
          renderItem={(link) => {
            const icon = iconMap[link.iconKey] || <UserOutlined />
            return <SidebarItem
              key={link.id}
              id={link.id}
              isChosen={link.isChosen}
              name={link.name}
              choosePage={choosePage}
              path={link.path}
              icon={icon}
              changeProfileNavItemChosenStatus={changeProfileNavItemChosenStatus}
              location={location.pathname}
            />
          }
          }
        />
      </div>
    </Drawer>
  )
}

export default SideBar
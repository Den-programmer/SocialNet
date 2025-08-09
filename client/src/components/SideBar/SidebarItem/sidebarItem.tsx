import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Typography } from 'antd'
import classes from './sidebarItem.module.scss'

interface ISidebarItem {
  id: number
  path: string
  isChosen: boolean
  name: string
  icon: React.ElementType
  location: string
  choosePage: (linkId: number) => void
  changeProfileNavItemChosenStatus: (itemId: number) => void
}

const SidebarItem: React.FC<ISidebarItem> = ({
  id,
  path,
  isChosen,
  name,
  icon: SidebarIcon,
  location,
  choosePage,
  changeProfileNavItemChosenStatus
}) => {
  useEffect(() => {
    if (path === location) {
      choosePage(id)
      changeProfileNavItemChosenStatus(id)
    }
  }, [])

  const handleClick = () => {
    choosePage(id)
  }

  return (
    <NavLink
      to={path}
      onClick={handleClick}
      className={classes.sidebar_item_wrapper + isChosen ? ' ' + classes.active  : ''}
    >
      <div className={classes.sidebar_item}>
        <SidebarIcon className={classes.sidebar_item_icon} />
        <Typography.Text className={classes.sidebar_item_text}>{name}</Typography.Text>
      </div>
    </NavLink>
  )
}

export default SidebarItem
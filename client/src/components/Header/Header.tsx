import React, { useEffect, useRef } from 'react'
import { Layout, Button, Space } from 'antd'
import { MenuOutlined, MailOutlined, NotificationOutlined } from '@ant-design/icons'
import { useLocation, useNavigate, NavLink } from 'react-router-dom'
import styles from './Header.module.scss'
import { selectIsSidebarOpenStatus, selectSidebarWidth } from '../../BLL/selectors/sidebar-selectors'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { selectIsAuthStatus } from '../../BLL/selectors/auth-selectors'
import { authActions, clearToken } from '../../BLL/reducer-auth'
import { useLogoutMutation } from '../../DAL/authApi'
import { appActions } from '../../BLL/reducer-app'
import { sidebarActions } from '../../BLL/reducer-sidebar'

const { Header: AntHeader } = Layout

const Header: React.FC = ({}) => {
  const dispatch = useAppDispatch()
  const headerRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const navigate = useNavigate()

  const isSidebarOpen = useAppSelector(selectIsSidebarOpenStatus)
  const isAuth = useAppSelector(selectIsAuthStatus)
  const drawerWidth = useAppSelector(selectSidebarWidth)

  const { changeSidebarIsOpenStatus } = sidebarActions
  const { setHeaderHeight } = appActions
  const { setLastUrl } = authActions

  const [logout, { isLoading: isLogoutPending }] = useLogoutMutation()

  useEffect(() => {
    const node = headerRef.current
    if (node && node.clientHeight !== undefined) {
      dispatch(setHeaderHeight(`${node.clientHeight}px`))
    } else {
      dispatch(setHeaderHeight('64px'))
    }
  }, [])

  const handleSidebarToggle = () => {
    dispatch(changeSidebarIsOpenStatus(!isSidebarOpen))
  }

  const handleLogout = async () => {
    dispatch(setLastUrl(location.pathname))
    await logout().unwrap()
    clearToken()
    localStorage.removeItem('userData')
    navigate('/login')
  }

  return (
    <AntHeader
      ref={headerRef}
      className={styles.header}
      style={{
        width: isSidebarOpen ? `calc(100% - ${drawerWidth}px)` : '100%',
        marginLeft: isSidebarOpen ? `${drawerWidth}px` : 0,
      }}
    >
      <div className={styles.toolbarWrapper}>
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={handleSidebarToggle}
          className={styles.menuButton}
        />
        <Space>
          <NavLink to="/Messages" className={styles.iconLink}>
            <MailOutlined />
          </NavLink>
          <NavLink to="/Notifications" className={styles.iconLink}>
            <NotificationOutlined />
          </NavLink>
          {isAuth ? (
            <Button disabled={isLogoutPending} onClick={handleLogout} type="primary" className={styles.logButton}>
              Logout
            </Button>
          ) : (
            <NavLink to="/login">
              <Button disabled={isLogoutPending} type="primary" className={styles.logButton}>
                Login
              </Button>
            </NavLink>
          )}
        </Space>
      </div>
    </AntHeader>
  )
}

export default Header
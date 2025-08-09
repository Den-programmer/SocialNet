import React from 'react'
import classes from './Footer.module.scss'
import { useAppSelector } from '../../hooks/hooks'
import { selectYear } from '../../BLL/selectors/footer-selectors'
import { selectIsSidebarOpenStatus, selectSidebarWidth } from '../../BLL/selectors/sidebar-selectors'

const Footer: React.FC = ({}) => {

  const year = useAppSelector(selectYear)
  const isSidebarOpen = useAppSelector(selectIsSidebarOpenStatus)
  const drawerWidth = useAppSelector(selectSidebarWidth)

  const footerStyle: React.CSSProperties = isSidebarOpen
    ? {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: 'margin 0.3s ease, width 0.3s ease'
      }
    : {
        width: '100%',
        marginLeft: 0,
        transition: 'margin 0.3s ease, width 0.3s ease'
      }

  return (
    <footer style={footerStyle}>
      <div className={classes.footer}>
        <div className={classes.container}>
          <div className={classes.signature}>
            <h4>&copy; {year} All rights reserved!</h4>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
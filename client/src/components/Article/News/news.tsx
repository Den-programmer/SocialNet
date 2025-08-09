import React from 'react'
import { Layout } from 'antd'
import { selectIsSidebarOpenStatus } from '../../../BLL/selectors/sidebar-selectors'
import NewsContent from './NewsContent/newsContent'
import NewsToolbar from './NewsToolbar/newsToolbar'
import styles from './news.module.css'
import { useAppSelector } from '../../../hooks/hooks'

const { Content } = Layout

const News: React.FC = () => {
  const isSidebarOpen = useAppSelector(selectIsSidebarOpenStatus)
  return (<>
    <Content className={isSidebarOpen ? styles.smContainer : styles.container}>
      <NewsContent />
      <NewsToolbar />
    </Content>
  </>)
}

export default News



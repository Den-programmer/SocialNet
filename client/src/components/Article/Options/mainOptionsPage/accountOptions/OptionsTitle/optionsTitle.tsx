import React from 'react'
import styles from './optionsTitle.module.scss'

interface IOptionsTitle {
  title: string
}

const OptionsTitle: React.FC<IOptionsTitle> = ({ title }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.optionsTitle}>{title}</h2>
    </div>
  )
}

export default OptionsTitle
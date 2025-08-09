import React from 'react'
import { Card } from 'antd'
import styles from './biography.module.scss'

interface IBiography {
  gender: string | undefined
  userName: string | undefined
  AboutMe: string | undefined
}

const Biography: React.FC<IBiography> = ({ userName, gender, AboutMe }) => {
  return (
    <Card title='Biography' className={styles.biography} variant={"borderless"}>
      <table className={styles.bioTable}>
        <tbody>
          <tr className={styles.bioTableItem}>
            <th>Name</th>
            <td>{userName}</td>
          </tr>
          <tr className={styles.bioTableItem}>
            <th>Gender</th>
            <td>{gender}</td>
          </tr>
          {AboutMe && (
            <tr className={styles.bioTableItem}>
              <th>About Me</th>
              <td className={styles.bioTableItem__value_second_style}>{AboutMe}</td>
            </tr>
          )}
        </tbody>
      </table>
    </Card>
  )
}

export default Biography
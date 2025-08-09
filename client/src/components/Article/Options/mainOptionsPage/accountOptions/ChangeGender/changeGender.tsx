import React, { useState } from 'react'
import { Select, notification } from 'antd'
import classes from './changeGender.module.scss'
import { IChangeOptions } from '../accountOptions'

const { Option } = Select

const ChangeGender: React.FC<IChangeOptions> = (props) => {
  const [genderValue, setGenderValue] = useState<string>(props.gender)

  const changeGender = async (gender: string) => {
    let userId = props.userId
    setGenderValue(gender)
    await props.setGender({gender, userId})
    props.createNotification({ title: `You have changed your gender! Now you're ${gender}`, pageUrl: '/Profile', itemType: 'Profile'})

    notification.success({
      message: 'Gender Updated',
      description: `Your gender is now set to "${gender}"`,
      placement: 'bottomRight'
    })
  }

  return (
    <div className={classes.changeGender}>
      <div className={classes.changeGender_content}>
        <h5 className={classes.property}>{props.property}</h5>
        <div className={classes.selectList}>
          <Select
            style={{ width: 120 }}
            value={genderValue}
            onChange={changeGender}
          >
            <Option value="Not Chosen">Not Chosen</Option>
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
          </Select>
        </div>
      </div>
    </div>
  )
}

export default ChangeGender
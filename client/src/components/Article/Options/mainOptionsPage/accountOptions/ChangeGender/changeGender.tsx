import React from 'react'
import { Select, notification } from 'antd'
import classes from './changeGender.module.scss'
import { IChangeOptions } from '../accountOptions'
import { useGetGenderQuery, useUpdateGenderMutation } from '../../../../../../DAL/profileApi'
import Preloader from '../../../../../common/preloader/preloader'

const ChangeGender: React.FC<IChangeOptions> = (props) => {
  const {
    data: serverGender,
    isLoading: isGenderLoading
  } = useGetGenderQuery(props.userId, {
    skip: !props.userId
  })

  const [updateGender, { isLoading: isUpdating }] = useUpdateGenderMutation()

  const genderOptions = [
    { value: 'Not Chosen', label: 'Not Chosen' },
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
  ]


  const changeGender = async (gender: string) => {
    try {
      await updateGender({
        gender,
        userId: props.userId
      }).unwrap()

      props.createNotification({
        title: `You have changed your gender!`,
        pageUrl: '/Profile',
        itemType: 'Profile'
      })

      notification.success({
        message: 'Gender Updated',
        description: `Your gender is now set to "${gender}"`,
        placement: 'bottomRight'
      })

    } catch (error) {
      notification.error({
        message: 'Update failed',
        description: 'Could not update your gender',
        placement: 'bottomRight'
      })
    }
  }


  if (isGenderLoading || isUpdating) {
    return <Preloader />
  }


  return (
    <div className={classes.changeGender}>
      <div className={classes.changeGender_content}>
        <h5 className={classes.property}>
          {props.property}
        </h5>

        <div className={classes.selectList}>
          <Select
            disabled={isUpdating}
            style={{ width: 120 }}
            value={serverGender}
            onChange={changeGender}
            options={genderOptions}
          />
        </div>
      </div>
    </div>
  )
}

export default ChangeGender
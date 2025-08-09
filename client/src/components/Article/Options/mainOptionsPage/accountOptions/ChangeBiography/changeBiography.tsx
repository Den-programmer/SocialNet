import React, { useState, ChangeEvent } from 'react'
import { Input, Button, notification } from 'antd'
import { IChangeOptions } from '../accountOptions'
import classes from './changeBiography.module.scss'
import { selectAuthorizedUserId } from '../../../../../../BLL/selectors/auth-selectors'
import { useAppSelector } from '../../../../../../hooks/hooks'

const ChangeBiography: React.FC<IChangeOptions> = ({
  aboutMe: initialAboutMe,
  property,
  saveAboutMe,
  createNotification
}) => {
  const [aboutMe, setAboutMe] = useState<string>(initialAboutMe || '')

  const userId = useAppSelector(selectAuthorizedUserId)

  const onEditInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAboutMe(e.target.value)
  }

  const changeAboutMeInformation = async () => {
    await saveAboutMe({aboutMe, userId})

    notification.success({
      message: 'Biography Updated',
      description: 'Your biography has been changed successfully!',
      placement: 'bottomRight'
    })

    createNotification({
      title: 'Your biography has been changed successfully!',
      pageUrl: '/Profile',
      itemType: 'Profile'
    })
  }

  return (
    <div className={classes.changeBiography}>
      <div className={classes.changeBiography_content}>
        <h5 className={classes.property}>{property}</h5>
        <div className={classes.editInputWrapper}>
          <Input
            value={aboutMe}
            onChange={onEditInputChange}
            className={classes.editInput}
          />
        </div>
      </div>

      <Button disabled={aboutMe.trim() === '' || aboutMe === initialAboutMe} type="primary" onClick={changeAboutMeInformation}>
        Save Changes
      </Button>
    </div>
  )
}

export default ChangeBiography
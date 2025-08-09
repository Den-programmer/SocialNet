import React, { useState } from 'react'
import { Input, Button, notification } from 'antd'
import { IChangeOptions } from '../accountOptions'

const ChangeUserName: React.FC<IChangeOptions> = ({
  userId,
  userName: initialUserName,
  property,
  changeUserName,
  createNotification
}) => {
  const [userName, setUserName] = useState(initialUserName)

  const onUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
  }


  const handleChangeUserName = async () => {
    await changeUserName({ userId, username: userName })
    

    notification.success({
      message: 'Nickname Changed',
      description: `Your nickname has been successfully updated to "${userName}"`,
      placement: 'bottomRight'
    })

    createNotification({
      title: `Your nickname has been changed successfully! Now you're ${userName}`,
      pageUrl:'/Profile',
      itemType: 'Profile'
    })
  }

  return (
    <div className="editContentItem">
      <div className="editContentItem_main">
        <h5 className="editContentItem_property">{property}</h5>
        <div className="editContentItem_editInput">
          <Input value={userName} onChange={onUserNameChange} />
        </div>
      </div>

      <Button
        type="primary"
        onClick={handleChangeUserName}
        disabled={userName.trim() === '' || userName === initialUserName}
      >
        Save Changes
      </Button>
    </div>
  )
}

export default ChangeUserName
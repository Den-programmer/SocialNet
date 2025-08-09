import React, { useState, ChangeEvent } from 'react'
import { Input, Typography, Button, message } from 'antd'
import { ICurrentContact } from '../../../contactsOptions'
// import classes from './ChangeContact.module.scss'
import { useAddNotificationMutation } from '../../../../../../../../DAL/notificationApi'
import { useUpdateContactsMutation } from '../../../../../../../../DAL/profileApi'
import { useAppSelector } from '../../../../../../../../hooks/hooks'
import { selectAuthorizedUserId } from '../../../../../../../../BLL/selectors/auth-selectors'

const { Title } = Typography

interface IChangeContact {
  id: number
  property: string
  value: string | null
  userName: string
  error: string
  currentPageUrl: string
  currentContacts: Array<ICurrentContact>
  setCurrentContacts: (array: Array<ICurrentContact>) => void
}

const ChangeContact: React.FC<IChangeContact> = props => {
  const [currentContact, setCurrentContact] = useState<string>(props.value || '')

  const [createNotification] = useAddNotificationMutation()
  const [updateContacts] = useUpdateContactsMutation()

  const userId = useAppSelector(selectAuthorizedUserId) || ''

  const saveChanges = async () => {
    const contacts: any = {}
    for (let i = 0; i < props.currentContacts.length; i++) {
      const key = props.currentContacts[i].property
      contacts[key] = props.id === i + 1 ? currentContact : props.currentContacts[i].value
    }

    const updatedArray = props.currentContacts.map(item =>
      item.id === props.id
        ? { ...item, value: currentContact, isEdit: false }
        : { ...item, isEdit: false }
    )

    props.setCurrentContacts(updatedArray)
    await updateContacts({ contacts, userId })
    createNotification({ title: 'Your contacts have been changed successfully!', pageUrl: '/Profile', itemType: 'Profile' })
    message.success('Contact updated')
  }

  const onContactChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentContact(e.target.value)
  }

  return (
    <div className="editContentItem" style={{ width: '85%' }}>
      <div>
        <Title level={5}>{props.property}</Title>
      </div>
      <div>
        <Input
          value={currentContact}
          onChange={onContactChange}
          status={props.error ? 'error' : ''}
          placeholder="Enter contact"
        />
      </div>
      <div>
        <Button
          type='primary'
          onClick={saveChanges}
          disabled={props.error !== '' || props.currentPageUrl !== '/Options/contacts'}
        >
          Save Changes
        </Button>
      </div>
    </div>
  )
}

export default ChangeContact
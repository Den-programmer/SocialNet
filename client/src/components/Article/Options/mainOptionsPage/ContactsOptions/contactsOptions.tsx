import React, { useState, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { Tooltip } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import OptionsTitle from '../accountOptions/OptionsTitle/optionsTitle'
import ChangeContact from './ChangeContacts/changeContactsForm/changeContact/changeContact'
import '../../options.scss'
import { useAppSelector } from '../../../../../hooks/hooks'
import { selectContacts, selectUsersName } from '../../../../../BLL/selectors/profile-selectors'
import { selectMessageError } from '../../../../../BLL/selectors/selectors'

export interface ICurrentContact {
  id: number
  property: string
  value: string | null
  isEdit: boolean
  isEditIconActive: boolean
}

interface IContactsOptions {
  
}

const ContactsOptions: React.FC<IContactsOptions> = ({}) => {
  const location = useLocation()

  const userName = useAppSelector(selectUsersName) || 'Your name'
  const contacts = useAppSelector(selectContacts) || {}

  const error = useAppSelector(selectMessageError) || ''

  const initialContacts = useMemo(() =>
    Object.entries(contacts).map(([key, val], idx) => ({
      id: idx + 1,
      property: key,
      value: val,
      isEdit: false,
      isEditIconActive: false
    })), [contacts])

  const [currentContacts, setCurrentContacts] = useState<ICurrentContact[]>(initialContacts)

  const handleHover = (id: number, active: boolean) => {
    setCurrentContacts(currentContacts.map(c =>
      c.id === id
        ? { ...c, isEditIconActive: active }
        : { ...c, isEditIconActive: false }
    ))
  }

  const handleClick = (id: number) => {
    setCurrentContacts(currentContacts.map(c =>
      c.id === id
        ? { ...c, isEdit: true }
        : { ...c, isEdit: false }
    ))
  }

  return (
    <div className="options">
      <OptionsTitle title="Contacts Options" />
      <div>
        {currentContacts.map(item => (
          <div
            key={item.id}
            className="options_itemWrapper"
            onMouseEnter={() => handleHover(item.id, true)}
            onMouseLeave={() => handleHover(item.id, false)}
            onClick={() => handleClick(item.id)}
          >
            <div className="options_item">
              {item.isEdit
                ? (
                  <ChangeContact
                    id={item.id}
                    property={item.property}
                    value={item.value}
                    userName={userName}
                    currentContacts={currentContacts}
                    setCurrentContacts={setCurrentContacts}
                    error={error}
                    currentPageUrl={location.pathname}
                  />
                )
                : (
                  <div className="options_item_content">
                    <h5 className="options_item_content_property">{item.property}</h5>
                    <p className="options_item_content_value">
                      {item.value || 'Not provided'}
                    </p>
                  </div>
                )
              }
              {item.isEditIconActive && (<div style={{ width: '10%' }}>
                <Tooltip title="Edit">
                  <EditOutlined style={{ fontSize: 20, color: '#1890ff' }} />
                </Tooltip>
              </div>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ContactsOptions
import React, { useState, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import OptionsTitle from '../accountOptions/OptionsTitle/optionsTitle'
import ChangeContact from './ChangeContacts/changeContactsForm/changeContact/changeContact'
import '../../options.scss'
import { useAppSelector } from '../../../../../hooks/hooks'
import { selectContacts } from '../../../../../BLL/selectors/profile-selectors'
import { socialsValidatorsMap } from '../../../../../utils/validators/validators'

export interface ICurrentContact {
  id: number
  property: string
  value: string | null
  isEdit: boolean
}

const ContactsOptions: React.FC = () => {
  const location = useLocation()

  const contacts = useAppSelector(selectContacts) || {}

  const initialContacts = useMemo(() =>
    Object.entries(contacts)
      .filter(([key]) => key in socialsValidatorsMap)
      .map(([key, val], idx) => ({
        id: idx + 1,
        property: key,
        value: val,
        isEdit: false
      })), [contacts])

  const [currentContacts, setCurrentContacts] = useState<ICurrentContact[]>(initialContacts)

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
            onClick={() => handleClick(item.id)}
            style={{ cursor: 'pointer' }}
          >
            <div className="options_item">
              {item.isEdit
                ? (
                  <ChangeContact
                    key={item.id}
                    id={item.id}
                    property={item.property}
                    value={item.value}
                    currentContacts={currentContacts}
                    setCurrentContacts={setCurrentContacts}
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
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ContactsOptions
import React, { useState } from 'react'
import { EditOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import OptionsTitle from './OptionsTitle/optionsTitle'
import { selectAuthorizedUserId } from '../../../../../BLL/selectors/auth-selectors'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks'
import { selectContacts, selectGender, selectIsMembersColumnOpenedStatus, selectUsersName, selectUsersProfile } from '../../../../../BLL/selectors/profile-selectors'
import { useUpdateAboutMeMutation, useUpdateGenderMutation, useUpdateUsernameMutation } from '../../../../../DAL/profileApi'
import { useAddNotificationMutation } from '../../../../../DAL/notificationApi'
import { profileActions } from '../../../../../BLL/reducer-profile'
import { contactsType } from '../../../../../types/ProfileTypes/profileTypes'
import { optionsMenuData } from '../../../../../data/options/optionsMenuData'

export interface IAccountOption {
  id: number
  property: string
  value: string | null
  isEditIconActive: boolean
  isEdit: boolean
  editContent: any
}

export interface IChangeOptions {
  userId: string
  changeMembersColumnOpenedStatus: (status: boolean) => void
  isMembersColumnOpen: boolean
  createNotification: (arg: { title: string, pageUrl: string, itemType: 'Profile' | 'Messages' | 'News' | 'Friends' }) => void
  saveAboutMe: (arg: { aboutMe: string, userId: string }) => void
  aboutMe: string
  setGender: (arg: { gender: string, userId: string }) => void
  gender: string
  userName: string
  contacts: contactsType
  property: string
  changeUserName: (arg: { userId: string, username: string }) => void
}

const AccountOptions: React.FC = () => {
  const userId = useAppSelector(selectAuthorizedUserId)
  const userName = useAppSelector(selectUsersName) || 'Your name'
  const gender = useAppSelector(selectGender)
  const isMembersColumnOpen = useAppSelector(selectIsMembersColumnOpenedStatus)
  const contacts = useAppSelector(selectContacts)
  const aboutMe = useAppSelector(selectUsersProfile).aboutMe

  const [changeUserName, { }] = useUpdateUsernameMutation()
  const [setGender] = useUpdateGenderMutation()
  const [saveAboutMe] = useUpdateAboutMeMutation()
  const [createNotification] = useAddNotificationMutation()
  const { changeMembersColumnOpenedStatus } = profileActions

  const dispatch = useAppDispatch()

  const [accountOptionsMenu, setOptions] = useState<IAccountOption[]>(optionsMenuData(userName, gender, aboutMe, isMembersColumnOpen))

  const handleHover = (id: number, status: boolean) => {
    setOptions((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isEditIconActive: status } : { ...item, isEditIconActive: false }
      )
    )
  }

  const handleClick = (id: number) => {
    setOptions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isEdit: true } : { ...item, isEdit: false }))
    )
  }
  return (
    <Card title={<OptionsTitle title="Profile Options" />} variant={"borderless"}>
      {accountOptionsMenu.map((item) => {
        const EditComponent = item.editContent
        return (
          <div
            key={item.id}
            onClick={() => handleClick(item.id)}
            onMouseEnter={() => handleHover(item.id, true)}
            onMouseLeave={() => handleHover(item.id, false)}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 0',
              borderBottom: '1px solid #f0f0f0',
              cursor: 'pointer'
            }}
          >
            {item.isEdit ? (
              <EditComponent
                userId={userId}
                changeMembersColumnOpenedStatus={(status: boolean) => dispatch(changeMembersColumnOpenedStatus(status))}
                isMembersColumnOpen={isMembersColumnOpen}
                createNotification={createNotification}
                saveAboutMe={saveAboutMe}
                aboutMe={aboutMe}
                setGender={setGender}
                gender={gender}
                userName={userName}
                contacts={contacts}
                property={item.property}
                changeUserName={changeUserName}
              />
            ) : (
              <>
                <div>
                  <h5 style={{ marginBottom: 4 }}>{item.property}</h5>
                  <p style={{ margin: 0 }}>{item.value}</p>
                </div>
                {item.isEditIconActive && <EditOutlined style={{ color: '#4DCADD' }} />}
              </>
            )}
          </div>
        )
      })}
    </Card>
  )
}

export default AccountOptions
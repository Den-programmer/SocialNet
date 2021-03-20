import React, { useState } from 'react'
import ChangeUserName from './ChangeUserName/changeUserName'
import { contactsType, saveProfileType } from '../../../../../types/ProfileTypes/profileTypes'
import { makeStyles, Theme, createStyles } from '@material-ui/core'
import OptionsTitle from './OptionsTitle/optionsTitle'
import EditIcon from '@material-ui/icons/Edit'
import ChangeGender from './ChangeGender/changeGender'
import ChangeBiography from './ChangeBiography/changeBiography'
import ChangeMembersColumnStatus from './ChangeMembersColumnStatus/changeMembersColumnStatus'

export interface IChangeOptions {
    property: string
    userName: string
    contacts: contactsType
    gender: string
    aboutMe: string | null
    isMembersColumnOpen: boolean
    accountOptionsMenu: Array<IAccountOption>
    saveProfile: (profile: saveProfileType) => void
    changeUserName: (userName: string) => void
    changeGender: (gender: string) => void
    addNotification: (title: string | null, pageUrl: string | null, type: 'Profile' | 'Messages' | 'Friends' | 'News') => void
    setChangesToAccountOptionsMenu: (accountOptions: Array<IAccountOption>) => void
    saveAboutMe: (aboutMe: string | null) => void
    changeMembersColumnOpenedStatus: (status: boolean) => void
}

interface IAccountOptions {
    messageError: string
    photo: any | null
    userName: string
    gender: string
    aboutMe: string | null
    contacts: contactsType
    isMembersColumnOpen: boolean
    setUserPhotoThunk: (photo: File) => void
    changeUserName: (userName: string) => void
    changeGender: (gender: string) => void
    saveProfile: (profile: saveProfileType) => void
    addNotification: (title: string | null, pageUrl: string | null, type: 'Profile' | 'Messages' | 'Friends' | 'News') => void
    saveAboutMe: (aboutMe: string | null) => void
    changeMembersColumnOpenedStatus: (status: boolean) => void
}

export interface IAccountOption {
    id: number
    property: string
    value: string | null
    isEditIconActive: boolean
    isEdit: boolean
    editContent: any
}

export const useEditIconStyles = makeStyles((theme: Theme) => createStyles({
    editIcon: {
        padding: '0 10px',
        color: '#4DCADD'
    },
    errorIcon: {
        color: '#D40000',
        padding: '0 20px' 
    }
}))

const AccountOptions: React.FC<IAccountOptions> = (props) => {
    const classes = useEditIconStyles()
    const [accountOptionsMenu, setChangesToAccountOptionsMenu] = useState<Array<IAccountOption>>([
        {
            id: 1, 
            property: 'Nickname',
            value: props.userName,
            isEditIconActive: false,
            isEdit: false,
            editContent: ChangeUserName
        },
        {
            id: 2,
            property: 'Gender',
            value: props.gender,
            isEditIconActive: false,
            isEdit: false,
            editContent: ChangeGender
        },
        {
            id: 3,
            property: 'About Me',
            value: props.aboutMe,
            isEditIconActive: false,
            isEdit: false,
            editContent: ChangeBiography
        },
        {
            id: 4,
            property: 'Members column',
            value: props.isMembersColumnOpen ? 'opened' : 'closed',
            isEditIconActive: false,
            isEdit: false,
            editContent: ChangeMembersColumnStatus
        }
    ])
    const menuItems = accountOptionsMenu.map((item: IAccountOption) => {
        const handleHover = (itemId: number, status: boolean) => {
            let array = accountOptionsMenu.map((item: IAccountOption) => {
                if (itemId === item.id && status === true) return { ...item, isEditIconActive: true }
                return { ...item, isEditIconActive: false }
            })
            setChangesToAccountOptionsMenu(array)
        }
        const handleClick = (itemId: number) => {
            let array = accountOptionsMenu.map((item: IAccountOption) => {
                if (itemId === item.id) return { ...item, isEdit: true }
                return { ...item, isEdit: false }
            })
            setChangesToAccountOptionsMenu(array)
        }
        return (
            <div onClick={() => handleClick(item.id)} onMouseEnter={() => handleHover(item.id, true)} onMouseLeave={() => handleHover(item.id, false)} key={item.id} className="options_itemWrapper">
                <div className="options_item">
                    {item.isEdit ? <item.editContent changeMembersColumnOpenedStatus={props.changeMembersColumnOpenedStatus} isMembersColumnOpen={props.isMembersColumnOpen} addNotification={props.addNotification} saveAboutMe={props.saveAboutMe} aboutMe={props.aboutMe} changeGender={props.changeGender} gender={props.gender} userName={props.userName} contacts={props.contacts} property={item.property} 
                    setChangesToAccountOptionsMenu={setChangesToAccountOptionsMenu} accountOptionsMenu={accountOptionsMenu} 
                    saveProfile={props.saveProfile} changeUserName={props.changeUserName}/> :
                        <div className="options_item_content">
                            <h5 className="options_item_content_property">{item.property}</h5>
                            <p className="options_item_content_value">{item.value}</p>
                        </div>}
                    {item.isEditIconActive && <EditIcon className={classes.editIcon} />}
                </div>
            </div>
        )
    })
    return (
        <div className="options">
            <OptionsTitle title="Profile Options" />
            <div>
                {menuItems}
            </div>
        </div>
    )
}

export default AccountOptions
import React, { useState } from 'react'
import EditPhoto from './editPhoto/editPhoto'
import ChangeContacts from './ChangeContacts/changeContacts'
import ChangeUserName from './ChangeUserName/changeUserName'
import { contactsType, saveProfileType } from '../../../../../BLL/reducer-profile'
import { makeStyles, Theme, createStyles } from '@material-ui/core'
import OptionsTitle from './OptionsTitle/optionsTitle'
import EditIcon from '@material-ui/icons/Edit'
import ChangeGender from './ChangeGender/changeGender'

export interface IChangeOptions {
    property: string
    userName: string
    contacts: contactsType
    gender: string
    accountOptionsMenu: Array<IAccountOption>
    saveProfile: (profile: saveProfileType) => void
    changeUserName: (userName: string) => void
    changeGender: (gender: string) => void
    setChangesToAccountOptionsMenu: (accountOptions: Array<IAccountOption>) => void
}

interface IAccountOptions {
    messageError: string | null
    photo: any | null
    userName: string
    gender: string
    contacts: contactsType
    setUserPhotoThunk: (photo: File) => void
    changeUserName: (userName: string) => void
    changeGender: (gender: string) => void
    saveProfile: (profile: saveProfileType) => void
}

export interface IAccountOption {
    id: number
    property: string
    value: string
    isEditIconActive: boolean
    isEdit: boolean
    editContent: any
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    container: {
        margin: '0px 20px',
        width: '100%',
        minHeight: '100vh'
    },
    accountOptions__itemWrapper: {
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid #E3E3E3',
        cursor: 'pointer'
    },
    accountOptions__item: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '50px',
        width: '100%',
        '&:hover': {
            backgroundColor: '#f5f6f7'
        }
    },
    accountOptions__item_content: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px'
    },
    accountOptions__item_property: {
        width: '200px',
        fontSize: '14px',
        color: '#222222',
        fontFamily: 'Lato, sans-serif'
    },
    accountOptions__item_value: {
        width: '600px',
        fontSize: '14px',
        color: '#2D2D2D',
        fontFamily: 'Open Sans, sans-serif'
    },
    editIcon: {
        padding: '0 10px',
        color: '#4DCADD'
    }
}))

const AccountOptions: React.FC<IAccountOptions> = (props) => {
    const classes = useStyles()
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
            <div onClick={() => handleClick(item.id)} onMouseEnter={() => handleHover(item.id, true)} onMouseLeave={() => handleHover(item.id, false)} key={item.id} className={classes.accountOptions__itemWrapper}>
                <div className={classes.accountOptions__item}>
                    {item.isEdit ? <item.editContent changeGender={props.changeGender} gender={props.gender} userName={props.userName} contacts={props.contacts} property={item.property} 
                    setChangesToAccountOptionsMenu={setChangesToAccountOptionsMenu} accountOptionsMenu={accountOptionsMenu} 
                    saveProfile={props.saveProfile} changeUserName={props.changeUserName}/> :
                        <div className={classes.accountOptions__item_content}>
                            <h5 className={classes.accountOptions__item_property}>{item.property}</h5>
                            <p className={classes.accountOptions__item_value}>{item.value}</p>
                        </div>}
                    {item.isEditIconActive && <EditIcon className={classes.editIcon} />}
                </div>
            </div>
        )
    })
    return (
        <div className={classes.container}>
            <OptionsTitle title="Profile Options" />
            <div>
                {menuItems}
            </div>
            {/* <EditPhoto error={props.messageError} setUserPhoto={props.setUserPhotoThunk} photo={props.photo}/> */}
            {/* <ChangeContacts userName={props.userName} saveProfile={props.saveProfile} contacts={props.contacts}/> */}
        </div>
    )
}

export default AccountOptions
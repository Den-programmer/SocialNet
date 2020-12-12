import React from 'react'
import classes from './avatar.module.scss'
import facebook from '../images/facebook.png'
import twitter from '../images/twitter.png'
import youtube from '../images/youtube.png'
import { contactsType } from '../../../../../BLL/reducer-profile'

interface IUserAvatar {
    name: string
    avatar: string
    contacts: contactsType
}

const Avatar: React.FC<IUserAvatar> = (props) => {
    const contactsData = Object.keys(props.contacts).map((key, index) => {
        return {
            id: index + 1,
            title: key,
            value: props.contacts[key as keyof contactsType]
        }
    })
    const socialsData = contactsData.map((item, index) => {
        if (item.title === 'facebook' || item.title === 'twitter' || item.title === 'youtube') {
            return {
                id: index + 1,
                title: item.title,
                value: item.value,
                photo: item.title === 'facebook' ? facebook : item.title === 'twitter' ? twitter : youtube
            }
        }
    })
    const socials = socialsData.map((item) => {
        if (item) {
            return (
                // @ts-ignore
                <a target="_blank" key={item.id} href={item.value}>
                    <div className={classes.social}>
                        <img src={item.photo} alt="" />
                    </div>
                </a>
            )
        }
    })
    return (
        <div className={classes.avatarWrapper}>
            <div className={classes.avatar}>
                <img className={classes.userImg} src={props.avatar} alt="avatar" />
                <div className={classes.userInf}>
                    <div className={classes.name}>
                        <h2>
                            {props.name}
                        </h2>
                    </div>
                    <div className={classes.horizontal_line}></div>
                    <div className={classes.socialPanel}>
                        {socials}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Avatar
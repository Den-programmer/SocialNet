import React from 'react'
import classes from './singer.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'

interface ISinger {
    id: number
    photo: string 
    name: string
    location: string | null
    subscribersCount: number
}

const Singer:React.FC<ISinger> = ({photo, name, location, subscribersCount}) => {
    return (
        <li className={classes.singer}>
            <div className={classes.singerPhoto}>
                <img loading="lazy" src={photo} alt="singerPhoto" />
            </div>
            <div className={classes.singerInf}>
                <div className={classes.name}>{name}</div>
                <div className={classes.location}>{location}</div>
                <div className={classes.suscribersCount}>
                    <FontAwesomeIcon className={classes.usersIcon} icon={faUsers}/>
                    {subscribersCount}
                </div>
            </div>
        </li>
    )
}

export default Singer
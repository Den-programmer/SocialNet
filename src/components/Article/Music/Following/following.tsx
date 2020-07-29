import React from 'react'
import classes from './following.module.css'
import { singerType } from '../../../../BLL/reducer-music'
import Singer from './singer/singer'

interface IFollowing {
    singers: Array<singerType>
}

const Following: React.FC<IFollowing> = (props) => {
    const singers = props.singers.map((singer: singerType) => {
        return <Singer key={singer.id} id={singer.id} 
        photo={singer.photoSinger} 
        name={singer.name} 
        location={singer.location} 
        subscribersCount={singer.subscribers}/>
    })
    return (
        <ul className={classes.following}>
            {singers}
        </ul>
    )
}

export default Following
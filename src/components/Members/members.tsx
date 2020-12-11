import React from 'react'
import classes from './members.module.scss'
import { Divider, Typography } from '@material-ui/core'
import Friends from './Friends/friendsContainer'
import { userType } from '../../types/FriendsType/friendsType'

interface IMembers {
    friends: Array<userType>
}

const Members: React.FC<IMembers> = ({ friends }) => {
    return (<>
        {friends.length !== 0 && <div className={classes.members}>
            <div className={classes.title}>
                <h3>Members</h3>
            </div>
            <div className={classes.membersPanel}>
                <Divider />
                <div className={classes.membersPanel_items}>
                    <Typography className={classes.membersPanel_items_item} paragraph={true}>Newest</Typography>
                    <Typography className={classes.membersPanel_items_item} paragraph={true}>Active</Typography>
                    <Typography className={classes.membersPanel_items_item} paragraph={true}>Popular</Typography>
                </div>
                <Divider />
            </div>
            <Friends />
            <Divider />
        </div>}
    </>)    
}

export default Members
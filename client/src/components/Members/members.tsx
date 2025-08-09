import { Divider, Typography } from 'antd'
import Friends from './Friends/friends'
import { userType } from '../../types/FriendsType/friendsType'
import classes from './members.module.scss'
import { useAppSelector } from '../../hooks/hooks'

const { Paragraph, Title } = Typography

const Members = () => {
    const friends: Array<userType> = useAppSelector((state) => state.Friends.friends)
    return (
        <>
            {friends.length !== 0 && (
                <div className={classes.members}>
                    <div className={classes.title}>
                        <Title level={3}>Members</Title>
                    </div>
                    <div className={classes.membersPanel}>
                        <Divider />
                        <div className={classes.membersPanel_items}>
                            <Paragraph className={classes.membersPanel_items_item}>Newest</Paragraph>
                            <Paragraph className={classes.membersPanel_items_item}>Active</Paragraph>
                            <Paragraph className={classes.membersPanel_items_item}>Popular</Paragraph>
                        </div>
                        <Divider />
                    </div>
                    <Friends />
                    <Divider />
                </div>
            )}
        </>
    )
}

export default Members
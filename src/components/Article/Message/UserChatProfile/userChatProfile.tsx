import React from 'react'
import classes from './userChatProfile.module.scss'
import { Avatar, Accordion, AccordionSummary, AccordionDetails, Typography, Container } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { userDialogType } from '../../../../types/MessagesTypes/messagesTypes'
import defaultUser from '../../Profile/images/withoutAvatar/defaultUserPhoto.jpg'

interface IUserChatProfile {
    dialogsData: Array<userDialogType>
}

const UserChatProfile:React.FC<IUserChatProfile> = ({ dialogsData }) => {
    const currentUser = dialogsData.filter((item: userDialogType) => item.isActive && true).find((item: userDialogType) => item)
    const photoCheck = currentUser?.photos.large ? currentUser?.photos.large : 
    currentUser?.photos.small ? currentUser?.photos.small : defaultUser
    return (
        <Container className={classes.userChatProfile}>
            <div className={classes.userProfile}>
                <Avatar className={classes.avatar} alt="user" src={photoCheck}/>
                <h3 className={classes.userName}>{currentUser?.userName}</h3>
            </div>
            <div className={classes.root}>
                <Accordion className={classes.accordion}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordionOutside}>
                        <Typography>Customize chat</Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.accordionInside}>
                        <Typography>Some Options</Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion className={classes.accordion}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordionOutside}>
                        <Typography>Privacy &#38; Support</Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.accordionInside}>
                        <Typography>Some Options</Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        </Container>
    )
}

export default UserChatProfile
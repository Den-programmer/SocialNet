import classes from '../messages.module.scss'
import { Badge, Empty } from 'antd'
import NoDialogs from '../../../common/NoDialogs/noDialogs'
import { Avatar, Button, Input, List, Tooltip, Typography, Spin } from 'antd'
import {
    UserOutlined,
    DeleteOutlined,
    SearchOutlined,
    MessageOutlined,
    PlusOutlined
} from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../../../hooks/hooks'
import { userDialogType, MessageParticipant } from '../../../../types/MessagesTypes/messagesTypes'
import { userType } from '../../../../types/FriendsType/friendsType'


const { Text, Title } = Typography

interface DialogsProps {
    fetchUsers: (params: { pageSize: number; term?: string }) => void
    dialogsData: userDialogType[] | undefined
    dialogsLoading: boolean
    filteredUsers: userType[]
    isUsersLoading: boolean
    userDialogId: string
    authorizedUserId: string
    setUserDialogId: (dialogId: string) => void
    setNewDialogSearch: (val: string) => void
    setShowNewDialogModal: (val: boolean) => void
    setDeleteDialogId: (dialogId: string | null) => void
    mobileShowChat: boolean
    setMobileShowChat: (val: boolean) => void
}

const Dialogs: React.FC<DialogsProps> = ({ userDialogId, fetchUsers, dialogsData, dialogsLoading, authorizedUserId, setUserDialogId, setNewDialogSearch, setShowNewDialogModal, setDeleteDialogId, mobileShowChat, setMobileShowChat }: DialogsProps) => {
    const dispatch = useAppDispatch()
    const [search, setSearch] = useState('')

    const handleOpenNewDialog = () => {
        setNewDialogSearch('')
        fetchUsers({ pageSize: 30 })
        setShowNewDialogModal(true)
    }

    // Filtered dialogs by search
    const filteredDialogs = (dialogsData || []).filter((d: userDialogType) => {
        if (!search.trim()) return true
        const otherUser = d.participants?.find((u: MessageParticipant) => u.id !== authorizedUserId)
        return otherUser?.username?.toLowerCase().includes(search.toLowerCase())
    })

    // Auto-select first dialog when dialogs load
    useEffect(() => {
        if (!userDialogId && dialogsData && dialogsData.length > 0) {
            const firstDialog = dialogsData[0]
            setUserDialogId(firstDialog.id)
        }
    }, [dialogsData, userDialogId, dispatch, setUserDialogId])

    return (
        < div className={`${classes.dialogsSection} ${mobileShowChat ? classes.dialogsSectionHidden : ''}`}>
            <div className={classes.dialogsHeader}>
                <div className={classes.dialogsHeaderTop}>
                    <Title level={4} className={classes.dialogsTitle}>
                        Conversations
                    </Title>
                    <div className={classes.dialogsHeaderActions}>
                        <Text className={classes.dialogsCount}>
                            {filteredDialogs.length} dialog{filteredDialogs.length !== 1 ? 's' : ''}
                        </Text>
                        <Tooltip title="New conversation">
                            <Button
                                type="text"
                                shape="circle"
                                icon={<PlusOutlined />}
                                size="small"
                                className={classes.newDialogButton}
                                onClick={handleOpenNewDialog}
                            />
                        </Tooltip>
                    </div>
                </div>
                <Input
                    className={classes.searchInput}
                    placeholder="Search conversations..."
                    prefix={<SearchOutlined className={classes.searchIcon} />}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    allowClear
                />
            </div>

            <div className={classes.dialogsList}>
                {dialogsLoading ? (
                    <div className={classes.loadingContainer}><Spin /></div>
                ) : filteredDialogs.length > 0 ? (
                    <List
                        itemLayout="horizontal"
                        dataSource={filteredDialogs}
                        renderItem={(dialog: userDialogType) => {
                            const otherUser = dialog.participants.find((u: MessageParticipant) => u.id !== authorizedUserId)
                            const dialogId = dialog.id
                            const avatarSrc = otherUser?.photos?.small || undefined
                            const conversationUsername = otherUser?.username || 'Unknown User'
                            const isSelected = dialogId === userDialogId
                            const lastMsg = dialog.messages?.[dialog.messages.length - 1]
                            const lastMsgTime = lastMsg?.createdAt
                                ? new Date(lastMsg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                : ''

                            return (
                                <List.Item
                                    className={`${classes.dialogItem} ${isSelected ? classes.dialogItemSelected : classes.dialogItemUnselected}`}
                                    onClick={() => {
                                        setUserDialogId(dialogId)
                                        setMobileShowChat(true)
                                    }}
                                >
                                    <List.Item.Meta
                                        avatar={
                                            <Badge dot={isSelected} color="#1677ff" className={classes.avatarBadge}>
                                                <Avatar
                                                    size={46}
                                                    icon={!avatarSrc && <UserOutlined />}
                                                    src={avatarSrc}
                                                    className={`${classes.avatarPrimary} ${isSelected ? classes.avatarBorder : ''}`}
                                                />
                                            </Badge>
                                        }
                                        title={
                                            <div className={classes.dialogUserNameMetadata}>
                                                <Text strong className={`${classes.dialogUserName} ${isSelected ? classes.dialogUserNameSelected : ''}`}>
                                                    {conversationUsername}
                                                </Text>
                                                <div className={classes.dialogMetaRight}>
                                                    {lastMsgTime && (
                                                        <span className={classes.dialogTimestamp}>{lastMsgTime}</span>
                                                    )}
                                                    <Tooltip title="Delete conversation">
                                                        <Button
                                                            type="text"
                                                            size="small"
                                                            danger
                                                            shape="circle"
                                                            icon={<DeleteOutlined />}
                                                            className={classes.deleteDialogButton}
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                setDeleteDialogId(dialogId)
                                                            }}
                                                        />
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        }
                                        description={
                                            <Text className={classes.dialogLastMessage}>
                                                {lastMsg?.text?.substring(0, 45) || 'No messages yet'}
                                            </Text>
                                        }
                                    />
                                </List.Item>
                            )
                        }}
                        locale={{ emptyText: <NoDialogs /> }}
                    />
                ) : (
                    <div className={classes.noConversationsContainer}>
                        <Empty
                            image={<MessageOutlined className={classes.emptyIcon} />}
                            description={search ? `No results for "${search}"` : 'No conversations yet'}
                            className={classes.emptyMargin}
                        />
                    </div>
                )}
            </div>
        </div >
    )
}

export default Dialogs 
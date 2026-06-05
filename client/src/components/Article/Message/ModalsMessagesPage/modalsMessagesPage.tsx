import classes from '../messages.module.scss'
import { useState } from "react"
import { Button, List, Input, Spin, Avatar } from "antd"
import { SearchOutlined, UserOutlined } from '@ant-design/icons'
import Modal from 'antd/es/modal/Modal'
import { userDialogType } from '../../../../types/MessagesTypes/messagesTypes'
import { userType } from '../../../../types/FriendsType/friendsType'

interface ModalsMessagesPageProps {
    fetchUsers: (params: { pageSize: number; term?: string }) => void
    dialogsData: userDialogType[] | undefined
    messagesLoading: boolean
    filteredUsers: userType[]
    isUsersLoading: boolean
    authorizedUserId: string
    deleteDialog: (args: { dialogId: string }) => { unwrap: () => Promise<boolean> }
    handleStartDialog: (userId: string) => void
    userDialogId: string
    setUserDialogId: (dialogId: string) => void
    setNewDialogSearch: (val: string) => void
    newDialogSearch: string
    setShowNewDialogModal: (val: boolean) => void
    showNewDialogModal: boolean
    setDeleteDialogId: (dialogId: string | null) => void
    deleteDialogId: string | null
    setLightboxImage: (url: string | null) => void
    lightboxImage: string | null
}

const ModalsMessagesPage: React.FC<ModalsMessagesPageProps> = ({ userDialogId, fetchUsers, dialogsData, messagesLoading, filteredUsers, isUsersLoading, authorizedUserId, deleteDialog, handleStartDialog, setUserDialogId, setNewDialogSearch, newDialogSearch, setShowNewDialogModal, showNewDialogModal, setDeleteDialogId, deleteDialogId, setLightboxImage, lightboxImage }: ModalsMessagesPageProps) => {

    const [isDeleting, setIsDeleting] = useState(false)
    const [startingDialogFor] = useState<string | null>(null)

    const handleNewDialogSearch = (val: string) => {
        setNewDialogSearch(val)
        fetchUsers({ pageSize: 30, term: val })
    }

    const handleDeleteDialog = async () => {
        if (!deleteDialogId) return
        setIsDeleting(true)
        try {
            await deleteDialog({ dialogId: deleteDialogId }).unwrap()
            if (userDialogId === deleteDialogId) {
                const remaining = (dialogsData || []).filter((d: userDialogType) => d.id !== deleteDialogId)
                if (remaining.length > 0) {
                    const sorted = [...remaining].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                    setUserDialogId(sorted[0].id)
                } else {
                    setUserDialogId('')
                }
            }
        } catch (e) {
            console.error('Failed to delete conversation', e)
        } finally {
            setIsDeleting(false)
            setDeleteDialogId(null)
        }
    }

    return (
        <>
            {messagesLoading ? <div className={classes.loadingContainer}>
                <Spin size="large" />
            </div> : (<>
                < Modal
                    title="Delete Conversation"
                    open={!!deleteDialogId
                    }
                    onCancel={() => setDeleteDialogId(null)}
                    onOk={handleDeleteDialog}
                    okText="Delete"
                    okButtonProps={{ danger: true, loading: isDeleting }}
                    cancelButtonProps={{ disabled: isDeleting }}
                >
                    <p>Are you sure you want to delete this conversation? All messages will be permanently removed.</p>
                </Modal >

                < Modal
                    title="New Conversation"
                    open={showNewDialogModal}
                    onCancel={() => setShowNewDialogModal(false)}
                    footer={null}
                    className={classes.newDialogModal}
                >
                    <Input
                        placeholder="Search users..."
                        prefix={<SearchOutlined />}
                        value={newDialogSearch}
                        onChange={(e) => handleNewDialogSearch(e.target.value)}
                        allowClear
                        className={classes.newDialogSearch}
                    />
                    {
                        isUsersLoading ? (
                            <div className={classes.loadingContainer} style={{ height: 200 }}><Spin /></div>
                        ) : (
                            <List
                                className={classes.newDialogUserList}
                                dataSource={filteredUsers}
                                renderItem={(user: userType) => {
                                    const userId = String(user.id || '')
                                    // Check if dialog already exists
                                    const existingDialog = dialogsData?.find(d => 
                                        d.participants.some(p => p.id === userId) && 
                                        d.participants.some(p => p.id === authorizedUserId)
                                    )

                                    return (
                                        <List.Item
                                            className={classes.newDialogUserItem}
                                            actions={[
                                                <Button
                                                    key="start"
                                                    type="primary"
                                                    size="small"
                                                    loading={startingDialogFor === userId}
                                                    onClick={() => {
                                                        if (existingDialog) {
                                                            setUserDialogId(existingDialog.id)
                                                            setShowNewDialogModal(false)
                                                        } else {
                                                            handleStartDialog(userId)
                                                        }
                                                    }}
                                                >
                                                    {existingDialog ? 'Open' : 'Message'}
                                                </Button>
                                            ]}
                                        >
                                            <List.Item.Meta
                                                avatar={
                                                    <Avatar
                                                        src={user.profile.photos?.small as string}
                                                        icon={!user.profile.photos?.small && <UserOutlined />}
                                                    />
                                                }
                                                title={user.username}
                                            />
                                        </List.Item>
                                    )
                                }}
                                locale={{ emptyText: 'No users found' }}
                            />
                        )
                    }
                </Modal >

                < Modal
                    open={!!lightboxImage}
                    onCancel={() => setLightboxImage(null)}
                    footer={null}
                    centered
                    width="auto"
                    className={classes.lightboxModal}
                    styles={{ body: { padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' } }}
                >
                    {lightboxImage && (
                        <img
                            src={lightboxImage}
                            alt="Full size"
                            className={classes.lightboxImage}
                        />
                    )}
                </Modal ></>
            )}
        </>
    )
}

export default ModalsMessagesPage
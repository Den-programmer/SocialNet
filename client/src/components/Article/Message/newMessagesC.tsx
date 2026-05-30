import {
  Card
} from 'antd'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { selectAuthorizedUserId } from '../../../BLL/selectors/auth-selectors'
import { selectUserDialogId } from '../../../BLL/selectors/messages-selectors'
import {
  useGetAllDialogsQuery,
  useStartDialogMutation,
  useDeleteDialogMutation,
} from '../../../DAL/graphQL/graphqlApi'
import { setUserDialogId } from '../../../BLL/reducer-messages'
import { useLazyGetUsersQuery } from '../../../DAL/usersApi'
import classes from './messages.module.scss'
import ModalsMessagesPage from './ModalsMessagesPage/modalsMessagesPage'
import Dialogs from './Dialogs/dialogs'
import MessagesPanel from './MessagesPanel/messagesPanel'
import { useState } from 'react'
import { userDialogType, MessageType } from '../../../types/MessagesTypes/messagesTypes'
import { userType } from '../../../types/FriendsType/friendsType'

const MessagesPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const userDialogId = useAppSelector(selectUserDialogId)
  const authorizedUserId = useAppSelector(selectAuthorizedUserId)

  const [newDialogSearch, setNewDialogSearch] = useState('')
  const [showNewDialogModal, setShowNewDialogModal] = useState(false)
  const [deleteDialogId, setDeleteDialogId] = useState<string | null>(null)
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const [mobileShowChat, setMobileShowChat] = useState(false)

  const [deleteDialog] = useDeleteDialogMutation()
  const [startDialog] = useStartDialogMutation()
  
  const {
    data: dialogsData,
    isLoading: dialogsLoading,
  } = useGetAllDialogsQuery()

  const messagesLoading = dialogsLoading

  // Find the selected dialog
  const selectedDialog = (dialogsData?.find((d: userDialogType) => d.id === userDialogId) || null) as userDialogType | null
  const messages: MessageType[] = selectedDialog?.messages || []

  const handleStartDialog = async (userId: string) => {
    try {
      const result = await startDialog(userId).unwrap()
      if (result && result.id) {
        dispatch(setUserDialogId(result.id))
        setMobileShowChat(true)
        setShowNewDialogModal(false)
      }
    } catch (e) {
      console.error('Failed to start dialog', e)
    }
  }

  const handleSetUserDialogId = (id: string) => {
    dispatch(setUserDialogId(id))
    if (id) setMobileShowChat(true)
  }
  
  const [fetchUsers, { data: usersData, isFetching: isUsersLoading }] = useLazyGetUsersQuery()

  // Filtered users for new dialog modal — exclude the logged-in user (handle both id and _id field names)
  const filteredUsers = (usersData?.items || []).filter((u: userType) => {
    const userId = String(u.id || '')
    return userId !== String(authorizedUserId)
  })

  return (
    <Card className={classes.card}>
      <Dialogs setNewDialogSearch={setNewDialogSearch} 
      setUserDialogId={handleSetUserDialogId} 
      authorizedUserId={authorizedUserId} 
      userDialogId={userDialogId} 
      fetchUsers={fetchUsers} 
      dialogsData={dialogsData} 
      dialogsLoading={dialogsLoading} 
      filteredUsers={filteredUsers} 
      isUsersLoading={isUsersLoading} 
      setShowNewDialogModal={setShowNewDialogModal}
      setDeleteDialogId={setDeleteDialogId}
      mobileShowChat={mobileShowChat}
      setMobileShowChat={setMobileShowChat}
      />
      <MessagesPanel authorizedUserId={authorizedUserId} 
      userDialogId={userDialogId} 
      messages={messages} 
      selectedDialog={selectedDialog} 
      setLightboxImage={setLightboxImage}
      messagesLoading={messagesLoading}
      mobileShowChat={mobileShowChat}
      setMobileShowChat={setMobileShowChat}
      />
      <ModalsMessagesPage deleteDialogId={deleteDialogId}
      deleteDialog={deleteDialog}
      setLightboxImage={setLightboxImage}
      lightboxImage={lightboxImage}
      setDeleteDialogId={setDeleteDialogId}
      setShowNewDialogModal={setShowNewDialogModal}
      showNewDialogModal={showNewDialogModal}
      newDialogSearch={newDialogSearch} 
      setNewDialogSearch={setNewDialogSearch} 
      setUserDialogId={handleSetUserDialogId} 
      userDialogId={userDialogId} 
      fetchUsers={fetchUsers} 
      dialogsData={dialogsData} 
      messagesLoading={messagesLoading} 
      filteredUsers={filteredUsers} 
      isUsersLoading={isUsersLoading}
      handleStartDialog={handleStartDialog} />
    </Card>
  )
}

export default MessagesPage 

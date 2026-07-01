const toStringId = (value) => {
  if (value == null) return ''
  return String(value)
}

const toIsoString = (value) => {
  if (!value) return new Date().toISOString()
  const date = value instanceof Date ? value : new Date(value)
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString()
}

const getUserPhotos = (user) => {
  const photos = user?.photos ?? user?.profile?.photos ?? {}

  return {
    small: photos.small || '',
    large: photos.large || ''
  }
}

export const serializeUser = (user) => {
  if (!user) return null

  const plainUser = typeof user.toObject === 'function' ? user.toObject() : user

  return {
    id: toStringId(plainUser.id || plainUser._id),
    username: plainUser.username || '',
    email: plainUser.email || '',
    photos: getUserPhotos(plainUser)
  }
}

export const serializeMessage = (message) => {
  if (!message) return null

  const plainMessage = typeof message.toObject === 'function' ? message.toObject() : message

  return {
    id: toStringId(plainMessage.id || plainMessage._id),
    text: plainMessage.text ?? plainMessage.content ?? '',
    image: plainMessage.image || null,
    conversationId: toStringId(plainMessage.conversationId || plainMessage.conversation),
    createdAt: toIsoString(plainMessage.createdAt || plainMessage.timestamp),
    sender: serializeUser(plainMessage.sender),
    receiver: serializeUser(plainMessage.receiver)
  }
}

export const serializeDialog = (dialog) => {
  if (!dialog) return null

  const plainDialog = typeof dialog.toObject === 'function' ? dialog.toObject() : dialog

  return {
    id: toStringId(plainDialog.id || plainDialog._id),
    participants: Array.isArray(plainDialog.participants)
      ? plainDialog.participants.map(serializeUser).filter(Boolean)
      : [],
    messages: Array.isArray(plainDialog.messages)
      ? plainDialog.messages.map(serializeMessage).filter(Boolean)
      : [],
    updatedAt: toIsoString(plainDialog.updatedAt || plainDialog.lastDialogActivityDate || plainDialog.createdAt),
    hasNewMessages: Boolean(plainDialog.hasNewMessages),
    newMessagesCount: plainDialog.newMessagesCount ?? 0,
    isActive: Boolean(plainDialog.isActive),
    userName: plainDialog.userName || '',
    photos: plainDialog.photos || { small: '', large: '' },
    lastMessage: plainDialog.lastMessage || ''
  }
}

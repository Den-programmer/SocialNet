import { Server } from 'socket.io'
import dotenv from 'dotenv'

dotenv.config()

const io = new Server({
  cors: {
    origin: process.env.CLIENT_PORT || 'http://localhost:3000'
  }
})

const SOCKET_PORT = Number(process.env.SOCKET_PORT || 7000)

type OnlineUser = {
  userId: string
  socketId: string
}

type MessagePayload = {
  receiverId?: string
  [key: string]: unknown
}

type TypingPayload = {
  receiverId?: string
  [key: string]: unknown
}

type DialogPayload = {
  receiverId?: string
  dialog?: {
    id?: string
    [key: string]: unknown
  }
  dialogId?: string
  [key: string]: unknown
}

let onlineUsers: OnlineUser[] = []
const eventTimestamps = new Map<string, number[]>()
const MAX_EVENTS_PER_MINUTE = 30

const allowEvent = (socketId: string, event: string) => {
  const key = `${socketId}:${event}`
  const now = Date.now()
  const timestamps = (eventTimestamps.get(key) || []).filter(timestamp => now - timestamp < 60000)
  if (timestamps.length >= MAX_EVENTS_PER_MINUTE) return false
  timestamps.push(now)
  eventTimestamps.set(key, timestamps)
  return true
}

const emitToUser = (userId: string | undefined, event: string, payload: unknown) => {
  if (!userId) return

  const user = onlineUsers.find((onlineUser) => onlineUser.userId === userId)
  if (!user) return

  io.to(user.socketId).emit(event, payload)
}

io.on('connection', (socket) => {
  socket.on('addNewUser', (userId: string) => {
    if (!onlineUsers.some((user) => user.userId === userId)) {
      onlineUsers.push({ userId, socketId: socket.id })
    } else {
      const index = onlineUsers.findIndex((user) => user.userId === userId)
      onlineUsers[index].socketId = socket.id
    }

    io.emit('getOnlineUsers', onlineUsers)
  })

  socket.on('sendMessage', (message: MessagePayload) => {
    if (!allowEvent(socket.id, 'sendMessage')) return
    emitToUser(message.receiverId, 'getMessage', message)
  })

  socket.on('messageDeleted', (payload: MessagePayload) => {
    if (!allowEvent(socket.id, 'messageDeleted')) return
    emitToUser(payload.receiverId, 'messageDeleted', payload)
  })

  socket.on('dialogStarted', (payload: DialogPayload) => {
    if (!allowEvent(socket.id, 'dialogStarted')) return
    emitToUser(payload.receiverId, 'dialogStarted', payload.dialog)
  })

  socket.on('dialogDeleted', (payload: DialogPayload) => {
    if (!allowEvent(socket.id, 'dialogDeleted')) return
    emitToUser(payload.receiverId, 'dialogDeleted', {
      dialogId: payload.dialogId || payload.dialog?.id
    })
  })

  socket.on('typing', (data: TypingPayload) => {
    if (!allowEvent(socket.id, 'typing')) return
    emitToUser(data.receiverId, 'userTyping', data)
  })

  socket.on('disconnect', () => {
    for (const key of eventTimestamps.keys()) {
      if (key.startsWith(`${socket.id}:`)) eventTimestamps.delete(key)
    }
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id)
    io.emit('getOnlineUsers', onlineUsers)
  })
})

io.listen(SOCKET_PORT)

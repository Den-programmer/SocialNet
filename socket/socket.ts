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
    emitToUser(message.receiverId, 'getMessage', message)
  })

  socket.on('messageDeleted', (payload: MessagePayload) => {
    emitToUser(payload.receiverId, 'messageDeleted', payload)
  })

  socket.on('dialogStarted', (payload: DialogPayload) => {
    emitToUser(payload.receiverId, 'dialogStarted', payload.dialog)
  })

  socket.on('dialogDeleted', (payload: DialogPayload) => {
    emitToUser(payload.receiverId, 'dialogDeleted', {
      dialogId: payload.dialogId || payload.dialog?.id
    })
  })

  socket.on('typing', (data: TypingPayload) => {
    emitToUser(data.receiverId, 'userTyping', data)
  })

  socket.on('disconnect', () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id)
    io.emit('getOnlineUsers', onlineUsers)
  })
})

io.listen(SOCKET_PORT)

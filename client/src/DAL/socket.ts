import { io, Socket } from 'socket.io-client'

const SOCKET_URL = import.meta.env.VITE_WEB_SOCKET_URL || 'http://localhost:7000'

type SocketReadyCallback = (socket: Socket) => void

class SocketService {
  public socket: Socket | null = null
  private readyCallbacks = new Set<SocketReadyCallback>()

  connect(userId: string) {
    if (this.socket) return this.socket

    this.socket = io(SOCKET_URL)
    this.notifyReady()

    this.socket.on('connect', () => {
      console.log('Socket.IO connected')
      if (userId) {
        this.socket?.emit('addNewUser', userId)
      }
    })

    return this.socket
  }

  onSocketAvailable(callback: SocketReadyCallback) {
    if (this.socket) {
      callback(this.socket)
      return () => {}
    }

    this.readyCallbacks.add(callback)
    return () => {
      this.readyCallbacks.delete(callback)
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  }

  private notifyReady() {
    if (!this.socket) return

    this.readyCallbacks.forEach((callback) => callback(this.socket as Socket))
    this.readyCallbacks.clear()
  }
}

export const socketService = new SocketService()

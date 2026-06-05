import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:7000';

class SocketService {
    public socket: Socket | null = null;

    connect(userId: string) {
        if (this.socket) return this.socket;

        this.socket = io(SOCKET_URL);
        
        this.socket.on('connect', () => {
            console.log('Socket.IO connected');
            if (userId) {
                this.socket?.emit('addNewUser', userId);
            }
        });

        return this.socket;
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }
}

export const socketService = new SocketService();

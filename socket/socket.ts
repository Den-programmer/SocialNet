import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const io = new Server({ cors: { origin: process.env.CLIENT_PORT} });

let onlineUsers: Array<{ userId: string; socketId: string }> = [];

io.on("connection", (socket) => {

    socket.on("addNewUser", (userId: string) => {
        if (!onlineUsers.some((user) => user.userId === userId)) {
            onlineUsers.push({ userId, socketId: socket.id });
        } else {
            // Update socketId if user already exists
            const index = onlineUsers.findIndex(u => u.userId === userId);
            onlineUsers[index].socketId = socket.id;
        }
        io.emit("getOnlineUsers", onlineUsers);
    });

    socket.on("sendMessage", (message) => {
        const user = onlineUsers.find((user) => user.userId === message.receiverId);
        if (user) {
            io.to(user.socketId).emit("getMessage", message);
        }
    });

    socket.on("typing", (data) => {
        const user = onlineUsers.find((user) => user.userId === data.receiverId);
        if (user) {
            io.to(user.socketId).emit("userTyping", data);
        }
    });

    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
        io.emit("getOnlineUsers", onlineUsers);
    });
})

io.listen(7000);
import { Server } from "socket.io";

const io = new Server({ cors: { origin: process.env.CLIENT_PORT } });

let onlineUsers: Array<{ userId: string; socketId: string }> = [];

io.on("connection", (socket) => {
    console.log("A new connection!", socket.id);

    socket.on("addNewUser", (userId: string) => {
        if (!onlineUsers.some((user) => user.userId === userId)) {
            onlineUsers.push({ userId, socketId: socket.id });
            console.log("Online users:", onlineUsers);
        }
        io.emit("getOnlineUsers", onlineUsers);
    });
    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
        console.log("A user disconnected!", socket.id);
        io.emit("getOnlineUsers", onlineUsers);
    });
})

io.listen(7000);
import express from 'express';
import dotenv from "dotenv/config";
import http from 'http';
import cors from 'cors';
import connectDB from './lib/db.js';
import userRouter from './routes/userRoutes.js';
import { Server } from 'socket.io';
import messageRouter from './routes/messageRoutes.js';  


// Create an Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
export const io = new Server(server, {
    cors: {origin: "*"}
});

//Store online users
export const userSocketMap = {}; // { userId: socketId }

//Socket.IO connection Handler
io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log(`User connected: ${userId}`);
 
    if (userId) {
        userSocketMap[userId] = socket.id; // Store the user's socket ID
    }   
    //Emit online users to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    socket.on("disconnect", () => {
        console.log(`User disconnected: ${userId}`);
        delete userSocketMap[userId]; // Remove the user's socket ID
        io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Update online users
    });
})


 
// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(cors());

// Routes Setup
app.use("/api/status", (req, res) => res.send("Server is live"));
app.use("/api/auth",userRouter );
app.use("/api/messages", messageRouter);

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

export default server;
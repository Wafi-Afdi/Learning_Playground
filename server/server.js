const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')
const {notFound, errorHandler} = require('./middleware/errorMiddleware');

require('dotenv').config()
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/user/', userRoutes)
app.use('/api/chat/', chatRoutes)
app.use('/api/message/', messageRoutes)

app.use(notFound);
app.use(errorHandler)


connectDB();
const server = app.listen(5000, () => {
    console.log('Start server at port 5000')
})

const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",

    }
})

io.on("connection", (socket)=> {
    console.log("Connected to socket " + socket.id);
    socket.on("join room", (data)=> {
        socket.join(data);
        console.log("User joined : " + data);
    })
    socket.on("new msg", (msgReceived)=> {
        console.log("Message received by server")
        socket.in(msgReceived.chat).emit("msg received", msgReceived);

    })
    socket.on("disconnect", () => {
        console.log("socket disconnected : " + socket.id)
    });
})
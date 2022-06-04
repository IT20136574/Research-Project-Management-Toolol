const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();
app.use(express.json());




const {notFound, errorHandler} = require('./middleware/errorMiddleware');

const PORT = process.env.PORT || 8070; 

app.use(bodyParser.json({limit: '50mb'}) );
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit:50000
}));
app.use(cors());

const URL = process.env.MONGODB_URL;
process.env.SUPPRESS_NO_CONFIG_WARNING = 'y';

mongoose.connect(URL, {

    //useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false
});

const connection = mongoose.connection;
connection.once("open", () => {
console.log("Mongodb connection success!!!");

})

// @import routes
const studentRouter = require("./routes/DH_routes/student");
const studentGroupRouter = require("./routes/DH_routes/studentGroup");
const sSupervisorRouter = require("./routes/DH_routes/supervisors");
const submissionsRouter = require("./routes/DH_routes/submissions");
const adminRouter = require("./routes/NT_routes/admin");
const viewRoleRouter = require("./routes/NT_routes/viewRoles");
const asignPanalMemberRouter = require("./routes/NT_routes/asignPanalMember");
const documentRouter = require("./routes/NT_routes/document")
const submitionRouter = require("./routes/NT_routes/submition")
const markingRouter = require("./routes/NT_routes/marking")
const asignPanalMemberRouter = require("./routes/NT_routes/asignPanalMember")
const staffRouter = require("./routes/RS_routes/staff");
const userRoutes = require("./routes/RS_routes/userRoutes");
const chatRoutes = require("./routes/RS_routes/chatRoutes");
const messageRoutes = require("./routes/RS_routes/messageRoutes");





// rotues
app.use("/student",studentRouter);
app.use("/admin",adminRouter);
app.use("/viewRole",viewRoleRouter);
app.use("/panalmember",asignPanalMemberRouter);
app.use("/studentGroup",studentGroupRouter);
app.use("/sSupervisorGroup",sSupervisorRouter);
app.use("/submitDocs",submissionsRouter);
app.use("/document", documentRouter)
app.use("/submition", submitionRouter)
app.use("/marking", markingRouter)
app.use("/staff", staffRouter);
app.use('/api/user',userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);


// app.use(notFound);
// app.use(errorHandler);

// app.listen(PORT, () => {
//     console.log(`Server is up and running on port number: ${PORT}`)
// })

const server = app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`)
});



const io = require('socket.io')(server, { 
  pingTimeout: 60000,
  cors:{
    origin:"http://localhost:1234"
  },
   
});


io.on("connection", (socket) => {
console.log('connected to socket.io');
   
socket.on ('setup', (userData)=> {
  socket.join(userData._id);
  socket.emit("connected");
});

socket.on('join chat', (room) => {
  socket.join(room);
  console.log("User Joined Room: " + room);
});

socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

socket.on("new message", (newMessageRecieved) => {
  var chat = newMessageRecieved.chat;

  if (!chat.users) return console.log("chat.users not defined");

  chat.users.forEach((user) => {
    if (user._id == newMessageRecieved.sender._id) return;

    socket.in(user._id).emit("message recieved", newMessageRecieved);
  });

  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});




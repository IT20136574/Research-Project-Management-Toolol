const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();
app.use(express.json());

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
const adminRouter = require("./routes/NT_routes/admin");
const viewRoleRouter = require("./routes/NT_routes/viewRoles");
const asignPanalMemberRouter = require("./routes/NT_routes/asignPanalMember")



// rotues
app.use("/student",studentRouter);
app.use("/admin",adminRouter);
app.use("/viewRole",viewRoleRouter);
app.use("/panalmember",asignPanalMemberRouter);



app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`)
})

const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
 

const chatModelSchema = new mongoose.Schema({

    chatName:{
        type : String,
        trim:true
    },

    isGroupChat:{
        
        type : Boolean,
        default:false
    },

    users:[{
        type : mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

    latestMessage:{
        type : mongoose.Schema.Types.ObjectId,
        ref: "Message"
    },

    groupAdmin:{
        type : mongoose.Schema.Types.ObjectId,
        ref: "User"
    },


 
},
    {
        timestamps:true,
    }
);

const Chat = mongoose.model("Chat",chatModelSchema);
module.exports = Chat;

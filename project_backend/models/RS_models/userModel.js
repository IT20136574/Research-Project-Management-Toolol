const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
 

const userModelSchema = new mongoose.Schema({

    name:{
        type : String,
        required: true
    },

    email:{
        type : String,
        required: true,
        unique: true
    },

    password:{
        type : String,
        required: true
    },
    pic:{
        type : String,
        default : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    },

    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
      },

},
    {
        timestamps:true,
    }
);


userModelSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userModelSchema.pre('save',async function (next) {
    if (!this.isModified) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

});

const User = mongoose.model("User",userModelSchema);
module.exports = User;
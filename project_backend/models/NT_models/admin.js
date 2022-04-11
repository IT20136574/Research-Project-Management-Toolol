const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({

    fname: {
        type : String,
        require:true,
        trim:true
    },

    mname: {
        type : String,
        require:true,
        trim:true
    },

    lname: {
        type : String,
        require:true,
        trim:true
    },

    add1: {
        type: String,
        required: true,
        trim: true
    },

    add2: {
        type: String,
        trim: true
    },

    city: {
        type: String,
        trim: true
    },

    pno: {
        type: String,
        require : true,
        trim:true
    },

    nic: {
        type : String,
        required : true,
        trim:true
    },

    sliitid:{
        type : String,
        required : true,
        trim : true
    },

    email:{
        type : String,
        required : true,
        trim : true
    },

    password: {
        type : String,
        required : true,
        trim : true
    },

    imageUrl: {
        type: String,
      },

    imageUrl2: {
        type: String,
    }
});

const admin = mongoose.model("admin",adminSchema);
module.exports = admin;
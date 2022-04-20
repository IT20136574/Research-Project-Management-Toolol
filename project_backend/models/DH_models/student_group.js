const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const studentGroupSchema = new mongoose.Schema({

  group_name: {
    type: String,
    required: true,
    trim: true,
  },

  groupMembers: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "students"
    },

    student_id: {
      type: String,
     //require: true
    },
    name: {
      type: String,
      //required: true
    },
    email: {
      type: String,
      //required: true
    },
    phone: {
      type: String,
      required: false
    }
  }],

 
    // member1_student_id: {
    //   type: String,
    //   require: true
    // },

    // member1_name: {
    //   type: String,
    //   required: true
    // },

    // member1_email: {
    //   type: String,
    //   required: false
    // },

    // member1_phone: {
    //   type: String,
    //   required: false
    // },




    // member2_student_id: {
    //   type: String,
    //   require: true
    // },

    // member2_name: {
    //   type: String,
    //   required: true
    // },

    // member2_email: {
    //   type: String,
    //   required: false
    // },

    // member2_phone: {
    //   type: String,
    //   required: false
    // },




    // member3_student_id: {
    //   type: String,
    //   require: true
    // },

    // member3_name: {
    //   type: String,
    //   required: true
    // },

    // member3_email: {
    //   type: String,
    //   required: false
    // },

    // member3_phone: {
    //   type: String,
    //   required: false
    // },





    // member4_student_id: {
    //   type: String,
    //   require: true
    // },

    // member4_name: {
    //   type: String,
    //   required: true
    // },

    // member4_email: {
    //   type: String,
    //   required: false
    // },

    // member4_phone: {
    //   type: String,
    //   required: false
    // },


});



const studentGroup = mongoose.model("studentGroups", studentGroupSchema);

module.exports = studentGroup;
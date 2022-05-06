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

  researchTopic_Info: [{

    research_Topic: {
      type: String,
     //require: true
    },
    field: {
      type: String,
      //required: true
    },
    tags: {
      type: String,
      //required: true
    }
  }],

  researchTopic_Status:{
    type: String,
    trim: true
  },

  groupMembers: [{
    _id: {
      type: String,
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



});



const studentGroup = mongoose.model("studentGroups", studentGroupSchema);

module.exports = studentGroup;
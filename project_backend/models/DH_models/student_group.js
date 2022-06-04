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
  panalmembers: [{
    _id: {
      type: String,
      required: true,
      ref: "staff"
    },
 
    fname: {
      type: String,
    //  require: true
    },
    lname: {
      type: String,
      // required: true
    },
    staffid: {
      type: String,
      //required: true
    }
  }],
  panalmemberstatus: {
    type:String,
    //required: true
  },

  topicFeedback: {
    type:String,
    //required: true
  },
  
  precentation_Marks: {
    type:String,
    default: "Pending"
    //required: true
  },

  AcceptedIdOfSupervisor: {
    type:String,
    //required: true
  },

  Document_Marks: {
    type:String,
    default: "Pending"
    //required: true
  },
 
});
 
 
 
const studentGroup = mongoose.model("studentGroups", studentGroupSchema);
 
module.exports = studentGroup;


const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
//const {roles} = require('../../middleware/constants')


const studentSchema = new mongoose.Schema({
  // role: {
  //   type: String,
  //  required: true,
  //   enum: [roles.admin, roles.student, roles.supervisor, roles.co_supervisor, roles.pannel_member],
  //   default: STUDENT
  // },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  nic: {
    type: String,
    required: true,
    trim: true,
  },
  student_id: {
    type: String,
    required: true,
    trim: true,
  },
  faculty: {
    type: String,
    required: true,
    trim: true,
  },
  batch: {
    type: String,
    required: true,
    trim: true,
  },
  specialization: {
    type: String,
    required: true,
    trim: true,
  },

  phone: {
    type: String,
    required: true,
    maxlength: 13,
    trim: true,
    validate(value) {
      if (!validator.isMobilePhone(value)) {
        throw new Error("Please enter valid mobile number");
      }
    },
  },
  DOB: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Please enter valid email address");
      }
    },
  },
  pwd: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrl: {
    type: String,
  },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],

});

// @Action - encrypt the password
studentSchema.pre('save', async function(next){
  if(!this.isModified("pwd")){
      next();
  }
  const salt = await bcrypt.genSalt(8);
  this.pwd = await bcrypt.hash(this.pwd, salt);
});

// @Action - Get auth token
studentSchema.methods.generateAuthToken = async function () {
const student = this;
const token = jwt.sign({ _id: student._id }, "jwtSecret");
student.tokens = student.tokens.concat({ token });
await student.save();
return token;
};

// @Action - Find student by credentials
studentSchema.statics.findByCredentials = async (student_id, pwd) => {
const student1 = await student.findOne({ student_id });
if (!student1) {
  throw new Error("Please enter authorized student ID");
}
const isMatch = await bcrypt.compare(pwd, student1.pwd);
if (!isMatch) {
  throw new Error("Password is not matched");
}
return student1;
};

const student = mongoose.model("students", studentSchema);

module.exports = student;

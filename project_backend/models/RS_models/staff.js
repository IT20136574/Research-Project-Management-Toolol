const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
 
 
const staffSchema = new mongoose.Schema({
 
 
    fname:{
        type : String,
        required:true
    },

    lname:{
      type : String,
      required:true
  },

 
 
    email:{
        type :String,
        required:true,
        lowercase: true
    },
 
    username:{
        type :String,
        required:true
    },
 
    password:{
        type :String,
        required:true
    },
 
    nic:{
        type :String,
        required:true,
    },
 
    staffid:{
        type :String,
        required:true,
    },
   
    field:{
        type :String,
        required:true
    },
 
    phone:{
        type :String,
        required:true
    },
   
    description:{
        type :String,
        required:true
    },
 
    profileImage:{
        type:String,
        required :true,
    },
    role: {
        type:String,
       
    },
    tokens: [{
        token: {
          type: String,
          required: true,
        }
      }],


      researchTopic_Info: [{
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "student_groups"
        },
        group_name:{
          type :String,
          require:true
        },
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

      
      groups: [{
        _id: {
          type: String,
          required: true,
          ref: "staff"
        },
        research_Topic: {
          type: String,
         //require: true
        },
        group_name:{
          type :String,
          require:true
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
      }],


    file_Info: [{

      _id: {
          type: mongoose.Schema.Types.ObjectId,
          //required: true,
          ref: "student_groups"
      },
      group_name: {
        type: String,
        //required: true
      },

      submitionTitle: {
        type : String,
        trim:true
      },
      
      fileUrl: {
        type: String,
        //required: true
      },

      }],

}
);
 
//password encryption
staffSchema.pre('save', async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(8);
    this.password = await bcrypt.hash(this.password, salt);
});
 
staffSchema.methods.generateAuthToken = async function () {
    const staff = this;
    const token = jwt.sign({ _id: staff._id }, "jwtSecret");
    staff.tokens = staff.tokens.concat({ token });
    await staff.save();
    return token;
  };
 
  staffSchema.statics.findByCredentials = async (username, password) => {
    const staff1 = await staff.findOne({ username});
    if (!staff1) {
      throw new Error("Please enter acorrect user name");
    }
    const isMatch = await bcrypt.compare(password, staff1.password);
    if (!isMatch) {
      throw new Error("Password is not matched");
    }
    return staff1;
  };
 
 
const staff = mongoose.model("staff",staffSchema);
module.exports = staff;
 
 
 


const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const staffSchema = new mongoose.Schema({
 
 
    fname:{
        type : String,
        require:true
    },
 
    lname:{
        type :String,
        require:true
    },
 
    email:{
        type :String,
        require:true,
        lowercase: true
    },
 
    username:{
        type :String,
        require:true
    },
 
    password:{
        type :String,
        require:true
    },
 
    nic:{
        type :String,
        require:true,
    },
    
    field:{
        type :String,
        require:true
    },

    phone:{
        type :String,
        require:true
    },
    
    description:{
        type :String,
        require:true
    },
 
    profileImage:{
        type:String,
        require :true,
    },
    role: {
        type:String,
        
    },
    tokens: [{
        token: {
          type: String,
          required: true,
        }
      }]  
 
});
 
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

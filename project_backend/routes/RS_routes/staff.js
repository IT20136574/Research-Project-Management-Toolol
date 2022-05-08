const express = require("express");
const router = require("express").Router();
const staff = require("../../models/RS_models/staff");
let student_group = require("../../models/DH_models/student_group");
const validator= require("validator");
const jwt = require('jsonwebtoken');
// const auth = require('../../middleware/staff_middleware/auth')
const bcrypt = require('bcryptjs')
const auth = require("../../middleware/staff/staffauth");

 

//create
router.post('/add', async (req, res) => {
    try {
      const {fname, lname, email, username, password, nic, staffid,  field, phone, description, profileImage, role} = req.body
 
      let staff1 = await staff.findOne({email})
      let staff2 = await staff.findOne({username})
      if (staff1 || staff2) {
        throw new Error('staff Account Already Exists')
      }
      staff1 = {
        fname :fname,
        lname : lname,
        email: email,
        username : username,
        password: password,
        nic: nic,
        staffid: staffid,
        field:field,
        phone:phone,
        description: description,
        profileImage : profileImage,
        role: role
      }
 
      const newstaff = new staff(staff1)
      await newstaff.save()
      const token = await newstaff.generateAuthToken()
      res.status(200).send({staff: newstaff, token: token, status: 'staff Account Creation Success'})
    } catch (error) {
      res.status(500).send({error: error.message})
      console.log(error)
    }
  })







  //login Staff Member
 router.post('/login', async (req, res) => {
  try {
    
    const {username, password} = req.body

    const staff1 = await staff.findByCredentials(username, password)
    if(staff1){
      const token = await staff1.generateAuthToken();
      res.status(200).send({token: token, staff1: staff1, message: "LOgin Success"})
    }else {
      throw new Error("Invalid Credencials")
    }


  } catch (error) {
    res.status(500).send({ error: error.message });
    console.log(error);
  }
})



//-------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------


//fetch supervisur detailes topics 


router.get("/desplaysupertopics",auth, async (req, res) => {

  try {
    const sup = await staff.findById(req.staff1.id);

    res.status(200).send({ status: "Supervisor data retrieved", researchTopic_Info: sup.researchTopic_Info });
  } catch (error) {
     res.status(500).send({ status: "Error with retrieve", error: error.message });
   }
});





//get topics 

// router.get("/viewtopic",(req,res)=>{
//   student_group.find().exec((err,student_group)=>{
//       if(err){
//           return res.status(400).json({
//               error:err
//           });
//       }
//       return res.status(200).json({
//           success:true,
//           showstudent_groups :student_group,
//       });
//   });
// });
//----------------------------------------------------------------


// //get topics specific staff id

// router.route("/viewtopic/:id").get((req,res)=>{
//   let id= req.params.id;
//   staff.findById(id,(err,staff)=>{
//     if(err){
//         return res.status(400).json({success:false,err});
//     }
//     return res.status(200).json({
//       success:true,
//       staff
//     });
//   });
// });








module.exports = router;
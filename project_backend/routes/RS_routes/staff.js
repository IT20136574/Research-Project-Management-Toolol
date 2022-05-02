const express = require("express");
const router = require("express").Router();
let staff= require("../../models/RS_models/staff");
const validator= require("validator");
const jwt = require('jsonwebtoken');
// const auth = require('../../middleware/staff_middleware/auth')
const bcrypt = require('bcryptjs')
 

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

//-------------3 separate Logins---------//

  //login supervisor
router.post('/login1', async (req, res) => {
  try {
    
    const {username, password} = req.body

    const id1 = await staff.find({ username: username},{"_id":1});
    const mem1 = await staff.findById(id1);
    const role1 = mem1.role;
    if(role1 == "supervisor" ){
      const staff1 = await staff.findByCredentials(username, password)
      const token = await staff1.generateAuthToken()
      res.status(200).send({token: token, staff1: staff1})

    }else {
      throw new Error("U must be a supervisor");
    }


  } catch (error) {
    res.status(500).send({ error: error.message });
    console.log(error);
  }
})



 //login co-supervisor
 router.post('/login2', async (req, res) => {
  try {
    
    const {username, password} = req.body

    const id1 = await staff.find({ username: username},{"_id":1});
    const mem1 = await staff.findById(id1);
    const role1 = mem1.role;
    if(role1 == "co-supervisor" ){
      const staff1 = await staff.findByCredentials(username, password)
      const token = await staff1.generateAuthToken()
      res.status(200).send({token: token, staff1: staff1})

    }else {
      throw new Error("U must be a co-supervisor");
    }


  } catch (error) {
    res.status(500).send({ error: error.message });
    console.log(error);
  }
})


//login panal_member
router.post('/login3', async (req, res) => {
  try {
    
    const {username, password} = req.body

    const id1 = await staff.find({ username: username},{"_id":1});
    const mem1 = await staff.findById(id1);
    const role1 = mem1.role;
    if(role1 == "panal_member" ){
      const staff1 = await staff.findByCredentials(username, password)
      const token = await staff1.generateAuthToken()
      res.status(200).send({token: token, staff1: staff1})

    }else {
      throw new Error("U must be a panal member");
    }


  } catch (error) {
    res.status(500).send({ error: error.message });
    console.log(error);
  }
})
 
 
module.exports = router;
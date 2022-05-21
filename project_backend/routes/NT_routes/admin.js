const express = require("express");
const router = require("express").Router();
const validator = require("validator");
const auth = require('../../middleware/Admin_middleware/auth')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let admin= require("../../models/NT_models/admin");

//Admin Register to Web application
router.post('/add', async (req, res) => {
    try {
      const {fname,lname, username, pno, nic, sliitid, email, password, imageUrl} = req.body

      //Check application has already created account using given email or SLIIT staff id  
      let admin1 = await admin.findOne({email})
      let admin2 = await admin.findOne({sliitid})
      if (admin1 || admin2) {
        throw new Error('Admin Account Already Exists')
      }
      let admin3 = await admin.findOne({username})
      if(admin3){
        throw new Error('Username Already Exists')
      }
        admin1 = {
        fname : fname,
        lname : lname,
        username :username,
        pno : pno,
        nic : nic,
        sliitid : sliitid,
        email : email,
        password : password,
        imageUrl : imageUrl
      }
 
      //create ne account and genarate token
      const newadmin = new admin(admin1)
      await newadmin.save()
      const token = await newadmin.generateAuthToken()
      res.status(200).send({admin: newadmin, token: token, status: 'Admin Account Creation Success'})
    } catch (error) {
      res.status(500).send({error: error.message})
      console.log(error)
    }
  });

//admin login function    
router.post('/login', async (req, res) => {
    try {
      const {username,password} = req.body
      const admin1 = await admin.findByCredentials(username, password)

      if(admin1){
        const token = await admin1.generateAuthToken()
        res.status(200).send({token: token, admin1: admin1, message : "login success"})
      }else{
        throw new Error('Invalid Credentials')
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
      console.log(error);
    }
  });

//admin profile
router.get("/profile", auth, async (req, res) => {
  try {
    res.status(201)
    res.send({ success: "User fetched", admin1: req.admin1});
  } catch (error) {
    res.status(500)
    res.send({ status: "Error with /profile", error: error.message });
  }
});
 

// delete admin
router.delete("/delete", auth, async (req, res) => {
  try {
    const admin1 = await admin.findById(req.admin1.id);
    if (!admin1) {
      throw new Error("There is no Admin to delete");
    }
    const deleteProfile = await admin.findByIdAndDelete(req.admin1.id);
    res.status(200).send({ status: "user deleted", admin1 : deleteProfile });
  } catch (error) {
    res
      .status(500)
      .send({ status: "error with id", error: error.message });
  }
});

//admin update
router.put('/update', auth, async (req, res) => {
 
  const {fname, lname, username, pno, nic, sliitid, email, imageUrl} = req.body
  try {
    const updateValus={
      fname : fname,
      lname : lname,
      username :username,
      pno : pno,
      nic : nic,
      sliitid : sliitid,
      email : email,
      imageUrl : imageUrl
    };

    let admin1 = await admin.findOne({username})
 
    if (!admin1) {
      throw new Error('There is no Admin account')
    }

    const adminUpdate = await admin.findByIdAndUpdate(req.admin1.id,updateValus)
 
    res.status(200).send({status: 'Admin Profile Updated', admin1: adminUpdate})
  } catch (error) {
    res.status(500).send({error: error.message})
    console.log(error)
  }
})

module.exports = router;
const express = require("express");
const router = require("express").Router();
const validator = require("validator");
const auth = require('../../middleware/Admin_middleware/auth')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let admin= require("../../models/NT_models/admin");

//create
router.post('/add', async (req, res) => {
    try {
      const {fname, mname, lname, pno, nic, sliitid, email, password, imageUrl} = req.body
 
      let admin1 = await admin.findOne({email})
      let admin2 = await admin.findOne({sliitid})
      if (admin1 || admin2) {
        throw new Error('Admin Account Already Exists')
      }
      admin1 = {
        fname : fname,
        mname : mname,
        lname : lname,
        pno : pno,
        nic : nic,
        sliitid : sliitid,
        email : email,
        password : password,
        imageUrl : imageUrl
      }
 
      const newadmin = new admin(admin1)
      await newadmin.save()
      const token = await newadmin.generateAuthToken()
      res.status(200).send({admin: newadmin, token: token, status: 'Admin Account Creation Success'})
    } catch (error) {
      res.status(500).send({error: error.message})
      console.log(error)
    }
  });

  module.exports = router;
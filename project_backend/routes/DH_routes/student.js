const express = require("express");
const router = require("express").Router();
let student = require("../../models/DH_models/student");
let group = require("../../models/DH_models/student_group");
let staff = require("../../models/RS_models/satff");
let documents = require("../../models/NT_models/document");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

 

//sign up

router.post("/signup", async (req, res) => {
    try {
      const {
        name,
        nic,
        faculty,
        student_id,
        batch,
        specialization,
        phone,
        DOB,
        email,
        pwd,
        imageUrl
      } = req.body;

      if(!name || !nic || !faculty || !student_id || !batch || !specialization || !phone  || !DOB || !email || !pwd )
      return res.status(400).json({error: "required"})

      if(student_id.length != 10)
      return res.status(400).json({error: "Invalid Student ID. Student ID must be 10 charaactors"})

      if(nic.length < 9)
      return res.status(400).json({error: "Invalid NIC. Student ID must be grated than 9 charaactors"})

      if(phone.length != 10 )
      return res.status(400).json({error: "Invalid Phone number. Phone number must be 10 charaactors"})
  
    
    let student1 = await student.findOne({ email });
    if (student1) {
      throw new Error("User already exists");
    }

    let student2 = await student.findOne({ student_id });
    if (student2) {
      throw new Error("User already exists");
    }


      student1 = {
        name: name,
        nic: nic,
        faculty: faculty,
        student_id: student_id,
        batch: batch,
        specialization: specialization,
        phone: phone,
        DOB: DOB,
        email: email,
        pwd: pwd,
        imageUrl: imageUrl
      };
  
      const newstudent = new student(student1);
      await newstudent.save();
      const token = await newstudent.generateAuthToken();
      res
        .status(201)
        .send({ status: "student Created", student: newstudent, token: token });
        console.log(student1);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({error: error.message});
    }
  });
  





    //login

    router.post('/login', async (req, res) => {
      try {
        const {student_id, pwd} = req.body
        const Std = await student.findByCredentials(student_id, pwd)
        const token = await Std.generateAuthToken()
        res.status(200).send({token: token, Std: Std})
  
      } catch (error) {
        res.status(500).send({ error: error.message });
        console.log(error);
      }
    })


    //get login user details
    router.get("/getUser",auth, async (req,res)=>{
      try{
        res.status(200).send({status:"User fetched",User:req.Std});
      }catch(error){
        console.log(error);
        res.status(500).send({error: error.message})
      }
    })



    





module.exports = router;
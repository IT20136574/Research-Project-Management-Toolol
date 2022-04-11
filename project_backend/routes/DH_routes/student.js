const express = require("express");
const router = require("express").Router();
let student = require("../../models/DH_models/student");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");






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

    



module.exports = router;
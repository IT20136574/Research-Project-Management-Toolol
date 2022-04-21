const express = require("express");
const router = require("express").Router();
let student = require("../../models/DH_models/student");
let group = require("../../models/DH_models/student_group");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const studentGroup = require("../../models/DH_models/student_group");






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



    // group register

    router.post("/grpReg", async (req, res) => {
      try {
        const {
          
          group_name,

        } = req.body;
    
      
      //   let student1 = await group.findOne({ member1_student_id,member2_student_id,member3_student_id,member4_student_id });
      // if (student1) {
      //   throw new Error("Group member 1 already exists in a group...");
      // }
  
      // let student2 = await group.findOne({ member1_student_id,member2_student_id,member3_student_id,member4_student_id });
      // if (student2) {
      //   throw new Error("Group member 2 already exists in a group...");
      // }

      // let student3 = await group.findOne({ member1_student_id,member2_student_id,member3_student_id,member4_student_id });
      // if (student3) {
      //   throw new Error("Group member 3 already exists in a group...");
      // }

      // let student4 = await group.findOne({ member1_student_id,member2_student_id,member3_student_id,member4_student_id });
      // if (student4) {
      //   throw new Error("Group member 4 already exists in a group...");
      // }

      // const id1 = await student.find({ student_id: member1_student_id},{"_id":1});
      // const mem1 = await student.findById(id1);

      // const id2 = await student.find({ student_id: member2_student_id},{"_id":1});
      // const mem2 = await student.findById(id2);  

      // const id3 = await student.find({ student_id: member3_student_id},{"_id":1});
      // const mem3 = await student.findById(id3);

      // const id4 = await student.find({ student_id: member4_student_id},{"_id":1});
      // const mem4 = await student.findById(id4);

      // let groupMember1 = {
      //   student_id: mem1.student_id,
      //   name: mem1.name,
      //   email: mem1.email,
      //   phone: mem1.phone,
      // };

      // let groupMember2 = {
      //   student_id: mem2.student_id,
      //   name: mem2.name,
      //   email: mem2.email,
      //   phone: mem2.phone,
      // };

      // let groupMember3 = {
      //   student_id: mem3.student_id,
      //   name: mem3.name,
      //   email: mem3.email,
      //   phone: mem3.phone,
      // };

      // let groupMember4 = {
      //   student_id: mem4.student_id,
      //   name: mem4.name,
      //   email: mem4.email,
      //   phone: mem4.phone,
      // };


  
        group1 = {
      
            group_name: group_name,

          // member1_student_id: mem1.student_id,
          // member1_name: mem1.name,
          // member1_email: mem1.email,
          // member1_phone: mem1.phone,
      
          // member2_student_id: mem2.student_id,
          // member2_name: mem2.name,
          // member2_email: mem2.email,
          // member2_phone: mem2.phone,
      
          // member3_student_id: mem3.student_id,
          // member3_name: mem3.name,
          // member3_email: mem3.email,
          // member3_phone: mem3.phone,
    
          // member4_student_id: mem1.student_id,
          // member4_name: mem4.name,
          // member4_email: mem4.email,
          // member4_phone: mem4.phone,
      
        };

        let groupName = await group.findOne({ group_name });
        if (groupName) {
          throw new Error("Group name already taken");
        }
    
        const newgroup = new group(group1);
        await newgroup.save()
        res
          .status(201)
          .send({ status: "group Created", group: newgroup });
         // console.log(group1);
      } catch (error) {
        console.log(error.message);
        res.status(500).send({error: error.message});
      }
    });


    //register members

    router.post("/grpReg/:id", async (req, res) => {
      const groupId = req.params.id
      try {
        const group1 = await group.findById(groupId)

        if (!group1) {
          throw new Error('There is no group..!!!')
        }

        const {

          member1_student_id,

        } = req.body;


      //check whether the registering student's student id is valid or not.
      let student1 = await student.findOne({ student_id: member1_student_id},{"student_id":1});
      if (!student1) {
        throw new Error("Invalid Student ID...!!!");
      }


      //check wether the student is regstered to a group or not.
      let status = await student1.find({ status: "Registered"})
      if (status) {
        throw new Error("Student already registered in a group...!!!");
      }


      ////check wether the student group is full or not.
        const arrLength = group1.groupMembers.length;

        if(arrLength >= 4){
          throw new Error('This group already have 4 members..!!!')
        }else{

  
      //update registering member status
          const grp_status = "Registered";
          const gID = groupId;
          
          student1.status = grp_status;
          student1.grp_id = gID;

          await student1.save()

          
      
        //add registering member details to student group db 
          const id1 = await student.find({ student_id: member1_student_id},{"_id":1});
          const mem1 = await student.findById(id1);

          let groupMember1 = {
            id: mem1._id,
            student_id: mem1.student_id,
            name: mem1.name,
            email: mem1.email,
            phone: mem1.phone,
          };

          // let groupMember2 = {
          //   student_id: mem2.student_id,
          //   name: mem2.name,
          //   email: mem2.email,
          //   phone: mem2.phone,
          // };

          // let groupMember3 = {
          //   student_id: mem3.student_id,
          //   name: mem3.name,
          //   email: mem3.email,
          //   phone: mem3.phone,
          // };

          // let groupMember4 = {
          //  student_id: mem4.student_id,
          //  name: mem4.name,
          //  email: mem4.email,
          //  phone: mem4.phone,
          // };

        
            await group.findOneAndUpdate(
              { _id: groupId },
              { $push: { groupMembers: groupMember1}},
              { new: true, upsert: true }
            )
            res.status(200).send({ status: "Group Member Registered.."});

            }   

          } catch (error) {
            console.log(error.message);
            res.status(500).send({ error: error.message });
          }
        

    });





module.exports = router;
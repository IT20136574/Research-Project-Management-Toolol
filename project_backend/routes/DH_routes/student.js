const express = require("express");
const router = require("express").Router();
let student = require("../../models/DH_models/student");
let group = require("../../models/DH_models/student_group");
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

        group1 = {
      
            group_name: group_name,

        };

        let groupName = await group.findOne({ group_name });
        if (groupName) {
          throw new Error("Group name already taken");
        }
    
        const newgroup = new group(group1);
        await newgroup.save()
        // return res
        //   .status(201)
        //   .send({ status: "group Created", id: newgroup._id });
        //  // console.log(group1);
        return res.status(200).json({
          success:true,
          id: newgroup._id
      });
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
      let student1 = await student.findOne({ student_id: member1_student_id});
      if (!student1) {
        throw new Error("Invalid Student ID...!!!");
      }


      //check wether the student is regstered to a group or not.
      if (student1.status == "Registered") {
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


    //Register research topic
    router.post("/regResearchTopic", auth, async (req, res) => {
      
      try {
        const Student = await student.findById(req.Std._id)
        const gid = await Student.grp_id;
        const Group = await group.findById(gid);
        const arrLength = Group.researchTopic_Info.length;

        if (!Student) {
          throw new Error('There is no Student')
        }
    
        if (!Group) {
          throw new Error('You are not registered in a group...!')
        }

        if(arrLength >= 1){
          throw new Error('You can only register 1 topic..!!!')
        }


        const {
          research_Topic,
          field,
          tags
        } = req.body;

        let r_topicItems = {
          research_Topic: research_Topic,
          field: field,
          tags: tags,
        };
    
        await group.findOneAndUpdate(
          { _id: gid },
          { $push: { researchTopic_Info: r_topicItems } },
          { new: true, upsert: true }
        )
        res.status(200).send({ status: "Research topic registered...!", researchTopic_Info: r_topicItems });
      } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: error.message });
      }
    });





module.exports = router;
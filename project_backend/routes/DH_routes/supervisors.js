const express = require("express");
const router = require("express").Router();
let student = require("../../models/DH_models/student");
let group = require("../../models/DH_models/student_group");
let staff = require("../../models/RS_models/satff");
const auth = require("../../middleware/auth");



//fetch supervisors in same field
router.get("/displaySuper",auth, async (req, res) => {

    try {
      const std = await student.findById(req.Std._id);
      const group1 = await group.findById(std.grp_id);
  
      if (!group1) {
        throw new Error('There is no group..!!!')
      }
     
      const topic = group1.researchTopic_Info;
  
      if (topic.length == 0) {
        throw new Error('Research topic not registered yet..!!!')
      }
  
      const arr = topic[0];
  
      const field1 = arr.field
     
  
      const supervisors = await staff.find({ field: field1, role:"supervisor"});
      console.log(supervisors)
  
      res.status(200).send({ status: "Supervisors retrieved", supervisors: supervisors });
    } catch (error) {
       res.status(500).send({ status: "Error with retrieve", error: error.message });
     }
  });
  
  
  
  
  //get a specific supervisor/co-supervisor
  router.route('/supervisor/:id').get((req,res)=>{
    let supervisorID = req.params.id;
  
    staff.findById(supervisorID,(err,staff)=>{
        if(err){
            return res.status(400).json({success:false,err});
        }
        return res.status(200).json({
            success:true,
            staff: staff
        });
    });
  });
  
  
  
  
  
  //request supervisor/co-supervisor
  router.post("/requestSupervisor/:id", auth, async (req, res) => {
        
    try {
      const Student = await student.findById(req.Std._id);
      const supervisor = await staff.findById(req.params.id);
      const gid = Student.grp_id;
      const Group = await group.findById(gid);
  
  
      if (!Student) {
        throw new Error('There is no Student')
      }
  
      if (!Group) {
        throw new Error('You are not registered in a group...!')
      }
  
      const status = Group.researchTopic_Status;
  
      if (status == "Requested" || status == "Accepted" || status == "Rejected"){
        throw new Error('Your group already requested a supervisor...!')
      }
  
      var arr = [];
      arr = Group.researchTopic_Info;
  
      var info = arr[0];
  
  
      let researchTopic_Info = {
        _id: gid,
        group_name: Group.group_name,
        research_Topic: info.research_Topic,
        field: info.field,
        tags: info.tags
      };
  
      await staff.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { researchTopic_Info: researchTopic_Info } },
        { new: true, upsert: true }
      )
  
            //update research topic status
            const grp_status = "Requested";
  
            Group.researchTopic_Status = grp_status;
   
            await Group.save()
  
      res.status(200).send({ status: "Requested...!", researchTopic_Info: researchTopic_Info });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ error: error.message });
    }
  });
  
  
  
  
  //fetch co-supervisors in same field
  router.get("/displayCoSuper",auth, async (req, res) => {
  
    try {
      const std = await student.findById(req.Std._id);
      const group1 = await group.findById(std.grp_id);
  
      if (!group1) {
        throw new Error('There is no group..!!!')
      }
  
      const status = group1.researchTopic_Status;
  
      if (status == "Requested" || status == "Rejected"){
        throw new Error('Your group research topic is not accepted...!')
      }
     
      const topic = group1.researchTopic_Info;
      
      if (topic.length == 0) {
        throw new Error('Research topic not registered yet..!!!')
      }
  
      const arr = topic[0];
  
      const field1 = arr.field;
  
  
      const co_supervisors = await staff.find({ field: field1, role:"co-supervisor"});
  
  
      res.status(200).send({ status: "Co-Supervisors retrieved", co_supervisors: co_supervisors });
    } catch (error) {
      res.status(500).send({ status: "Error with retrieve", error: error.message });
     }
  });


module.exports = router;
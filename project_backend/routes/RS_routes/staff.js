const express = require("express");
const router = require("express").Router();
const staff = require("../../models/RS_models/staff");
let group = require("../..//models/DH_models/student_group");
const marking = require("../../models/NT_models/marking");
const submitions = require("../../models/NT_models/submition");
const validator= require("validator");
const jwt = require('jsonwebtoken');
// const auth = require('../../middleware/staff_middleware/auth')
const bcrypt = require('bcryptjs')
const auth = require("../../middleware/staff/staffauth");
const { request } = require("express");



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



// delete Staff Member
router.delete("/sdelete", auth, async (req, res) => {
  try {
    const staff1 = await staff.findById(req.staff1.id);
    if (!staff1) {
      throw new Error("There is no staff to delete");
    }
    const deleteProfile = await staff.findByIdAndDelete(req.staff1.id);
    res.status(200).send({ status: "user deleted", staff1 : deleteProfile });
  } catch (error) {
    res
      .status(500)
      .send({ status: "error with id", error: error.message });
  }

});





//update staff member case ekak thiyeee
router.put('/supdate', auth, async (req, res) => {
 
  const {fname, lname, username, phone, nic, staffid, field, email, description, profileImage} = req.body
  try {
    const updateValus={
      fname : fname,
      lname : lname,
      username :username,
      phone : phone,
      nic : nic,
      staffid : staffid,
      field : field,
      email : email,
      description: description,
      profileImage : profileImage
    };

    let staff1 = await staff.findOne({username})
 
    if (!staff1) {
      throw new Error('There is no staff account')
    }

    const staffUpdate = await staff.findByIdAndUpdate(req.staff1.id,updateValus)
 
    res.status(200).send({status: 'staff Profile Updated', staff1: staffUpdate})
  } catch (error) {
    res.status(500).send({error: error.message})
    console.log(error)
  }
});


//staff profile
router.get("/sprofile", auth, async (req, res) => {
  try {
    res.status(201)
    res.send({ success: "User fetched", staff1: req.staff1});
  } catch (error) {
    res.status(500)
    res.send({ status: "Error with /profile", error: error.message });
  }
});



//-------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------


//fetch supervisur detailes topics 


router.get("/desplaysupertopics",auth, async (req, res) => {
  try {
    
    const sup = await staff.findById(req.staff1.id);
    var arr =[];
    arr = sup.researchTopic_Info;
    

    res.status(200).send({ status: "Supervisor data retrieved", researchTopic_Info: arr });
  } catch (error) {
     res.status(500).send({ status: "Error with retrieve", error: error.message });
   }
});




//topic acception
router.post("/addstatusAccept/:id", auth, async (req,res)=>{

  const sup = await staff.findById(req.staff1._id);
  const groupId = req.params.id
  const Group = await group.findById(groupId);
  const topics = sup.researchTopic_Info;


  try{
    //send accepted topics to specific model
    for(var i = 0; i< topics.length; i++){
      var arr1 = topics[i];
      var id = arr1._id.toString();
//accepted new array creating
      if(id == groupId){
        await staff.findOneAndUpdate(
          {_id:req.staff1._id },
          {$push: {accepted_researchTopic_Info: arr1}},
          { new: true , upsert: true }
          
        )
//delete from research topics array
        staff.findOneAndUpdate(
          { _id: req.staff1._id },
          { $pull: { researchTopic_Info: arr1 } },
          { new: true }
        )
          .then(arr1 => console.log(arr1))
          .catch(err => console.log(err));
  
      }
     }
      

  if(!Group){
    throw new Error("Group not found")
  }

  if(Group.researchTopic_Status === "Requested"){

              await group.findOneAndUpdate(
                  {_id:groupId},
                  {researchTopic_Status : "Accepted"},
                  {new : true, upsert : true}
              );
              await group.findOneAndUpdate(
                {_id:groupId},
                {panalmemberstatus : "Requested"},
                {new : true, upsert : true}
            );
     
      };

      res.status(200).send({status : "Topic status updated"})
      
      }catch(error){
          res.status(500).send({error : error.message})
      }
 
});



//topic Rejection

router.post("/addstatusReject/:id", auth, async (req,res)=>{

  const sup = await staff.findById(req.staff1._id);
  const groupId = req.params.id
  const Group = await group.findById(groupId)
  const topics = sup.researchTopic_Info;

  try{

    for(var i = 0; i< topics.length; i++){
      var arr1 = topics[i];
      var id = arr1._id.toString();

   //delete from research topics array
      if(id == groupId){
        staff.findOneAndUpdate(
          { _id: req.staff1._id },
          { $pull: { researchTopic_Info: arr1 } },
          { new: true }
        )
          .then(arr1 => console.log(arr1))
          .catch(err => console.log(err));
  
      }
     }

  
  if(!Group){
    throw new Error("Group not found")
  }

  if(Group.researchTopic_Status === "Requested"){

              await group.findOneAndUpdate(
                  {_id:groupId},
                  {researchTopic_Status : "Rejected"},
                  {new : true, upsert : true}
              );
              
              
      }

      res.status(200).send({status : "Topic status updated"})
      
      }catch(error){
          res.status(500).send({error : error.message})
      }
 
});


//get marking schemes to supervisours

router.get("/getmarkings",(req,res)=>{

  marking.find({}).exec((err,marking)=>{
      if(err){
          return res.status(400).json({
              error:err
          });
      }
      return res.status(200).json({
          success:true,
          markings : marking,
      });
  });
});




//get project submitions to supervisours

router.get("/getsubmitions",(req,res)=>{

  submitions.find({}).exec((err,submitions)=>{
      if(err){
          return res.status(400).json({
              error:err
          });
      }
      return res.status(200).json({
          success:true,
          exitingsubmitions : submitions,
      });
  });
});


//get stutent groups for panel member
router.get("/desplaypanalgroups",auth, async (req, res) => {
  try {
    
    const panel = await staff.findById(req.staff1.id);
    var arr =[];
    arr = panel.groups;
    

    res.status(200).send({ status: "student group data retrieved", groups: arr });
  } catch (error) {
     res.status(500).send({ status: "Error with retrieve", error: error.message });
   }
});



//get specific group details to panal
router.route('/group/:id').get((req,res)=>{
 
  let Id = req.params.id;
  group.findById(Id,(err,group)=>{
      if(err){
          return res.status(400).json({success:false,err})
      }
      return res.status(200).json({
          success:true,
          group
      });
  });
});


//send topic feedback
router.route('/group/:id').post(async(req,res)=>{
  try {
    let Id = req.params.id;
    var grp = await group.findById(Id);
    var feed = req.body
    grp.topicFeedback = req.body.feedback;
  
    await grp.save();
    res.status(200).send({
      status:"feedback send successfully",Feedback:feed
    })
  } catch (error) {
    res.status(500).send({
      status:"error with feedback",Error:error.message
    })
  }
  
});




module.exports = router;
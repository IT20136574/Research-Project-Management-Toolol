const express = require("express");
const router = require("express").Router();
let student = require("../../models/DH_models/student");
let group = require("../../models/DH_models/student_group");
const auth = require("../../middleware/auth");
const Submissions = require("../../models/NT_models/submition")




//upload submissions
router.post("/uploadDocs/:id",auth, async(req,res)=>{
    try{
      const id = req.params.id;
      const std = await student.findById(req.Std._id);
      const group1 = await group.findById(std.grp_id);
      const submissions = await Submissions.findById(id);
      const document = submissions.file_Info;
    
      console.log(document)
    
      for(var i = 0; i< document.length; i++){
        var arr1 = document[i];
        var id1 = arr1._id.toString();
    
        console.log(std.grp_id.toString())
        console.log(id1)
    
        if(id1 == std.grp_id.toString()){
          throw new Error("Already submitted..");
        }
       }
    
    
      let fileInfo = {
        _id: group1._id,
        group_name: group1.group_name,
        fileUrl: req.body.fileUrl,
      };
    
      await Submissions.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { file_Info: fileInfo } },
        { new: true, upsert: true }
      )
    
      res.status(200).send({ status: "File Uploaded.", file_Info: fileInfo });
    }catch(error){
      console.log(error);
      res.status(500).send({status:"Error with upload",Error:error.messege});
    }
    });
    
    
    
    
      //remove file
      router.delete("/deleteFile/:id1/:id2", async (req, res)=>{
        
        try{
          const submission = await Submissions.findById(req.params.id1);
          const fileId = req.params.id2;
          const document = submission.file_Info;     
    
    
           for(var i = 0; i< document.length; i++){
            var arr1 = document[i];
            var id = arr1._id.toString();
    
            if(id == fileId){
      
              Submissions.findOneAndUpdate(
                { _id: req.params.id1 },
                { $pull: { file_Info: arr1 } },
                { new: true }
              )
                .then(arr1 => console.log(arr1))
                .catch(err => console.log(err));
        
            }
           }
      
          res.status(200).send({ status: "File removed...!", file_Info: arr1 });
          } catch (error){
            console.log(error);
            res.status(500).send({ status: "Error with delete", error: error.message });
          }
        })


//get submission types
router.get("/getSubs", async (req,res)=>{
  try{
    const subs = await Submissions.find();

    res.status(200).send({ status: "Retrieved successfully!", submissions: subs });
  }catch(error){
    console.log(error);
    res.status(500).send({status:"Error with retrieve", error:error.messege})
  }
})
    

module.exports = router;
const express = require("express");
const router = require("express").Router();
let group = require("../../models/DH_models/student_group");
const staff = require("../../models/RS_models/satff")

//Display Staff roles
router.get("/fletchgroups/:status",(req,res)=>{
    let status = req.params.status;
    if(status == "Accepted"){ 
        group.find({researchTopic_Status : status}).exec((err,group)=>{
            if(err){
                return res.status(400).json({
                    error:err
                });
            }
            return res.status(200).json({
                success:true,
                selectedgroups : group,
            });
        });
    }else{
        return res.status(400).json({
            error : "Data fletch error"
        });
    }
});

//fletch specific panem members
router.get("/fletchpanels/:field",(req,res)=>{
    let field = req.params.field;
    if(field){ 
        staff.find({field : field}).exec((err,staff)=>{
            if(err){
                return res.status(400).json({
                    error:err
                });
            }
            return res.status(200).json({
                success:true,
                selectedstaff : staff,
            });
        });
    }else{
        return res.status(400).json({
            error : "Data fletch error"
        });
    }
});


module.exports = router;
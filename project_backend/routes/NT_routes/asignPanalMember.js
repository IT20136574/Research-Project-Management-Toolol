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

//find unique group
router.route("/getuniuegroup/:id").get((req,res)=>{
 
    let id = req.params.id;
 
    group.findById(id,(err,group)=>{
        if(err){
            return res.status(400).json({success:false,err});
        }
        return res.status(200).json({
            success:true,
            group
        });
    });
 })

 
//register 2 panel members to group
router.post("/addPanelMembers/:id",async (req,res)=>{
    const groupId = req.params.id
    const Group = await group.findById(groupId)
    try{
    if(!Group){
        throw new Error("There is no Group")
    }

    //console.log(Group.panalmembers.length)


        const {
            pmember1,
            pmember2
        } = req.body

        let pmemeberids = [pmember1, pmember2];

        for(var x = 0; x<2; x++){
                var PanalMember = await staff.findById(pmemeberids[x])
                if(!PanalMember){
                    throw new Error("There is no panal member");
                }

                let p_members = {
                    _id : PanalMember._id,
                    fname : PanalMember.fname,
                    lname : PanalMember.lname,
                    staffid : PanalMember.staffid
                }
                if(Group.panalmembers.length === 2){
                    throw new Error("panal members already added")
                }

                await group.findOneAndUpdate(
                    {_id : groupId},
                    {$push:{panalmembers : p_members}},
                    {new : true, upsert : true}
                )

                await group.findOneAndUpdate(
                    {_id:groupId},
                    {panalmemberstatus : "Allocated"},
                    {new : true, upsert : true}
                )

                
                let groups = {
                    _id : groupId
                }
                
                await staff.findOneAndUpdate(
                    {_id: PanalMember._id},
                    {$push:{groups : groups}},
                    {new : true, upsert : true}
                )
        }

        res.status(200).send({status : "panel members Added"})

        }catch(error){
            res.status(500).send({error : error.message})
        }

    
});

module.exports = router;
const { setInternalBufferSize } = require("bson");
const express = require("express");
const student = require("../../models/DH_models/student");
const staff = require("../../models/RS_models/staff")
const router = require("express").Router();

//Display Staff roles
router.get("/view/:role",(req,res)=>{
    let role = req.params.role;
    if(role == "supervisor" || role == "panal_member" || role == "co-supervisor" ){ 
        staff.find({role : role}).exec((err,staff)=>{
            if(err){
                return res.status(400).json({
                    error:err
                });
            }
            return res.status(200).json({
                success:true,
                selectedStaff : staff,
            });
        });
    }else{
        return res.status(400).json({
            error : "Data fletch error"
        });
    }
});

//get uniqe Staff member
router.route("/staffview/:id").get((req,res)=>{
 
    let id = req.params.id;
 
    staff.findById(id,(err,staff)=>{
        if(err){
            return res.status(400).json({success:false,err});
        }
        return res.status(200).json({
            success:true,
            staff
        });
    });
 })

router.route('/updateStaff/:id').put((req,res)=>{
    staff.findByIdAndUpdate(
        req.params.id,{
            $set:req.body
        },
        (err,staff)=>{
            
            if(err){
                return res.status(400).json({error:err});
            }
            
            return res.status(200).json({
                success: "Update Successfully",staff
            });
        });
});

//Delete Staff
router.delete("/deleteStaff/:id", async (req, res)=>{
   
    const staffexist = await  staff.findById(req.params.id)

    if(!staffexist){
        return res.json({
            message:"There is no staff to delete"
        })
    }
 
    staff.findByIdAndRemove(req.params.id).exec((err,deletedstaff)=>{

        if(err) return res.status(400).json({
            message: "Delete unsuccessfull",err
        });
        return res.json({
            message:"Delete successful",deletedstaff
        });
    });
})


//Student  Account Management
//Student Show 
router.get("/view",(req,res)=>{
    student.find().exec((err,student)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            showStudents :student,
        });
    });
});

//Display uniqe Student Details
router.route("/stview/:id").get((req,res)=>{
 
    let id = req.params.id;
 
    student.findById(id,(err,student)=>{
        if(err){
            return res.status(400).json({success:false,err});
        }
        return res.status(200).json({
            success:true,
            student
        });
    });
 })

//Student Delete function
router.delete("/deleteStudent/:id", async (req, res)=>{
   
    const studentexist = await  student.findById(req.params.id)

    if(!studentexist){
        return res.json({
            message:"There is no Student to delete"
        })
    }
 
    student.findByIdAndRemove(req.params.id).exec((err,deletedStudent)=>{

        if(err) return res.status(400).json({
            message: "Delete unsuccessfull",err
        });
        return res.json({
            message:"Delete successful",deletedStudent
        });
    });

})

//Update Student
router.route('/updateStudent/:id').put((req,res)=>{
    student.findByIdAndUpdate(
        req.params.id,{
            $set:req.body
        },
        (err,student)=>{
            
            if(err){
                return res.status(400).json({error:err});
            }
            
            return res.status(200).json({
                success: "Update Successfully"
            });
        });
});





module.exports = router;
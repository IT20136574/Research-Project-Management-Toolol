const router = require("express").Router();
const submition = require('../../models/NT_models/submition')

router.post("/create" ,(req,res)=>{
 
    let newsubmition = new submition(req.body);
 
    newsubmition.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"submition created successfully"
        });
    });
});

//get all document details
router.get("/getSubmition",(req,res)=>{

        submition.find({}).exec((err,submition)=>{
            if(err){
                return res.status(400).json({
                    error:err
                });
            }
            return res.status(200).json({
                success:true,
                submitions : submition,
            });
        });
});

router.delete("/deleteSubmition/:id", async (req, res)=>{
   
    const exSubmition = await  submition.findById(req.params.id)

    if(!exSubmition){
        return res.json({
            message:"There is no Document to delete"
        })
    }
 
    submition.findByIdAndRemove(req.params.id).exec((err,deletedSubmition)=>{

        if(err) return res.status(400).json({
            message: "Delete unsuccessfull",err
        });
        return res.json({
            message:"Delete successful",deletedSubmition
        });
    });

})

//get all document details
router.get("/getSubmition/:id",(req,res)=>{
    let id = req.params.id;

    submition.findById(id).exec((err,submition)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            submitions : submition,
        });
    });
});

router.route('/update/:id').put((req,res)=>{
    submition.findByIdAndUpdate(
        req.params.id,{
            $set:req.body
        },
        (err,submition)=>{
           
            if(err){
                return res.status(400).json({error:err});
            }
           
            return res.status(200).json({
                success: "Update Successfully"
            });
        });
    });


module.exports = router;
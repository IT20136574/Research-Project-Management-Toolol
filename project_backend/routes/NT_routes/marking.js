const router = require("express").Router();
const marking = require("../../models/NT_models/marking");

router.post("/create" ,(req,res)=>{
    let newMarking = new marking(req.body);
    newMarking.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Marking schema created successfully"
        });
    });
});

//get all document details
router.get("/getMarkings",(req,res)=>{

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

router.delete("/deleteMarking/:id", async (req, res)=>{
   
    const exmarking = await  marking.findById(req.params.id)

    if(!exmarking){
        return res.json({
            message:"There is no Marking to delete"
        })
    }
 
    marking.findByIdAndRemove(req.params.id).exec((err,deletedMarking)=>{

        if(err) return res.status(400).json({
            message: "Delete unsuccessfull",err
        });
        return res.json({
            message:"Delete successful",deletedMarking
        });
    });

})

router.get("/getMarking/:id",(req,res)=>{
    let id = req.params.id;

    marking.findById(id).exec((err,marking)=>{
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


router.route('/update/:id').put((req,res)=>{
    marking.findByIdAndUpdate(
        req.params.id,{
            $set:req.body
        },
        (err,marking)=>{
           
            if(err){
                return res.status(400).json({error:err});
            }
           
            return res.status(200).json({
                success: "Update Successfully"
            });
        });
    });


module.exports = router;
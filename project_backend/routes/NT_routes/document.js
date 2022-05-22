const router = require("express").Router();
const document = require('../../models/NT_models/document')

router.post("/uploadDoc" ,(req,res)=>{
 
    let newdocument = new document(req.body);
 
    newdocument.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Document added successfully"
        });
    });
});

//get all document details
router.get("/getDocument",(req,res)=>{

        document.find({}).exec((err,document)=>{
            if(err){
                return res.status(400).json({
                    error:err
                });
            }
            return res.status(200).json({
                success:true,
                documents : document,
            });
        });
});

router.delete("/deleteDocument/:id", async (req, res)=>{
   
    const exdocument = await  document.findById(req.params.id)

    if(!exdocument){
        return res.json({
            message:"There is no Document to delete"
        })
    }
 
    document.findByIdAndRemove(req.params.id).exec((err,deletedDocument)=>{

        if(err) return res.status(400).json({
            message: "Delete unsuccessfull",err
        });
        return res.json({
            message:"Delete successful",deletedDocument
        });
    });

})

//get all document details
router.get("/getDocument/:id",(req,res)=>{
    let id = req.params.id;

    document.findById(id).exec((err,document)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            documents : document,
        });
    });
});

module.exports = router;
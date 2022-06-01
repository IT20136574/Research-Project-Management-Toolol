const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
    docname: {
        type : String,
        require:true,
        trim:true
    },

    displaytitle: {
        type : String,
        require:true,
        trim:true
    },

    Uploaddate: {
        type : String,
        require:true,
        trim:true
    },

    discription: {
        type : String,
        require:true,
        trim:true
    },

    type: {
        type : String,
        require:true,
        trim:true
    },

    file_Info: [{

        _id: {
            type: mongoose.Schema.Types.ObjectId,
            //required: true,
            ref: "student_groups"
        },
        group_name: {
          type: String,
          //required: true
        },
        fileUrl: {
          type: String,
          //required: true
        }
      }],
})

const document = mongoose.model("document",documentSchema);
module.exports = document;
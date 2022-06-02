const mongoose = require("mongoose");

const submitionSchema = new mongoose.Schema({
    submitionTitle: {
        type : String,
        require:true,
        trim:true
    },

    submitionStartedDate: {
        type : String,
        require:true,
        trim:true
    },

    deadline: {
        type : String,
        require:true,
        trim:true
    },

    discription: {
        type : String,
        require:true,
        trim:true
    },

    submitionType: {
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
      }]

})

const submition = mongoose.model("submition",submitionSchema);
module.exports = submition;
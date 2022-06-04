const mongoose = require("mongoose");

const markingSchema = new mongoose.Schema({
    mTittle: {
        type : String,
        require:true,
        trim:true
    },
    DTittle: {
        type : String,
        require:true,
        trim:true
    },

    discription: {
        type : String,
        require:true,
        trim:true
    },

    fileUrl: {
        type : String,
        require:true,
    }

})

const marking = mongoose.model("marking",markingSchema);
module.exports = marking;
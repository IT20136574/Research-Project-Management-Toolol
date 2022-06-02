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

})

const document = mongoose.model("document",documentSchema);
module.exports = document;
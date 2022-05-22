const mongoose = require("mongoose");



const uploadSchema = new mongoose.Schema({

  imageUrl: {
    type: String,
    required: true,
    trim: true,
  },


});



const upload = mongoose.model("uploads", uploadSchema);

module.exports = upload;
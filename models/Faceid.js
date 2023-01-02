const mongoose = require("mongoose");

const faceSchema = new mongoose.Schema({
  detections : {type: String, requried: true}
   
  });
  
  const faceModel = mongoose.model("Faces", faceSchema);
  
  module.exports = faceModel;
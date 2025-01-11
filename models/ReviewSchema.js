const mongoose = require("mongoose");
const { Schema } = mongoose;
const ReviewSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Review", ReviewSchema);

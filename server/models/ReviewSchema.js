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
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  uid: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Review", ReviewSchema);
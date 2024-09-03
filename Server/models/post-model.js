// 課程的model
const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  id: { type: String },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  /*   price: {
    type: Number,
    required: true,
  }, */
  poster: {
    // mongo給的 primary key
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  viewer: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Post", postSchema);

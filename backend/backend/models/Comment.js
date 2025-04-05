const mongoose = require("mongoose");
const User = require("./UserModel")
const Quote = require("./QuotesModel")

const CommentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  quote: { type: mongoose.Schema.Types.ObjectId, ref: "Quote", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Comment", CommentSchema);

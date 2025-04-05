const mongoose = require("mongoose");
const User = require("./UserModel")
const Quote = require("./QuotesModel")


const SavedQuoteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  quote: { type: mongoose.Schema.Types.ObjectId, ref: "Quote", required: true },
}, { timestamps: true });

module.exports = mongoose.model("SavedQuote", SavedQuoteSchema);


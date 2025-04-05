const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: String, enum: ["like", "comment", "follow"], required: true },
  quote: { type: mongoose.Schema.Types.ObjectId, ref: "Quote" },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("Notification", NotificationSchema);

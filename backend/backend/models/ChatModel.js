const mongoose = require("mongoose")
const User = require("./UserModel")

const chatSchema = new mongoose.Schema({
    senderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    receiverId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    text : {
        type : String
    },
    image : {
        type : String
    }
},{
    timestamps : true
})

module.exports = mongoose.model("Chat",chatSchema)

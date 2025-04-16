
const { getReceiverId, io } = require("../config/socket");
const Chat = require("../models/ChatModel");
const User = require("../models/UserModel");

const getChat = async (req, res) => {
  const { userId } = req.params;

  try {
    const myId = req.user._id;

    const chat = await Chat.find({
      $or: [
        { senderId: userId, receiverId: myId },
        { receiverId: userId, senderId: myId },
      ],
    }).sort({ createdAt: 1 });
    res.status(200).json(chat);
  } catch (error) {
    res.status(404).json({ error: "server Error" });
  }
};


const sendMessage = async (req, res) => {
  try {
    const { userId } = req.params;
    const myId = req.user._id;

    const messageText = req.body.text || null;
    const messageImage = req.file?.path || null;

    if (!messageText && !messageImage) {
      return res.status(400).json({ error: "Message cannot be empty" });
    }

    const message = new Chat({
      senderId: myId,
      receiverId: userId,
      text: messageText,
      image: messageImage,
    });

    await message.save();
    const receiverSocketId = getReceiverId(userId)

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", message);
    }

    return res.status(200).json({ message });
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

const getChatUsers = async (req, res) => {
  try {
    const myId = req.user._id;

    const chats = await Chat.find({
      $or: [{ senderId: myId }, { receiverId: myId }],
    });

    const userIds = new Set();

    chats.forEach((chat) => {
      if (chat.senderId.toString() !== myId.toString()) {
        userIds.add(chat.senderId.toString());
      }
      if (chat.receiverId.toString() !== myId.toString()) {
        userIds.add(chat.receiverId.toString());
      }
    });

    const uniqueUsers = [...userIds];

    const users = await User.find({ _id: { $in: uniqueUsers } }).select(
      "-password"
    );

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getChat, sendMessage, getChatUsers };

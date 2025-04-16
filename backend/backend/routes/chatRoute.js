const express = require("express")
const authMiddleware = require("../middlewares/authMiddleware")
const { getChat, sendMessage, getChatUsers } = require("../controllers/chatController")
const upload = require("../config/multer")
const router = express.Router()


router.get("/users",authMiddleware,getChatUsers)
router.get("/:userId",authMiddleware,getChat)
router.post("/:userId",authMiddleware,upload.single("image"),sendMessage)

module.exports = router
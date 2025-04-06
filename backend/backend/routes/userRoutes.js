const express = require('express');
const { getUserProfile, followUser, unfollowUser, getSelfProfile, updateProfile } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../config/multer');
const router = express.Router();


router.get('/',authMiddleware, getSelfProfile);
router.put("/update", authMiddleware, upload.single("profilePic"),updateProfile);
router.get('/:id', getUserProfile);
router.post('/:id/follow',authMiddleware, followUser);
router.post('/:id/unfollow',authMiddleware, unfollowUser);

module.exports = router;

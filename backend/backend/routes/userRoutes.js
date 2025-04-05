const express = require('express');
const { getUserProfile, followUser, unfollowUser, getSelfProfile } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();


router.get('/',authMiddleware, getSelfProfile);
router.get('/:id', getUserProfile);
router.post('/:id/follow',authMiddleware, followUser);
router.post('/:id/unfollow',authMiddleware, unfollowUser);

module.exports = router;

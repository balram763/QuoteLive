const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { addComment, deleteComment } = require('../controllers/commentController');
const router = express.Router();

router.post('/:quoteId',authMiddleware, addComment);
router.delete('/:quoteId/:commentId',authMiddleware, deleteComment);

module.exports = router;

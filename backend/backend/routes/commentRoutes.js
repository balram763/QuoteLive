const express = require('express');
const { deleteComment, addComment } = require('../controllers/commentController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/:quoteId',authMiddleware, addComment);
router.delete('/:quoteId/:commentId',authMiddleware, deleteComment);

module.exports = router;

const express = require('express');
const router = express.Router();
const { likeQuote } = require('../controllers/likeController');
const { unlikeQuote } = require('../controllers/likeController');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/:quoteId',authMiddleware, likeQuote);
router.delete('/:quoteId',authMiddleware, unlikeQuote);

module.exports = router;

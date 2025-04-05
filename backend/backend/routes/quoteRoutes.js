const express = require('express');
const { getQuoteById, getAllQuotes, createQuote, deleteQuote } = require('../controllers/quoteController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/',  getAllQuotes);
router.get('/:id',  getQuoteById);
router.post('/',authMiddleware,  createQuote);
router.delete('/:id',authMiddleware,  deleteQuote);

module.exports = router;

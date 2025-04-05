const express = require('express');
const { addFavorite, removeFavorite,getFavorites } = require('../controllers/favoriteController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getFavorites);
router.post('/:id',authMiddleware, addFavorite);
router.delete('/:id',authMiddleware, removeFavorite);


module.exports = router;

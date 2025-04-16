const SavedQuote = require('../models/SavedQuote');
const Quote = require('../models/QuotesModel');


const addFavorite = async (req, res) => {
  try {
    const userId = req.user._id;
    const {id} = req.params;

    const quote = await Quote.findById(id);
    if (!quote) return res.status(404).json({ message: "Quote not found" });

    const alreadySaved = await SavedQuote.findOne({ user: userId, quote: id });
    if (alreadySaved) {
      return res.status(400).json({ message: "Already added" });
    }

    const newFavorite = new SavedQuote({ user: userId, quote: id });
    await newFavorite.save();

    res.status(201).json({ message: "Added to favorites" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const removeFavorite = async (req, res) => {
  try {
    const userId = req.user._id;
    const {id} = req.params;
    console.log(id)


    const result = await SavedQuote.findOneAndDelete({ user: userId, quote: id });
    if (!result) {
      return res.status(400).json({ message: "Quote already deleted or not found" });
    }

    res.status(200).json({ message: "Removed from favorites" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFavorites = async (req, res) => {
  try {
    const favorites = await SavedQuote.find({ user: req.user._id }).populate("quote");

    // Map to only get the quote data
    const favoriteQuotes = favorites.map(fav => fav.quote);

    res.status(200).json({ quotes: favoriteQuotes });
  } catch (error) {
    console.error("Error in getFavorites:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {getFavorites,removeFavorite,addFavorite}

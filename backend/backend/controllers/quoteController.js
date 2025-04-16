const Quote = require('../models/QuotesModel');

const getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find().populate("author","-password");
    res.status(200).json(quotes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getQuoteById = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id).populate("author","-password");
    if (!quote) return res.status(404).json({ message: 'Quote not found' });
    res.status(200).json(quote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

  const createQuote = async (req, res) => {
    try {
      const { text, category } = req.body;
  
      if (!text || !category) {
        return res.status(400).json({ message: 'Text, author, and category are required' });
      }

      const quote = new Quote({
        text,
        author : req.user._id,
        category,
        user: req.user.username,
      });


      await quote.save();
      const quotes = await Quote.find()
      res.status(201).json(quotes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

const deleteQuote = async (req, res) => {
  try {
    await Quote.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Quote deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {deleteQuote,createQuote,getQuoteById,getAllQuotes}
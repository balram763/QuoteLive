const Quote = require('../models/QuotesModel');


const likeQuote = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.quoteId);
    if (!quote) return res.status(404).json({ message: "Quote not found" });

    const username = req.user?.username;
    if (!username) return res.status(401).json({ message: "Unauthorized" });

 
    if (!quote.likes.includes(username)) {
      quote.likes.push(username);
      await quote.save();
    }

    res.status(200).json({ message: "Liked", quote});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const unlikeQuote = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.quoteId);
    if (!quote) return res.status(404).json({ message: "Quote not found" });

    const username = req.user?.username;
    if (!username) return res.status(401).json({ message: "Unauthorized" });

    quote.likes = quote.likes.filter(like => like !== username);
    
    await quote.save();
    res.status(200).json({ message: "Unliked", quote });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {likeQuote,unlikeQuote }
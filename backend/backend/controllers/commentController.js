const Quote = require('../models/QuotesModel');
const Comment = require("../models/Comment")




exports.addComment = async (req, res) => {
  try {
    const {quoteId} = req.params
    console.log(quoteId)
    const { text } = req.body;
    const quote = await Quote.findById(quoteId);
    if (!quote) return res.status(404).json({ message: 'Quote not found' });
    const singlecomment = ({commentBy: req.user.username, text ,quote:quoteId});

    quote.comments.push(singlecomment);
    await quote.save();
    res.status(201).json({ message: 'Comment added' ,quote});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.quoteId);
    if (!quote) return res.status(404).json({ message: 'Quote not found' });
    quote.comments = quote.comments.filter((comment) => comment._id.toString() !== req.params.commentId);
    await quote.save();
    res.status(200).json({ message: 'Comment deleted',quote});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const mongoose = require("mongoose");

const QuoteSchema = new mongoose.Schema({
  text: { type: String, required: true },
  category: { type: String, enum: ["Motivation", "Love", "Life", "Friendship", "Success", "Humor"], required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  user : {type : String,required:true},
  likes: [{ type: String, ref: "User" }  ],
  comments: [{text: { type: String },
              commentBy: { type: String },
              quote: { type: mongoose.Schema.Types.ObjectId, ref: "Quote"},
            }]
}, { timestamps: true });

module.exports = mongoose.model("Quote", QuoteSchema);




// /backend
// │── /src
// │   │── /config
// │   │   ├── db.js              # MongoDB connection
// │   │   ├── env.js             # Environment variable loader
// │   │
// │   │── /controllers
// │   │   ├── authController.js   # Authentication (login, signup, logout)
// │   │   ├── userController.js   # User profile, follow/unfollow
// │   │   ├── quoteController.js  # CRUD operations for quotes
// │   │   ├── favoriteController.js  # Handle favorite quotes
// │   │   ├── commentController.js   # Handle comments on quotes
// │   │   ├── likeController.js   # Handle likes
// │   │
// │   │── /models
// │   │   ├── User.js             # User schema
// │   │   ├── Quote.js            # Quote schema
// │   │   ├── Comment.js          # Comment schema
// │   │   ├── Like.js             # Like schema
// │   │   ├── Favorite.js         # Favorite schema
// │   │
// │   │── /routes
// │   │   ├── authRoutes.js       # Routes for authentication
// │   │   ├── userRoutes.js       # Routes for user profile, follow/unfollow
// │   │   ├── quoteRoutes.js      # Routes for CRUD operations on quotes
// │   │   ├── favoriteRoutes.js   # Routes for favorite feature
// │   │   ├── commentRoutes.js    # Routes for adding/removing comments
// │   │   ├── likeRoutes.js       # Routes for liking/unliking
// │   │
// │   │── /middlewares
// │   │   ├── authMiddleware.js   # Middleware for authentication
// │   │   ├── errorMiddleware.js  # Middleware for handling errors
// │   │
// │   │── /utils
// │   │   ├── generateToken.js    # JWT token generation
// │   │   ├── validateData.js     # Utility for data validation
// │   │
// │   │── server.js               # Main Express server entry point
// │   │── app.js                  # App initialization
// │
// │── /tests                      # Test cases
// │── .env                        # Environment variables
// │── package.json                 # Dependencies
// │── README.md                    # Project documentation

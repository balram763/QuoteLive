const express = require('express');
const connectDB = require('./config/dbconfig');
const errorHandler = require('./middlewares/errorHandler');
const cors = require("cors");
require("dotenv").config()

const app = express();

//DB CONNECTION
connectDB()

const PORT = process.env.PORT || 5000
app.use(cors({
    origin : "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
})
)

app.use(express.urlencoded({extends : true}))
app.use(express.json());
app.use(errorHandler);


// Route connections
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/quotes', require('./routes/quoteRoutes'));
app.use('/api/favorites', require('./routes/favoriteRoutes'));
app.use('/api/comments',  require('./routes/commentRoutes'));
app.use('/api/likes', require('./routes/likeRoutes'));

app.listen(PORT ,()=>{
    console.log(`server is running at port : ${PORT}`)
})

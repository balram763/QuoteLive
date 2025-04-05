const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
require("dotenv").config()

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) return res.status(401).json({ message: 'Access Denied: No Token Provided' });

        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select('-password');

        if (!req.user) return res.status(401).json({ message: 'User not found' });

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid Token' });
    }
};

// const authMiddleware = async (req, res, next) => {
//     try {
//         let token = req.cookies.authToken || req.header('Authorization');
//         console.log({"authToken" : req.cookie.authToken} )
//         console.log({"Cookies" : JSON.parse(req.cookies)} )

//         if (!token) return res.status(401).json({ message: 'Access Denied: No Token Provided' });

//         if (token.startsWith("Bearer ")) {
//             token = token.slice(7, token.length)
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = await User.findById(decoded.userId).select('-password');

//         if (!req.user) return res.status(401).json({ message: 'User not found' });

//         next();
//     } catch (error) {
//         return res.status(401).json({ message: 'Invalid Token' });
//     }
// };



module.exports = authMiddleware;

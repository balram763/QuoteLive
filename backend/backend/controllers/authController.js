const User = require('../models/UserModel');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ 
      bio : user.bio,
      email : user.email,
      followers : user.followers,
      following : user.following,
      profilePic : user.profilePic,
      username : user.username,
      token : token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    res.status(200).json({ 
      bio : user.bio,
      email : user.email,
      followers : user.followers,
      following : user.following,
      profilePic : user.profilePic,
      username : user.username,
      token : token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error)
  }
};

const logout = async (req, res) => {
  res.status(200).json("logged out")
};

const AuthController = {login,signup,logout}

module.exports = AuthController

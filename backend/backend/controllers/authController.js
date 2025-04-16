// const User = require("../models/UserModel");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const validator = require("validator");

// const signup = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     if (!username || !email || !password) {
//       return res.status(400).json({ message: "All fields are required." });
//     }

//     if (!validator.isEmail(email)) {
//       return res.status(400).json({ message: "Invalid email format." });
//     }

//     if (password.length < 6) {
//       return res
//         .status(400)
//         .json({ message: "Password must be at least 6 characters." });
//     }

//     const existingUsername = await User.findOne({ username });
//     const userExist = await User.findOne({ email });
//     if (userExist || existingUsername) {
//       return res
//         .status(400)
//         .json({ message: "Email Or Username Already Register" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     await sendOTP(email, otp);

//     const otpExpires = Date.now() + 5 * 60 * 1000;



//     const user = new User({
//       username,
//       email,
//       password: hashedPassword,
//       otp,
//       otpExpires,
//       isVerified: false,
//     });
//     await user.save();

//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     res.status(201).json({
//       message: "Signup successful. OTP sent to email.",
//       bio: user.bio,
//       email: user.email,
//       followers: user.followers,
//       following: user.following,
//       profilePic: user.profilePic,
//       username: user.username,
//       token: token,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// const verifyOtp = async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     if (!email || !otp) {
//       return res.status(400).json({ message: "Email and OTP are required." });
//     }

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     // if (user.isVerified) {
//     //   return res.status(400).json({ message: "User is already verified." });
//     // }

//     if (user.otp !== otp) {
//       return res.status(400).json({ message: "Invalid OTP." });
//     }

//     if (Date.now() > user.otpExpires) {
//       return res.status(400).json({ message: "OTP has expired." });
//     }

//     user.isVerified = true;
//     user.otp = null;
//     user.otpExpires = null;
//     await user.save();

//     return res.status(200).json({ message: "Account verified successfully." });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };



// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     let user = await User.findOne({ email });

//     if (!user.isVerified) {
//       return res.status(403).json({ message: "Please verify your email first." });
//     }

//     if (!user) {
//       return res.status(404).json({ message: "User not found" })
//     };

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch){
//       return res.status(401).json({ message: "Invalid credentials" });
//     }


//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     res.status(200).json({
//       bio: user.bio,
//       email: user.email,
//       followers: user.followers,
//       following: user.following,
//       profilePic: user.profilePic,
//       username: user.username,
//       token: token,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//     console.log(error);
//   }
// };

// const logout = async (req, res) => {
//   res.status(200).json("logged out");
// };

// const AuthController = { login, signup, verifyOtp };

// module.exports = AuthController;


const User = require("../models/UserModel");
const TempUser = require("../models/TempUserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const { sendOTP } = require("../config/nodemailer");

// SIGNUP
const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email format." });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters." });
    }

    // const existingUsername = await User.findOne({ username });
    // const userExist = await User.findOne({ email });
    // if (userExist || existingUsername) {
    //   return res.status(400).json({ message: "Email Or Username Already Register" });
    // }

    const existEmail = await User.findOne({ email });

    if(existEmail){
      return res.status(400).json({ error: "Email Already Register." });
    }

    const existUser = await User.findOne({ username });

    if(existUser){
      return res.status(400).json({ error: "Email Already Register." });
    }



    const existingTemp = await TempUser.findOne({ email });
    if (existingTemp) await TempUser.deleteOne({ email });

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(otp)

    const otpExpires = Date.now() + 5 * 60 * 1000;

    await sendOTP(email,otp);

    const tempUser = new TempUser({
      username,
      email,
      password: hashedPassword,
      otp,
      otpExpires,
    });

    await tempUser.save();


    res.status(201).json({ message: "Signup successful. OTP sent to email." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// VERIFY OTP
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ error: "Email and OTP are required." });
    }

    const tempUser = await TempUser.findOne({ email });

    if (!tempUser) {
      return res.status(404).json({ error: "User not found." });
    }

    if (tempUser.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP." });
    }

    if (Date.now() > tempUser.otpExpires) {
      return res.status(400).json({ error: "OTP has expired." });
    }

    const user = new User({
      username: tempUser.username,
      email: tempUser.email,
      password: tempUser.password,
      isVerified: true,
    });

    await user.save();
    await TempUser.deleteOne({ email });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      bio: user.bio,
      email: user.email,
      followers: user.followers,
      following: user.following,
      profilePic: user.profilePic,
      username: user.username,
      token: token,
      isVerified : true,
      _id : user._id
    });

  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.isVerified) {
      return res.status(403).json({ error: "Please verify your email first." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      bio: user.bio,
      email: user.email,
      followers: user.followers,
      following: user.following,
      profilePic: user.profilePic,
      username: user.username,
      token: token,
      isVerified : true,
      _id : user._id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const AuthController = { login, signup, verifyOtp };
module.exports = AuthController;

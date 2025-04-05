const User = require('../models/UserModel');

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSelfProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    .populate("followers", "username profilePic _id")
    .populate("following", "username profilePic _id");


    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.followUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const followedUser = await User.findById(id)

    if(!followedUser){
        res.status(400).json({ message: 'Already following' });
    }



    if (!user.following.includes(id)) {
      user.following.push(id);
      followedUser.followers.push(user._id)
      await followedUser.save()
      await user.save();
      res.status(200).json({ message: 'User followed' });
    } else {
      res.status(400).json({ message: 'Already following' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// exports.unfollowUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(req.user._id);
//     const followingUser = await User.findById(id);
//     if (!user && !followingUser) return res.status(404).json({ message: 'User not found' });

//     user.following = user.following.filter((userId) => userId.toString() !== id);
//     followingUser.followers = followingUser.followers.filter((userId) => userId.toString() !== user._id);
//     await followingUser.save()
//     await user.save();
//     res.status(200).json({ message: 'User unfollowed' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.unfollowUser = async (req, res) => {
    try {
      const { id } = req.params;
      
      const user = await User.findById(req.user._id);
      const followingUser = await User.findById(id);

      
      if (!user || !followingUser) {
        return res.status(404).json({ message: "User not found" });
      }
  

      if (!user.following.includes(id)) {
        return res.status(400).json({ message: "You are not following this user" });
      }

  
      followingUser.followers = followingUser.followers.filter((userId) => userId.toString() !== user._id.toString());
      user.following = user.following.filter((userId) => userId.toString() !== id.toString());

      await user.save();
      await followingUser.save();
  
      res.status(200).json({ message: "User unfollowed successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

const getFollowers = async() => {
    const allfollowers = await User.find()
}

const User = require('../models/UserModel');

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password')
    .populate("followers", "username profilePic _id")
    .populate("following", "username profilePic _id")
    
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSelfProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    .select("-password") 
    .populate("followers", "username profilePic _id")
    .populate("following", "username profilePic _id")


    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const followUser = async (req, res) => {
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



const unfollowUser = async (req, res) => {
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


  


const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({},{profilePic:1,bio:1,username:1});

    if (allUsers.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }

    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: "Server Error"});
  }
};





const updateProfile = async (req, res) => {
  try {
    const { bio } = req.body;
    const profile = req.file?.path;

    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json("User not found");

    user.bio = bio || user.bio;
    if (profile) user.profilePic = profile;

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json("Server error: " + error.message);
  }
};




module.exports = {updateProfile,unfollowUser,followUser,getSelfProfile,getUserProfile,getAllUsers}


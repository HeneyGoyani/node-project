let User = require("../models/user.model")
const bcrypt = require("bcrypt")

exports.userDelete = async (req, res) => {
  try {
    const userId = req.params.id;

    if (req.user._id.toString() !== userId) {
      return res.json({ message: "You can only delete your own account" });
    }

    await User.findByIdAndUpdate(userId, { isDelete: true }, { new: true });

    return res.json({ status: 200, message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (req.user._id.toString() !== userId) {
      return res.json({ message: "You can only update your own profile" });
    }

    const user = await User.findById(userId);
    if (!user) return res.json({ message: "User not found" });

    let profilePic = user.profilePic;
    if (req.file) {
      if (user.profilePic) {
        const oldImagePath = path.join(__dirname, "..", user.profilePic);
        try {
          fs.unlinkSync(oldImagePath);
        } catch (err) {
          console.log("Old profile pic delete error:", err.message);
        }
      }
      profilePic = `uploads/${req.file.filename}`;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { ...req.body, profilePic },
      { new: true }
    );

    return res.json({ status: 200, message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};


exports.changePassword = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.json({ status: 404, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.json({ status: 400, message: "Old password is incorrect" });
    }

    const hashPass = await bcrypt.hash(req.body.newPassword, 10);
    await User.findByIdAndUpdate(userId, { password: hashPass });

    return res.json({ status: 200, message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, message: "Something went wrong!" });
  }
};
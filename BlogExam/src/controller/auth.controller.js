const User = require("../models/user.model.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


exports.registerUser = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email, isDelete: false });
    if (user) {
      return res.json({ status: 400, message: "User Already Exist" });
    }

    let imagePath = "";
    if (req.file) {
      imagePath = `uploads/${req.file.filename}`;
    }

    let hashPassword = await bcrypt.hash(req.body.password, 10);

    user = await User.create({
      ...req.body,
      password: hashPassword,
      profilePic: imagePath,
    });

    return res.json({
      status: 201,
      message: "User Registered Successfully",
    });

  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};



exports.loginUser = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email, isDelete: false });
    if (!user) {
      return res.json({ status: 404, message: "User Not Found !!!" })
    }

    let passwordCompare = await bcrypt.compare(req.body.password, user.password)
    if (!passwordCompare) {
      return res.json({ message: "Invalid Credential !!!" });
    }

    let token = jwt.sign({
      userId: user._id
    }, process.env.SECREAT_KEY)

    return res.json({ message: "Login Succesfully", token, reqUser: user })
  } catch (error) {
    console.log(error);
    return res.json({ status: 500, message: 'Server Error' });
  }
}

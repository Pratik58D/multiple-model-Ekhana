const User = require("../models/userModel");
const Profile = require("../models/profilemodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const registerUser = async (req, res) => {
  const { email, name, password, role,phone_number } = req.body;
  if (!email || !password || !phone_number) {
    return res.status(400).json({ msg: "please enter the email, password and phone number" });
  }
  try {
    const user = await User.findOne({
      $or:[{ email: email },{phone_number: phone_number}]
      });
    if (user) {
      return res.status(400).json({ msg: "user already exits" });
    }
    const newUser = new User({
      email,
      name,
      password,
      role,
      phone_number
    });

    const newProfile = new Profile({
      user: newUser._id,
    });
    const response = await newUser.save();
    const profileResponse = await newProfile.save();

    return res.status(201).json({
      msg: "user registration sucessfull",
      user: response,
      profile: profileResponse,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "server error", error: err });
  }
};

//controller for user login
const loginUser = async (req, res) => {
  // 'emailOrPhone' is what the user enters (either email or phone number)
  const { emailOrPhone, password } = req.body;
  try {
    // Check if the user exists by email or phone number
    let user = await User.findOne({
      $or:[{email:emailOrPhone},{phone_number:emailOrPhone}]  });
    if (!user) {
      return res.status(400).json({ msg: "email or phone doesnot Found" });
    };
       // Compare the entered password with the stored password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "2h" },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          msg: "user logged in sucessfully",
          token: `${token}`,
          user: user,
        });
      }
    );
  } catch (error) {
    return res.status(400).json({ msg: "Unable to login", error });
  }
};

module.exports = { registerUser, loginUser };

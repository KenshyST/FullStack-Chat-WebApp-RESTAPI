import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    if (!fullname || !email || !password) {
      return res.status(400).send("All fields are required");
    }
    if (password.length < 6) {
      return res
        .status(400)
        .send("Password must be at least 6 characters long");
    }
    const alreadyCreatedUser = await User.findOne({ email });
    if (alreadyCreatedUser) {
      return res.status(400).send("Email already exists");
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname: fullname,
      email: email,
      password: hashPassword,
    });

    if (newUser) {
      //Generate JWT token here if needed
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).send({
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
      });

      await newUser.save();
      return res.status(201).send("User created successfully");
    } else {
      return res.status(500).send("Error creating user");
    }
  } catch (error) {}
  console.log("Error in signup controller: ", error.message);

  res.send("Signup Page");
  return res.status(500).send("Internal server error");
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid Credentials");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).send("Invalid Credentials");
    }
    generateToken(user._id, res);
    res.status(200).send({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller: ", error.message);
    return res.status(500).send("Internal server error");
  }
  res.send("Logout Page");
};
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).send("User logged out successfully");
  } catch (error) {
    console.log("Error in logout controller: ", error.message);
    return res.status(500).send("Internal server error");
  }
};

export const updateProfile = async (req, res) => {
  try {
    let { profilePic, fullname } = req.body;
    req.user._id; // Aqui ya tenemos el usuario autenticado gracias al middleware protectRoute
    const user = await User.findById({ _id: req.user._id });
    if (!profilePic) {
      profilePic = user.profilePic;
    }
    if (!fullname) {
      fullname = user.fullname;
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        profilePic: uploadResponse.secure_url,
        fullname,
      },
      { new: true }
    );
    res.status(200).send(updatedUser);
  } catch (error) {
    console.log("Error in updateProfile controller: ", error.message);
    return res.status(500).send("Internal server error");
  }
};

export const checkAuth = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }
    res.status(200).send({
      _id: req.user._id,
      fullname: req.user.fullname,
      email: req.user.email,
      profilePic: req.user.profilePic,
      createdAt: req.user.createdAt,
    });
  } catch (error) {
    console.log("Error in checkAuth controller: ", error.message);
    return res.status(500).send("Internal server error");
  }
};

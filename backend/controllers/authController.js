import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //validate input
    if (!username || !email || !password) {
      res.status(400).json({
        error: "All fields are required",
      });
    }

    //if username exist
    const usernameExist = await User.findOne({ username });
    if (usernameExist) {
      return res.status(400).json({
        error: "Username is not available",
      });
    }

    //if email is already registered
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(404).json({
        error: "Email is already registered",
      });
    }

    //else create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    //generateToken
    generateToken(createdUser._id, res);

    res.status(201).json({
      msg: "Registration succesful",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validate input
    if (!email || !password) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    //check if email is correct
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        error: "Incorrect email or password",
      });
    }

    //check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        error: "Incorrect email or password",
      });
    }

    //generate token
    generateToken(user._id, res);

    res.status(200).json({
      msg: "Login sucessful",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const logoutUser = (req, res) => {

  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({
    msg: "logout successful",
  });
};

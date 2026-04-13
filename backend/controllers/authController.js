import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  try {
    const { fullname, username, email, password } = req.body;

    //validate input
    if (!username || !email || !password) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    //if user exist

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({
          field: "email",
          error: "Email is already registered",
        });
      }
      if (existingUser.username === username) {
        return res.status(400).json({
          field: "username",
          error: "Username is not available",
        });
      }
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create new user
    const createdUser = await User.create({
      fullname,
      username,
      email,
      password: hashedPassword,
    });

    //generateToken
    generateToken(createdUser._id, res);

    //make password undefined before sending
    createdUser.password = undefined;

    res.status(201).json(createdUser);
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
        error: "Invalid email or password",
      });
    }

    //check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        error: "Invalid email or password",
      });
    }

    //generate token
    generateToken(user._id, res);

    //remove password before sending
    user.password = undefined;

    res.status(200).json(user);
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
    message: "logout successful",
  });
};

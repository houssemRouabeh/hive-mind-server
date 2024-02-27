import mongoose from "mongoose";
import { userModel } from "../../models/users/usersModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import CustomError from "../../utils/CustomError.js";
import asyncErrorHandler from "../../utils/asyncErrorHandler.js";

const signToken = (payloadToken) => {
  return jwt.sign(payloadToken, process.env.SECRET_KEY, {
    expiresIn: process.env.TOKEN_EXP,
  });
};

const register = asyncErrorHandler(async (req, res, next) => {
  // Check if the user with the given email already exists
  const existUser = await userModel.findOne({ email: req.body.email });

  if (existUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  if (req.body.role === "Admin") {
    return res.status(403).json({
      message: "You are not authorized to perform this action",
    });
  } else {
    // Save the new user
    const newUser = await userModel.create(req.body);
    const token = signToken({ id: newUser._id });

    // Return a response containing the access token and the refresh token
    res.status(201).json({
      status: "success",
      data: {
        Token: token,
        user: newUser,
      },
    }); // Use status code 201 for successful creation
  }
});

const login = asyncErrorHandler(async (req, res, next) => {
  // get credentials from request
  const email = req.body.email;
  const password = req.body.password;

  // Check if the user with the given email already exists
  const existUser = await userModel.findOne({ email }).select("+password");

  if (
    !existUser ||
    !(await existUser.comparePasswordFromDB(password, existUser.password))
  ) {
    return res
      .status(400)
      .json({ message: "Please provide a valid creddentials" });
  }

  // Return jsonwebtoken
  const token = jwt.sign({ id: existUser._id }, process.env.SECRET_KEY);
  res.status(200).json({
    status: "success",
    data: {
      Token: token,
      user: existUser,
    },
  });
});
const getUsers = asyncErrorHandler(async (req, res, next) => {
  // get credentials from request
  const email = req.body.email;
  const password = req.body.password;

  // Check if the user with the given email already exists
  const existUser = await userModel.findOne({ email }).select("+password");

  if (
    !existUser ||
    !(await existUser.comparePasswordFromDB(password, existUser.password))
  ) {
    return res
      .status(400)
      .json({ message: "Please provide a valid creddentials" });
  }

  // Return jsonwebtoken
  const token = jwt.sign({ id: existUser._id }, process.env.SECRET_KEY);
  res.status(200).json({
    status: "success",
    data: {
      Token: token,
      user: existUser,
    },
  });
});

export { register, login, getUsers };

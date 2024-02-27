import express from "express";
import {
  register,
  login,
} from "../../controllers/authController/usersController.js";

const rooter = express.Router();

rooter.route("/register").post(register);
rooter.route("/login").post(login);
export { rooter };

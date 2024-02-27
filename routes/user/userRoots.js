import express from "express";
import {
  getUsers,
  getUserById,
} from "../../controllers/authController/usersController.js";

const rooter = express.Router();

rooter.route("/").get(getUsers);

rooter.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

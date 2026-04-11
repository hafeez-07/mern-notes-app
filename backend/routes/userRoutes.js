import express from "express";
import { protect } from "../middlewares/protect.js";
import {
  deleteUser,
  getUser,
  updateUser,
  uploadImage,
} from "../controllers/userController.js";
import upload from "../middlewares/upload.js";
const router = express.Router();

router.get("/getUser", protect, getUser);
router.put("/updateUser", protect, updateUser);
router.post("/upload", protect, upload.single("profile"), uploadImage);
router.delete("/deleteUser", protect, deleteUser);

export default router;

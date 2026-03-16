import express from "express";
const router = express.Router();

import {
  addNote,
  deleteAllNotes,
  deleteNote,
  getAllNotes,
  getHome,
  getNote,
  updateNote,
} from "../controllers/notesController.js";
import { protect } from "../middlewares/protect.js";

router.get("/", getHome);
router.post("/add", protect, addNote);
router.put("/update/:id", protect, updateNote);
router.delete("/delete/:id", protect, deleteNote);
router.delete("/deleteAll", protect, deleteAllNotes);
router.get("/read", protect, getAllNotes);
router.get("/read/:id", protect, getNote);

export default router;

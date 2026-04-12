import Note from "../models/noteModel.js";

export const getHome = (req, res) => {
  res.status(200).json({
    message: "Api working",
  });
};

//add a notes
export const addNote = async (req, res) => {
  try {
    const { title, body } = req.body;

    if (!title || !body) {
      return res.status(400).json({
        error: "Both title and body is required",
      });
    }
    const newNote = await Note.create({
      title,
      body,
      userId: req.userId,
    });
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

//update notes

export const updateNote = async (req, res) => {
  try {
    const { title, body } = req.body;
    const { id } = req.params;

    if (!title || !body) {
      return res.status(400).json({
        error: "Both title and body is required",
      });
    }

    const updatedNote = await Note.findOneAndUpdate(
      { _id: id, userId: req.userId },
      {
        title,
        body,
      },
      { new: true },
    );

    if (!updatedNote) {
      return res.status(404).json({
        error: "Note not found",
      });
    }

    res.status(200).json(updatedNote);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

//delete notes

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findOneAndDelete({
      _id: id,
      userId: req.userId,
    });
    if (!deletedNote) {
      return res.status(404).json({
        error: "No note found",
      });
    }
    res.status(200).json({
      message: "successfully deleted",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

//clear all notes

export const deleteAllNotes = async (req, res) => {
  try {
    await Note.deleteMany({ userId: req.userId });
    res.status(200).json({
      message: "deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

//display all notes

export const getAllNotes = async (req, res) => {
  try {
    const allNotes = await Note.find({ userId: req.userId })
      .select("title body createdAt updatedAt ")
      .sort({ updatedAt: -1 });

    res.status(200).json(allNotes);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

//get single notes
export const getNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findOne({ _id: id, userId: req.userId }).select(
      "title body",
    );
    if (!note) {
      return res.status(404).json({
        error: "Note not found",
      });
    }
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

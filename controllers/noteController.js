const mongoose = require("mongoose");
const noteModel = require("../models/noteModel");
const userModel = require("../models/userModel");
//GET ALL BLOGS
exports.getAllNotesController = async (req, res) => {
  try {
    const notes = await noteModel.find({}).populate("user");
    if (!notes) {
      return res.status(200).send({
        success: false,
        message: "no notes found",
      });
    }
    return res.status(200).send({
      success: true,
      noteCount: notes.length,
      message: "all notes lists",
      notes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error while getting notes",
      error,
    });
  }
};
//Create Note
exports.createNoteController = async (req, res) => {
  try {
    const { title, description, user } = req.body;

    // Validation
    if (!title || !description || !user) {
      return res.status(400).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    const existingUser = await userModel.findById(user);

    // Validation
    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "Unable to find user",
      });
    }

    const newNote = new noteModel({ title, description, user });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newNote.save({ session });
    existingUser.notes.push(newNote);
    await existingUser.save({ session });
    await session.commitTransaction();
    await newNote.save();
    return res.status(201).send({
      success: true,
      message: "Note Created!",
      newNote,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Creating Note",
      error,
    });
  }
};

//update note
exports.updateNoteController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const note = await noteModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Note Updated",
      note,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error while updating note",
      error,
    });
  }
};

//single note
exports.getNoteByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await noteModel.findById(id);
    if (!note) {
      return res.status(404).send({
        success: false,
        message: "note not found with this id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "fetched single note",
      note,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error while getting single note",
      error,
    });
  }
};

//delete note
exports.deleteNoteController = async (req, res) => {
  try {
    const note = await noteModel
      .findByIdAndDelete(req.params.id)
      .populate("user");
    await note.user.notes.pull(note);
    await note.user.save();
    return res.status(200).send({
      success: true,
      message: "Note Deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error while deleting note",
      error,
    });
  }
};
//GET USER BLOG
exports.userNoteController = async (req, res) => {
  try {
    const userNote = await userModel.findById(req.params.id).populate("notes");
    if (!userNote) {
      return res.status(404).send({
        success: false,
        message: "notes not found with this id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "user notes",
      userNote,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error in user note",
      error,
    });
  }
};

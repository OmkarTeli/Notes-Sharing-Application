const express = require("express");
const {
  getAllNotesController,
  createNoteController,
  updateNoteController,
  getNoteByIdController,
  deleteNoteController,
  userNoteController,
} = require("../controllers/noteController");

//router object
const router = express.Router();

//router
//GET all blogs
router.get("/all-note", getAllNotesController);

//POST create blog
router.post("/create-note", createNoteController);

//PUT update blog
router.put("/update-note/:id", updateNoteController);

//GET single blog details
router.get("/get-note/:id", getNoteByIdController);

//DELETE delete blog
router.delete("/delete-note/:id", deleteNoteController);

//GET user blog
router.get("/user-note/:id", userNoteController);
module.exports = router;

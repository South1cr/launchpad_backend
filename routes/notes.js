const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const isAuthenticated = require("../middleware/isAuthenticated");

router.get("/", isAuthenticated, function (req, res, next) {
  const user = req.user._id;
  Note.find({ user })
    .then((notes) => {
      res.status(200).json(notes);
    })
    .catch((err) => {
      res.status(500).json({})
      console.log("Error in fetching notes", err);
    });
});

router.post("/create", isAuthenticated, function (req, res, next) {
  const { title, content } = req.body;
  const user = req.user._id;
  Note.create({
    title,
    content,
    user,
  })
    .then((note) => {
      res.status(200).json(note);
    })
    .catch((err) => {
      res.status(500).json({})
      console.log("Error in create note", err);
    });
});

router.get("/delete/:noteId", isAuthenticated, function (req, res, next) {
  const { noteId } = req.params;
  Note.findByIdAndDelete(noteId)
    .then((note) => {
      res.status(200).json(note);
    })
    .catch((err) => {
      res.status(500).json({})
      console.log("Error in create note", err);
    });
});

router.post("/:noteId", isAuthenticated, function (req, res, next) {
  const { noteId } = req.params;
  const { title, content } = req.body;
  Note.findByIdAndUpdate(noteId, {
    title,
    content,
  })
    .then((note) => {
      res.status(200).json(note);
    })
    .catch((err) => {
      res.status(500).json({})
      console.log("Error in update note", err);
    });
});

module.exports = router;

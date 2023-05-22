const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const Note = require("../models/Note");
const Share = require("../models/Share");
const isAuthenticated = require("../middleware/isAuthenticated");

router.post("/create", isAuthenticated, function (req, res, next) {
  const { noteId } = req.body;
  const user = req.user._id;
  Note.findOne({_id: noteId, user})
    .then((note) => {
        return Share.create({
            noteId: note._id,
          })
    })
    .then((share) => {
      res.status(200).json({ shareCode: share._id });
    })
    .catch((err) => {
      console.log("error in create share", err);
    });
});

router.get("/:shareId", function (req, res, next) {
    const { shareId } = req.params;
    
    Share.findById(shareId)
    .populate('noteId')
    .then((share) => {
        console.log(share);
        return Note.findById(share.noteId);
    })
    .then((note) => {
        res.status(200).json(note);
    })
    .catch((err) => {
        console.log('error in fetching share link', err);
    })
  });

module.exports = router;

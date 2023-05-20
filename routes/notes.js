const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const isAuthenticated = require("../middleware/isAuthenticated");

router.get('/', isAuthenticated, function(req, res, next) {
    const user = req.user._id;
    Note.find({user})
    .then((notes) => {
        res.status(200).json(notes);
    })
    .catch((err) => {
        console.log('Error in fetching notes', err);
    })
});

router.post('/create', isAuthenticated, function(req, res, next) {
  const { title, content } = req.body;
  const user = req.user._id;
  Note.create({
    title,
    content,
    user
  })
  .then((note) => {
    res.status(200).json(note);
  })
  .catch((err) => {
    console.log('Error in create note', err);
  })
});

module.exports = router;
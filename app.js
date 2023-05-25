const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const usersRouter = require('./routes/users');
const notesRouter = require('./routes/notes');
const shareRouter = require('./routes/share');

const app = express();

app.use(logger('dev'));
app.use(express.json({ limit: '500kb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('trust proxy', 1);
app.enable('trust proxy');


app.use(
    cors({
      origin: ['https://launchpad-notes.netlify.app/']  // <== URL of our future React app
    })
  );

app.use('/users', usersRouter);
app.use('/notes', notesRouter);
app.use('/share', shareRouter);

mongoose
  .connect(process.env.MONGODB_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });


module.exports = app;

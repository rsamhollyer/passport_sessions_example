const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const crypto = require('crypto');

// Package documentation - https://www.npmjs.com/package/connect-mongo
const MongoStore = require('connect-mongo')(session);
const routes = require('./routes');
const connection = require('./config/database');
// Need to require the entire Passport config module so app.js knows about it
require('./config/passport');

/**
 * -------------- GENERAL SETUP ----------------
 */

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require('dotenv').config();

// Create the Express application
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * -------------- SESSION SETUP ----------------
 */

const sessionStore = new MongoStore({
  mongooseConnection: connection,
  collection: 'sessions',
});

app.use(session, {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: { maxage: 24 * 60 * 60 * 1000 },
});

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */

app.use(passport.initialize());
app.use(passport.session());

/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
app.use(routes);

/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:3000
app.listen(3000);

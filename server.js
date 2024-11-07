const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('express-flash');
const logger = require('morgan');
const connectDB = require('./config/database');

// Import routes
const mainRoutes = require('./routes/main');
const todoRoutes = require('./routes/todos');

// Import environmental variables
require('dotenv').config({ path: './config/.env' });

//Passport config
require('./config/passport')(passport)

connectDB();

// Use middleware
app.set('view engine', 'ejs');
app.use(express.static('public')); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger('dev'));
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: process.env.MONGO_STRING })
    })
  )

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Routes
app.use('/', mainRoutes);
app.use('/todos', todoRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is now listening on port ${process.env.PORT}`);
});

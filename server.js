const express = require('express');
const app = express();

// Import environmental variables
require('dotenv').config({ path: './config/.env' });

// Use middleware
app.set('view engine', 'ejs');
app.use(express.static('public')); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.listen(process.env.PORT, () => {
  console.log(`Server is now listening on port ${process.env.PORT}`);
});

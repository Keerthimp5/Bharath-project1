const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Connect to MongoDB (Make sure to have MongoDB server running)
mongoose.connect('mongodb://localhost:27017/user_registration', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a user schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Create a new user
    const newUser = new User({ username, email, password });

    // Save the user to the database
    await newUser.save();

    res.send('Registration successful!');
  } catch (error) {
    res.status(500).send('Error during registration');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});


//npm install express mongoose body-parser
//node server.js


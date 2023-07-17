require('dotenv').config(); //import hidden dev credentials
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const { User } = require('./models/User');


// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require('./routes/user');
const rosterRoutes = require('./routes/roster');
const shiftsRoutes = require('./routes/shift');
app.use('/user', userRoutes);
app.use('/roster', rosterRoutes);
app.use('/shift', shiftsRoutes);

// Sample Route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Connect to MongoDB Atlas
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@rostettrack.jwdl48x.mongodb.net/`, 
{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Connected to MongoDB Atlas');
    // Start the server after successful MongoDB connection
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });


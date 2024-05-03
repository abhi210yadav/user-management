const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const { isDate } = require('util/types');
const { format } = require('path');
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes
// Connect to MongoDB
mongoose.connect('mongodb://localhost/mydatabase', {
 useNewUrlParser: true,
 useUnifiedTopology: true
});
 
// Define mongoose schema and model
const formDataSchema = new mongoose.Schema({
    name:String,
    password:String,
    email:String,
    department:String,
    company:String,
    dob:Date
 
});
const FormData = mongoose.model('UserData', formDataSchema);
app.post('/login', (req, res) => {
    // Validate user credentials (e.g., check username and password)
    // Return appropriate response (success or error)
    // Example: res.json({ success: true, message: 'Login successful' });
  });
  
 

// Route to handle form data submission
app.post('/api/formdata', async (req, res) => {
 try {
  console.log('server',req.body);
   const formData = new FormData(req.body);
   await formData.save();
   const userId=formData._id;
   res.status(200).json({userId});
 } catch (error) {
   res.status(500).json({ error: 'Internal server error' });
 }
});
app.get('/api/formdata', async (req, res) => {
    try {
      const tickets = await FormData.find();
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching books' });
    }
});
 
  // In your Express route handler
  app.get('/user/:email', (req, res) => {
    try{
        const emailIn = req.params.email;
        console.log(email,"Node filw");
        UserData.findOne({emailIn}, (err, user) => {
        if (err) {
          return res.status(500).json({ error: 'Error fetching user data' });
        }
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        // Return user data (e.g., user.username, user.profile, etc.)
        res.json(user);
      });
 

    }catch (error){
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
    
});
 
// Start the server
app.listen(port, () => {
 console.log(`Server is running on port ${port}`);
});
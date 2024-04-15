// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors= require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors())

mongoose.connect('mongodb+srv://hasan:Rooney@cluster0.eyspmtj.mongodb.net/formdb?retryWrites=true&w=majority&appName=Cluster0', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    mongoose.connection.on('connected', () => {
        console.log('mongodb connected successfully')
    })
    mongoose.connection.on('error', (err) => {
        console.log('mongodb connected Failed')
    })

const messageSchema = new mongoose.Schema({
  name: String,
  subject: String,
  email: String,
  message: String,
});

const Message = mongoose.model('Message', messageSchema);

app.post('/api/messages', async (req, res) => {
  try {
    const newMessage = new Message({
      name: req.body.name,
      subject: req.body.subject,
      email: req.body.email,
      message: req.body.message,
    });

   
    await newMessage.save();

    
    res.status(201).json({ message: 'Message saved successfully' });
  } catch (error) {
   
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/messages', async (req, res) => {
    try {
      // Retrieve all messages from the MongoDB database
      const messages = await Message.find();
  
      // Respond with the retrieved messages
      res.status(200).json(messages);
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;
const mongoUrl = process.env.MONGO_URL

// Middleware to parse JSON
app.use(express.json());
app.use(express.static('public'));  // Serve static files from the 'public' directory
// MongoDB Connection
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Mongoose Schema for Task
const taskSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

const Task = mongoose.model('Task', taskSchema);

// Get all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new task
app.post('/tasks', async (req, res) => {
  const taskName = req.body.task;
  if (!taskName) {
    return res.status(400).json({ message: 'Task is required' });
  }

  const newTask = new Task({ name: taskName });

  try {
    await newTask.save();
    res.status(201).json({ message: 'Task added successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
  const taskId = req.params.id;

  try {
    await Task.findByIdAndDelete(taskId);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

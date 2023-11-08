import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
const json = bodyParser.json;

mongoose.connect('mongodb+srv://J4kub:Xva49ucx@cluster0.dvzorzl.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const eventSchema = new mongoose.Schema({
  date: String,
  title: String,
  description: String,
});

const Event = mongoose.model('Event', eventSchema);

const app = express();
app.use(cors());
app.use(json()); 

app.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/events', async (req, res) => {
  const event = new Event({
    date: req.body.date,
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import mongoose from 'mongoose';

const JokeSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['unmoderated', 'approved'],
    default: 'unmoderated',
  },
});

export default mongoose.models.Joke || mongoose.model('Joke', JokeSchema);

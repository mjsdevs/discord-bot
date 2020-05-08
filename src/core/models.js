import mongoose from 'mongoose';

const RegisterSchema = new mongoose.Schema({
  title: String,
  url: String,
  tags: [String],
});

export default mongoose.model('Register', RegisterSchema);

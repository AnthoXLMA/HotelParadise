// backend/models/CheckIn.js
import mongoose from 'mongoose';

const checkInSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  bookingNumber: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const CheckIn = mongoose.model('CheckIn', checkInSchema);

export default CheckIn;

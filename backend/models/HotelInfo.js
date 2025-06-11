const mongoose = require('mongoose');

const hotelInfoSchema = new mongoose.Schema({
  openingHours: String,
  services: [String],
  contacts: {
    phone: String,
    email: String,
    address: String
  },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HotelInfo', hotelInfoSchema);

import mongoose from 'mongoose';

const hotelInfoSchema = new mongoose.Schema({
  openingHours: String,
  services: [String],
  contacts: {
    phone: String,
    email: String,
    address: String
  },
  section: { type: String, required: true },
  content: { type: String, required: true },
  hotelId: String,
  horaires: {
    checkin: String,
    checkout: String,
    reception: String,
  },
  wifi: {
    networkName: String,
    password: String,
  },
  numerosUtiles: [String],
  taxiDestinations: [
    {
      from: String,
      to: String,
    }
  ],
  menusRestaurants: [
    {
      title: String,
      url: String,
    }
  ],
  cartesSoins: [
    {
      title: String,
      url: String,
    }
  ],
  infosLocales: {
    busHoraires: String,
    acces: String,
    evenements: [String],
  },
  updatedAt: { type: Date, default: Date.now }
});

const HotelInfo = mongoose.model('HotelInfo', hotelInfoSchema);

export default HotelInfo;

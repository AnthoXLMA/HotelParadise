const mongoose = require('mongoose');

const conciergeRequestSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  requestType: { type: String, required: true }, // ex: taxi, restaurant, ménage
  description: String,
  status: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

module.exports = mongoose.model('ConciergeRequest', conciergeRequestSchema);

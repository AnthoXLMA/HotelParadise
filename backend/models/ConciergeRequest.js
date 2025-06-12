import mongoose from 'mongoose';

const conciergeRequestSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  service: { type: String, required: true },
  details: { type: String, required: true },
  status: { type: String, default: 'En attente' },
  createdAt: { type: Date, default: Date.now },
});

const ConciergeRequest = mongoose.model('ConciergeRequest', conciergeRequestSchema);

export default ConciergeRequest;

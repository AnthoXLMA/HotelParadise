import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const hotelierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hotelName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

// Hash du mot de passe avant sauvegarde
hotelierSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Méthode de comparaison de mot de passe
hotelierSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const Hotelier = mongoose.model('Hotelier', hotelierSchema);
export default Hotelier;

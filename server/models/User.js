import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nom: { type: String, required: true  },
  prenom: { type: String, required: true },
  telephone: { type: String, required: true },
  login: { type: String, required: true, unique: true },
  password: { type: String},
  role: {
    type: String,
    enum: ['author', 'admin'],
    default: 'author',
  },
  statut: {
    type: String,
    enum: ['EA', 'V'],
    default: 'EA',
  },
  ref: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Publication', // Assuming "Publication" is the referenced model
    required: false,
  }],
});
  
const User = mongoose.model('User', userSchema);
export default User;

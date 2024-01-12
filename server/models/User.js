import mongoose from 'mongoose';
// import Joi from 'joi';
// import mongooseIdValidator from 'mongoose-id-validator';
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
// userSchema.plugin(mongooseIdValidator);
//   // Joi validation schema
// const userValidationSchema = Joi.object({
//     email: Joi.string().email().required(),
//     // other fields...
//   });
//   // Validate the user data before saving
// userSchema.pre('save', async function (next) {
//     try {
//       await userValidationSchema.validateAsync(this.toObject());
//       next();
//     } catch (error) {
//       next(error);
//     }
//   }
//   );
  
const User = mongoose.model('User', userSchema);
export default User;

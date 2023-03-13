import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';

// Schema of User document
const userSchema = new mongoose.Schema({
  // Field's
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
  },
  birthDate: Date,
  city: String,
  country: String,
  email: {
    type: String,
    required: [true, 'E-mail is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  active: {
    type: Boolean,
    default: true,
  },
});

// userSchema.methods.validatePassword = async function (
//   candidatePassword: string,
//   userPassword: string
// ) {
//   return await bcrypt.compare(candidatePassword, userPassword);
// };

// Export Schema to create a Model
const userModel = mongoose.model('User', userSchema);

export default userModel;

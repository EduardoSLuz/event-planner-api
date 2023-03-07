import mongoose from 'mongoose';

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
  confirmPassword: {
    type: String,
    required: [true, 'Confirm Password is required'],
  },
});

// Export Schema to create a Model
const userModel = mongoose.model('User', userSchema);

export default userModel;

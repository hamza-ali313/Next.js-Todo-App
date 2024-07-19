"use server" 
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGO) {
      throw new Error('MongoDB connection string is missing in environment variables.');
    }
    await mongoose.connect(process.env.MONGO, { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    /// to connect with the database I need to make this component server component
    console.log('Connected to MongoDB successfully wow!');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
};

export default connectDB;

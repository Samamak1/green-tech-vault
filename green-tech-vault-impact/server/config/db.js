const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use MongoDB Atlas connection string directly if environment variable is not available
    const mongoURI = process.env.MONGODB_URI || 
      'mongodb+srv://greentechuser:greentechpassword@cluster0.mongodb.net/green-tech-vault?retryWrites=true&w=majority';

    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB; 
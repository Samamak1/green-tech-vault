const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use MongoDB Atlas connection string directly if environment variable is not available
    const mongoURI = process.env.MONGODB_URI || 
      'mongodb+srv://greentechuser:greentechpassword@cluster0.mongodb.net/green-tech-vault?retryWrites=true&w=majority';

    // Set the MongoDB connection options with retries and timeout
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // 30 seconds
      socketTimeoutMS: 45000, // 45 seconds
      connectTimeoutMS: 30000, // 30 seconds
      keepAlive: true,
      keepAliveInitialDelay: 300000, // 5 minutes
      maxPoolSize: 10 // Limit max connections
    };

    // Connect to MongoDB with improved error handling
    const conn = await mongoose.connect(mongoURI, options);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Set up connection error handlers
    mongoose.connection.on('error', err => {
      console.error(`MongoDB connection error: ${err.message}`);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected, attempting to reconnect...');
    });
    
    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected successfully');
    });

    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // No process.exit(1) here - let the caller handle the error
    throw error; // Re-throw to allow the caller to handle the error
  }
};

module.exports = connectDB; 
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Check if we're in production mode
    if (process.env.NODE_ENV === 'production') {
      // For production, use the real MongoDB connection
      const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://greentechuser:greentechpassword@cluster0.mongodb.net/green-tech-vault?retryWrites=true&w=majority';
      
      const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 45000,
        connectTimeoutMS: 30000
      };
      
      const conn = await mongoose.connect(mongoURI, options);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return conn;
    } else {
      // For development, use the mock connection
      console.log('Using mock database connection for development');
      return true;
    }
  } catch (error) {
    console.error(`Error connecting to database: ${error.message}`);
    // Don't crash on DB connection failure
    return false;
  }
};

module.exports = connectDB; 
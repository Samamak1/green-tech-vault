const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // For demo/development purposes, we'll use a mock connection
    console.log('Using mock database connection for development');
    return true;

    // Uncomment this for real MongoDB connection
    /*
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
    */
  } catch (error) {
    console.error(`Error connecting to database: ${error.message}`);
    // Don't crash on DB connection failure
    return false;
  }
};

module.exports = connectDB; 
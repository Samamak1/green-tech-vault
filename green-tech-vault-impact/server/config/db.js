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
        serverSelectionTimeoutMS: 30000, // Timeout after 30s instead of 30s
        socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
        connectTimeoutMS: 30000, // Give up initial connection after 30s
        maxPoolSize: 10, // Maintain up to 10 socket connections
        minPoolSize: 5, // Maintain a minimum of 5 socket connections
        maxIdleTimeMS: 30000, // Close connections after 30s of inactivity
        bufferMaxEntries: 0, // Disable mongoose buffering
        bufferCommands: false, // Disable mongoose buffering
        heartbeatFrequencyMS: 10000, // Send a ping every 10s to keep connection alive
        retryWrites: true,
        retryReads: true
      };
      
      console.log('🔄 Attempting to connect to MongoDB...');
      
      const conn = await mongoose.connect(mongoURI, options);
      
      // Set up connection event listeners
      mongoose.connection.on('connected', () => {
        console.log('✅ MongoDB connected successfully');
      });
      
      mongoose.connection.on('error', (err) => {
        console.error('❌ MongoDB connection error:', err);
      });
      
      mongoose.connection.on('disconnected', () => {
        console.warn('⚠️ MongoDB disconnected. Attempting to reconnect...');
      });
      
      mongoose.connection.on('reconnected', () => {
        console.log('🔄 MongoDB reconnected');
      });
      
      // Handle process termination
      process.on('SIGINT', async () => {
        try {
          await mongoose.connection.close();
          console.log('✅ MongoDB connection closed through app termination');
          process.exit(0);
        } catch (err) {
          console.error('❌ Error closing MongoDB connection:', err);
          process.exit(1);
        }
      });
      
      console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
      return conn;
    } else {
      // For development, use the mock connection
      console.log('🔧 Using mock database connection for development');
      return true;
    }
  } catch (error) {
    console.error(`❌ Error connecting to database: ${error.message}`);
    
    // In production, try to continue without database - some features may be limited
    if (process.env.NODE_ENV === 'production') {
      console.warn('⚠️ Continuing without database connection - some features may be limited');
      return false;
    } else {
      // In development, you might want to see the full error
      console.error('Full error:', error);
      throw error;
    }
  }
};

module.exports = connectDB; 
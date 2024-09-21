//File created by Bryce Bacon on 21/09/2024 , Chatgpt used for commenting code.

// Importing the Mongoose library for MongoDB object modeling
const mongoose = require("mongoose");

// Loading environment variables from a .env file
require("dotenv").config();

// Asynchronous function to establish a connection to the MongoDB database
const connectDB = async () => {
  try {
    // Attempting to connect to MongoDB using the connection string stored in environment variables
    await mongoose.connect(process.env.MONGODB_URI);

    // If the connection is successful, log a message to the console
    console.log("MongoDB connected successfully");
  } catch (error) {
    // If there's an error during connection, log the error message and exit the process with a failure code (1)
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exiting the process with a failure status
  }
};

// Exporting the connectDB function so it can be used in other parts of the application
module.exports = connectDB;

//Created by Bryce Bacon on 21/09/2024
// Importing the Mongoose library for MongoDB object modeling
const mongoose = require("mongoose");

// Defining a new schema for the User model
// This schema represents the structure of documents in the "User" collection
const userSchema = new mongoose.Schema({
  // Field to store the user's email address
  email: {
    type: String, // Data type is string
    required: true, // This field is mandatory
    unique: true, // Ensures that each email address is unique in the collection
    trim: true, // Trims whitespace from both ends of the email string
    lowercase: true, // Converts the email to lowercase for consistent formatting
  },
  // Field to store the date when the user was created
  createdAt: {
    type: Date, // Data type is Date
    default: Date.now, // Sets the default value to the current date and time
  },
});

// Placeholder comment: Add any custom methods or static methods to the schema if needed later

// Creating the Mongoose model from the schema, allowing interaction with the "User" collection
const User = mongoose.model("User", userSchema);

// Exporting the model so it can be used in other parts of the application
module.exports = User;

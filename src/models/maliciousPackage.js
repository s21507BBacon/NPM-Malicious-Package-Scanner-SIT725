//File created by Bryce Bacon on 21/09/2024
// Importing the Mongoose library to define MongoDB schemas and models
const mongoose = require("mongoose");

// Defining a new schema for the MaliciousPackage model
// This schema represents the structure of the documents in the "MaliciousPackage" collection
const maliciousPackageSchema = new mongoose.Schema({
  // Field to store the name of the malicious package
  packageName: {
    type: String, // Data type is string
    required: true, // This field is mandatory
    unique: true, // Ensures that each packageName is unique in the collection
    trim: true, // Trims whitespace from both ends of the string
  },
  // Field to store the version of the malicious package
  version: {
    type: String, // Data type is string
    trim: true, // Trims whitespace from both ends of the string
  },
  // Field to store the description of the malicious package
  description: {
    type: String, // Data type is string
    trim: true, // Trims whitespace from both ends of the string
  },
  // Field to store the user who reported the malicious package
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId, // Stores the ObjectId of a related document (a user)
    ref: "User", // References the "User" collection (the user who reported the package)
    required: true, // This field is mandatory
  },
  // Field to store the date and time when the package was reported
  reportedAt: {
    type: Date, // Data type is Date
    required: true, // This field is mandatory
    default: Date.now, // Sets the default value to the current date and time
  },
});

// Placeholder comment: Add any custom methods or static methods to the schema if needed later

// Creating the Mongoose model from the schema, allowing interaction with the "MaliciousPackage" collection
const MaliciousPackage = mongoose.model(
  "MaliciousPackage",
  maliciousPackageSchema
);

// Exporting the model so it can be used in other parts of the application
module.exports = MaliciousPackage;

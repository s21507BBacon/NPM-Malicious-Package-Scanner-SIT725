//File created by Bryce Bacon on 21/09/2024
// Importing the Mongoose library for MongoDB object modeling
const mongoose = require("mongoose");

// Defining a new schema for the Repository model
// This schema represents the structure of documents in the "Repository" collection
const repositorySchema = new mongoose.Schema({
  // Field to store the user ID that owns the repository
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Stores the ObjectId of a related document (a user)
    ref: "User", // References the "User" collection
    required: true, // This field is mandatory
  },
  // Field to store the name of the GitHub repository
  repositoryName: {
    type: String, // Data type is string
    required: true, // This field is mandatory
    trim: true, // Trims whitespace from both ends of the string
  },
  // Field to store the GitHub URL of the repository
  githubUrl: {
    type: String, // Data type is string
    required: true, // This field is mandatory
    trim: true, // Trims whitespace from both ends of the string
    unique: true, // Ensures that each GitHub URL is unique
  },
  // Field to store the date when the repository was last scanned for threats
  lastScanned: {
    type: Date, // Data type is Date
  },
  // Array field to store multiple scan results for the repository
  scanResults: [
    {
      // Field to store the date of the scan
      scanDate: {
        type: Date, // Data type is Date
        required: true, // This field is mandatory
      },
      // Field to indicate whether a threat was detected in the scan
      threatDetected: {
        type: Boolean, // Data type is Boolean (true/false)
        required: true, // This field is mandatory
      },
      // Array field to store any threats (malicious packages) detected during the scan
      detectedThreats: [
        {
          type: mongoose.Schema.Types.ObjectId, // Stores the ObjectId of a related document (a malicious package)
          ref: "MaliciousPackage", // References the "MaliciousPackage" collection
        },
      ],
    },
  ],
});

// Placeholder comment: Add any custom methods or static methods to the schema if needed later

// Creating the Mongoose model from the schema, allowing interaction with the "Repository" collection
const Repository = mongoose.model("Repository", repositorySchema);

// Exporting the model so it can be used in other parts of the application
module.exports = Repository;

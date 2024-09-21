// File created by Bryce Bacon on 21/09/2024
// Importing the Mongoose library for MongoDB object modeling
const mongoose = require("mongoose");

// Defining a new schema for the WeeklyUpdate model
// This schema represents the structure of documents in the "WeeklyUpdate" collection
const weeklyUpdateSchema = new mongoose.Schema({
  // Field to store the date when the weekly update was sent
  sentDate: {
    type: Date, // Data type is Date
    required: true, // This field is mandatory
  },
  // Field to store a brief summary of the weekly update's content
  contentSummary: {
    type: String, // Data type is string
    required: true, // This field is mandatory
    trim: true, // Trims whitespace from both ends of the string
  },
  // Array field to store the email addresses of recipients
  recipients: [
    {
      type: String, // Data type is string
      required: true, // This field is mandatory
      trim: true, // Trims whitespace from both ends of the string
      lowercase: true, // Converts the string to lowercase for consistent email formatting
    },
  ],
});

// Placeholder comment: Add any custom methods or static methods to the schema if needed later

// Creating the Mongoose model from the schema, allowing interaction with the "WeeklyUpdate" collection
const WeeklyUpdate = mongoose.model("WeeklyUpdate", weeklyUpdateSchema);

// Exporting the model so it can be used in other parts of the application
module.exports = WeeklyUpdate;

const express = require('express');
const path = require('path'); 
const bodyParser = require('body-parser');
const repoController = require('./src/controllers/repoController');
const adminController = require('./src/controllers/adminController'); 
const connectDB = require("./src/config/database");
const initialiseDatabase = require("./src/config/dbInit");
require("dotenv").config();

const app = express();

//views dir
app.set('views', path.join(__dirname, 'src', 'views'));  // Set path to views folder
app.set('view engine', 'index.ejs'); // Ensure view engine is set to ejs

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'src', 'public'))); // Set static folder
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// TODO: Add your routes here, for example:
// app.use('/api/repositories', require('./src/routes/repositoryRoutes'));
// app.use('/api/scans', require('./src/routes/scanRoutes'));

app.get('/src/controllers', repoController.getHomePage);
app.post('/src/controllers', repoController.uploadRepoAddress);

app.get('/src/controllers', adminController.getAdminPage);
app.post('/src/controllers', adminController.addMaliciousPackage);

// Basic route for testing
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the NPM Malicious Package Scanner API" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  console.error("Stack:", err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Initialise database (create collections if they don't exist)
    await initialiseDatabase();

    app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    console.error("Full error:", error);
    process.exit(1);
  }
};

startServer();

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.error("Unhandled Rejection:", err.message);
  console.error("Full error:", err);
  // Close server & exit process
  process.exit(1);
});

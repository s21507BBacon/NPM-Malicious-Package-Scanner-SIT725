const express = require('express');
const path = require('path'); 
const bodyParser = require('body-parser');
const repoController = require('./src/controllers/repoController');
const adminController = require('./src/controllers/adminController'); 
const connectDB = require("./src/config/database");
const initialiseDatabase = require("./src/config/dbInit");
require("dotenv").config();

const app = express();

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'src', 'public')));

// Parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', repoController.getHomePage);  // Homepage route
app.post('/uploadRepo', repoController.uploadRepoAddress);  // Upload repo route

app.get('/admin', adminController.getAdminPage);  // Admin page route
app.post('/admin/add', adminController.addMaliciousPackage);  // Add malicious package

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Welcome to the NPM Malicious Package Scanner API" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    // Initialize database
    await initialiseDatabase();
    
    app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.error("Unhandled Rejection:", err.message);
  process.exit(1);
});

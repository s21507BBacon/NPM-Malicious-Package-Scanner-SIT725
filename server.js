const express = require('express');
const path = require('path'); 
const bodyParser = require('body-parser');
const repoRoutes = require('./src/routes/repoRoutes');  // Repository routes
const weeklyUpdateRoutes = require('./src/routes/weeklyUpdateRoutes')
const repoController = require('./src/controllers/repoController');
const adminController = require('./src/controllers/adminController'); 
const connectDB = require("./src/config/database");
const initialiseDatabase = require("./src/config/dbInit");
const gitRoutes = require('./src/routes/gitRoutes');
require("dotenv").config();
const cron = require('node-cron'); 


const app = express();

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
// app.get('/view', (req, res) => {
//   res.render('view', { maliciousPackages:[] }); // Render the 'view.ejs' file
// });
// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'src', 'public')));

// Parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', repoController.getHomePage); // repoController.getHomePage should be a valid function
app.post('/uploadRepo', repoController.uploadRepoAddress);  // Upload repo route

app.get('/admin', adminController.getAdminPage); // adminController.getAdminPage should be defined
app.post('/admin/add', adminController.addMaliciousPackage);  // Add malicious package

// Use repository routes
app.use('/api/repositories', repoRoutes);

// Use weekly update routes
app.use('/api/weekly-update', weeklyUpdateRoutes);
// Middleware to parse incoming JSON requests
app.use(express.json());

// Use the git routes
app.use('/api', gitRoutes);
// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Welcome to the NPM Malicious Package Scanner API" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).send("Something broke!");
});

// Optional: Set up a cron job to automatically send weekly updates every Sunday at midnight
const weeklyUpdateController = require('./src/controllers/weeklyUpdateController');
cron.schedule('0 0 * * 0', () => {
  console.log('Running scheduled weekly update...');
  weeklyUpdateController.sendWeeklyUpdate();
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

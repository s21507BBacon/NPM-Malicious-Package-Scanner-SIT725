// File: controllers/maliciousController.js
const MaliciousPackage = require('../models/maliciousPackage');

// app.get('/view', (req, res) => {
//     res.render('view', { maliciousPackages:[] }); // Render the 'view.ejs' file
//   });
exports.getViewPage = (req, res) => {
    res.render('view', { maliciousPackages });
};
// Controller to get all malicious packages
exports.getAllMaliciousPackages = async (req, res) => {
    try {
        // Fetch all malicious packages from the database
        const maliciousPackages = await MaliciousPackage.find();
        
        // Send the list of packages as a JSON response
        res.status(200).json({
            success: true,
            data: maliciousPackages,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

//const MaliciousPackage = require('../models/maliciousPackage');

// Controller to search for a malicious package by name
exports.searchMaliciousPackageByName = async (req, res) => {
    const { name } = req.query; // Get the package name from query parameters

    if (!name) {
        return res.status(400).json({
            success: false,
            message: 'Package name is required.',
        });
    }

    try {
        // Fetch malicious packages that match the name (case insensitive)
        const filteredPackages = await MaliciousPackage.find({
            name: { $regex: new RegExp(name, 'i') } // Use regex for case-insensitive search
        });

        if (filteredPackages.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No malicious packages found with that name.',
            });
        }

        res.status(200).json({
            success: true,
            data: filteredPackages,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

// Controller function to check for malicious packages using POST request
exports.searchMaliciousPackagesByNames = async (req, res) => {
    const { packages } = req.body;  // Extract the package names from the request body

    try {
        if (!packages || packages.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No package names provided',
            });
        }

        // Find packages that match the provided package names
        const maliciousPackages = await MaliciousPackage.find({ packageName: { $in: packages } });

        res.status(200).json({
            success: true,
            data: maliciousPackages,
        });
    } catch (error) {
        console.error('Error fetching malicious packages:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching malicious packages',
        });
    }
};

// Controller to delete a package by its name
exports.deletePackageByName = async (req, res) => {
    const { packageName } = req.params;
  
    try {
      // Find and delete the package by its name
      const deletedPackage = await MaliciousPackage.findOneAndDelete({ packageName });
  
      if (deletedPackage) {
        return res.status(200).json({ message: `Package '${packageName}' was successfully deleted.`, package: deletedPackage });
      } else {
        return res.status(404).json({ message: `Package '${packageName}' not found.` });
      }
    } catch (error) {
      console.error(`Error deleting package '${packageName}':`, error.message);
      return res.status(500).json({ message: 'Error deleting package.', error: error.message });
    }
  };
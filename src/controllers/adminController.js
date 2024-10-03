let maliciousPackages = []; // Temporary storage for the package names
const MaliciousPackage = require('../models/maliciousPackage');
//const MaliciousPackage = require('../../scripts/fetchpackage');


// Render the admin page
exports.getAdminPage = (req, res) => {
    res.render('../views/admin', { maliciousPackages });
};

// Handle form submission to add a new malicious package and redirect to the same page
exports.addMaliciousPackage = async (req, res) => {
    const packageName = req.body.packageName;

    if (packageName && !maliciousPackages.includes(packageName)) {
        maliciousPackages.push(packageName); // Add the package name to the list
    }

    try {
        // Validate if package name exists
        if (!packageName) {
            return res.status(400).json({ error: 'Package name is required' });
        }

        // Save to DB
        const newMaliciousPackage = new MaliciousPackage({ packageName });
        await newMaliciousPackage.save();
        
        // Redirect to the same page after successful addition
        return res.redirect('/admin'); // This will redirect back to the admin page

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

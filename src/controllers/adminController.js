let maliciousPackages = []; // Temporary storage for the package names

// Render the admin page
exports.getAdminPage = (req, res) => {
    res.render('./views/admin', { maliciousPackages });
};

// Handle form submission to add a new malicious package
exports.addMaliciousPackage = (req, res) => {
    const packageName = req.body.packageName;

    if (packageName && !maliciousPackages.includes(packageName)) {
        maliciousPackages.push(packageName); // Add the package name to the list
    }

    res.redirect('./views/admin'); // Redirect back to the admin page after submission
};
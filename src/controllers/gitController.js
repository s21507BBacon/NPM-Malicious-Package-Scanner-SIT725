// controllers/gitController.js
const { mongo } = require('mongoose');
const MaliciousPackage = require('../models/maliciousPackage');
const { fetchPackageJson } = require('../../scripts/fetchpackage');
const { getAllMaliciousPackages } = require('./maliciousController');


async function getPackageJsonUpdates(req, res) {
  const { repoAddress, repoType, repoKey } = req.body;  // Destructure the new data object

  // Validate the input
  if (!repoAddress || !repoType) {
    return res.status(400).json({ error: 'repoAddress and repoType are required.' });
  }

  // Check for repoKey only if the repoType is private
  if (repoType === 'private' && !repoKey) {
    return res.status(400).json({ error: 'repoKey is required for private repositories.' });
  }

  try {
    // Pass the repoAddress (repoUrl) and repoKey (token) to the model function
    const result = await fetchPackageJson(repoAddress, repoKey);
    //const dependencies = packageJson.dependencies || {};
    if (result) {
       
      //const matchedDependencies = filterDependencies( result);
      return res.status(200).json({
        message: 'package.json fetched successfully.',
        packageJson: Object.keys(result.dependencies),
       //packageJson: matchedDependencies,
       // maliciouspackage:matchedDependencies  // Send the content of the file in the response
      });
    } else {
      return res.status(200).json({ message: 'No updates found in package.json.' });
    }
  } catch (error) {
    console.error('Error fetching package.json updates:', error);
    return res.status(500).json({ error: 'An error occurred while fetching package.json updates.' });
  }
}

module.exports = {
  getPackageJsonUpdates,
};

// src/services/scanService.js
const simpleGit = require('simple-git');
const fs = require('fs').promises;
const path = require('path');
const MaliciousPackage = require('../models/maliciousPackage'); // Assuming you have a list of malicious packages

const git = simpleGit(); // Initialize simple-git

// Function to scan a repository for malicious packages
exports.scanRepository = async (repoUrl) => {
  try {
    // Clone the repository to a temporary folder
    const repoName = repoUrl.split('/').pop();
    const repoPath = path.join(__dirname, '../../tmp', repoName);

    await git.clone(repoUrl, repoPath);

    // Check if package.json exists in the repository
    const packageJsonPath = path.join(repoPath, 'package.json');
    const packageJsonExists = await fs.access(packageJsonPath).then(() => true).catch(() => false);

    if (!packageJsonExists) {
      throw new Error('No package.json found in the repository.');
    }

    // Read the package.json file
    const packageJsonContent = await fs.readFile(packageJsonPath, 'utf8');
    const packageJson = JSON.parse(packageJsonContent);
    const dependencies = Object.keys(packageJson.dependencies || {});

    // Get the list of malicious packages from the database
    const maliciousPackages = await MaliciousPackage.find({});

    // Compare the repo's dependencies with the malicious package list
    const detectedThreats = maliciousPackages.filter((pkg) => dependencies.includes(pkg.packageName));

    // Clean up: remove the cloned repository
    await fs.rm(repoPath, { recursive: true, force: true });

    return {
      repositoryName: repoName,
      detectedThreats,
      scanDate: new Date(),
      threatDetected: detectedThreats.length > 0,
    };
  } catch (error) {
    console.error('Error scanning repository:', error);
    throw error;
  }
};

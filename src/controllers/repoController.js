const Repo = require('../models/repository');
const scanService = require('../services/scanService'); // Service that handles the scanning logic

exports.getHomePage = (req, res) => {
  res.render('index', { message: null });
};

exports.uploadRepoAddress = async (req, res) => {
  try {
    const { repoAddress } = req.body;

    if (!repoAddress) {
      return res.status(400).json({ error: 'Repository URL is required.' });
    }

    // Create a new repository entry in the database
    const newRepo = new Repo({
      repositoryName: repoAddress.split('/').pop(), // Extract repo name
      githubUrl: repoAddress,
      userId: req.user.id, // Assuming user is logged in
    });

    await newRepo.save();

    // Trigger the scanning service to scan the repository
    const scanResults = await scanService.scanRepository(repoAddress);

    // Update the repository with scan results
    newRepo.scanResults.push(scanResults);
    newRepo.lastScanned = new Date();
    await newRepo.save();

    return res.status(200).json({
      message: 'Repository scanned successfully!',
      results: scanResults,
    });
  } catch (error) {
    console.error('Error uploading repository:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

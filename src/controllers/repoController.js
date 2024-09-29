const Repo = require('../models/repo');

exports.getHomePage = (req, res) => {
  res.render('index', { message: null }); // Ensure message is always passed
};
exports.uploadRepoAddress = (req, res) => {
  const repoAddress = req.body.repoAddress;
  const repoType = req.body.repoType;
  const repoKey = req.body.repoKey || '';

  const newRepo = new Repo(repoAddress, repoType, repoKey);
  console.log('Uploaded Repo:', newRepo);

  res.render('index', { message: 'Repository uploaded successfully!' });
};
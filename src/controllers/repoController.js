const Repo = require('../models/repo');

exports.getHomePage = (req, res) => {
  res.render('index', { message: null }); // Ensure message is passed
};

exports.uploadRepoAddress = (req, res) => {
  const repoAddress = req.body.repoAddress;
  const repoType = req.body.repoType;
  const repoKey = req.body.repoKey || '';

  const newRepo = new Repo(repoAddress, repoType, repoKey);
  console.log('Uploaded Repo:', newRepo);

  // Render the index page and pass the success message
  res.render('index', { message: 'Repository uploaded successfully!' });
};

// const axios = require('axios');

// /**
//  * Extracts the owner and repository name from the full repository URL.
//  * @param {string} repoUrl - The full URL of the GitHub repository.
//  * @returns {Object} - Contains the owner and repo name.
//  */
// function extractRepoInfo(repoUrl) {
//   const urlPattern = /https?:\/\/(?:www\.)?github\.com\/([^\/]+)\/([^\/]+)/;
//   const match = repoUrl.match(urlPattern);

//   if (!match) {
//     throw new Error('Invalid repository URL format. It should be like https://github.com/owner/repo.');
//   }

//   return {
//     owner: match[1],
//     repo: match[2],
//   };
// }

// /**
//  * Fetches the content of the package.json file from a GitHub repository.
//  * @param {string} repoUrl - The full URL of the GitHub repository.
//  * @param {string} [token] - The personal access token for private repositories (optional).
//  * @param {string} [branch='main'] - The branch name (default is 'main').
//  * @returns {Promise<Object>} - Returns the parsed package.json object.
//  */
// async function fetchPackageJson(repoUrl, token, branch = 'main') {
//   const { owner, repo } = extractRepoInfo(repoUrl); // Extract owner and repo name from the URL

//   // Construct the URL for the package.json file
//   const url = `https://api.github.com/repos/${owner}/${repo}/contents/package.json?ref=${branch}`;

//   try {
//     // Set up request headers for authentication if a token is provided
//     const headers = token ? { Authorization: `token ${token}` } : {};
//     const branchesUrl = `https://api.github.com/repos/${owner}/${repo}/branches`;
//     const branchesResponse = await axios.get(branchesUrl, { headers });
//     console.log('Available branches:', branchesResponse.data.map(branch => branch.name));
//     const response = await axios.get(url, { headers });
    

//     // The content is base64 encoded, decode it
//     const packageJsonContent = Buffer.from(response.data.content, 'base64').toString('utf-8');

//     // Parse and return the JSON
//     return JSON.parse(packageJsonContent);
//   } catch (error) {
//     console.error('Error fetching package.json:', error.message);
//     throw error;
//   }
// }

// /**
//  * Fetches repository information from GitHub.
//  * @param {string} repoUrl - The full URL of the GitHub repository.
//  * @param {string} [token] - The personal access token for private repositories (optional).
//  * @returns {Promise<Object>} - Returns the repository information.
//  */
// async function fetchRepoInfo(repoUrl, token) {
//   const { owner, repo } = extractRepoInfo(repoUrl); // Extract owner and repo name from the URL

//   // Construct the URL using the repo address
//   const url = `https://api.github.com/repos/${owner}/${repo}`;

//   try {
//     // Set up request headers for authentication if a token is provided
//     const headers = token ? { Authorization: `token ${token}` } : {};

//     const response = await axios.get(url, { headers });

//     // Return repository information including the owner
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching repository information:', error.message);
//     throw error;
//   }
// }

// /**
//  * Example function to use fetchPackageJson and log results.
//  * @param {string} repoUrl - The full URL of the GitHub repository.
//  * @param {string} [token] - The personal access token for private repositories (optional).
//  */
// async function getPackageJson(repoUrl, token) {
//   try {
//     const packageJson = await fetchPackageJson(repoUrl, token);
//     console.log('Fetched package.json:', packageJson);
//     return packageJson;
//   } catch (error) {
//     console.error('Failed to fetch package.json:', error);
//   }
// }

// // // Example usage
// // const repoUrl = 'https://github.com/octocat/Hello-World'; // Replace with the actual repository URL
// // const token = 'YOUR_GITHUB_ACCESS_TOKEN'; // Optional, replace if accessing private repos

// // getPackageJson(repoUrl, token);

// // Export functions for external use
// module.exports = {
//   fetchPackageJson,
//   fetchRepoInfo,
//   getPackageJson,
// };

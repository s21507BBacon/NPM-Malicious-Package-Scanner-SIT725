const GitNode = require('gitnode');
const jwt = require('jwt-decode');

async function estimateAccessTokenExpiration(accessToken) {
  try {
    const git = new GitNode({
      token: accessToken,
    });

    // Make a request to a protected endpoint (e.g., user information)
    const response = await git.request('GET', '/user');

    // Extract the token from the response headers
    const authorizationHeader = response.headers['authorization'];
    const token = authorizationHeader.split(' ')[1];

    // Decode the token to get the creation time
    const decodedToken = jwt.decode(token);
    const creationTime = decodedToken.iat * 1000;

    // Assuming a typical expiration window of 1 hour (adjust as needed)
    const expirationTime = new Date(creationTime + 3600000);

    return expirationTime;
  } catch (error) {
    console.error('Error estimating expiration time:', error);
    return null;
  }
}

// Usage example:
const accessToken = 'YOUR_ACCESS_TOKEN';
const expirationTime = await estimateAccessTokenExpiration(accessToken);

if (expirationTime) {
  console.log('Estimated expiration time:', expirationTime);
} else {
  console.log('Error estimating expiration time.');
}

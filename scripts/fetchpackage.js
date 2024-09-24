import GitNode from 'gitnode';
import fs from 'fs/promises';

async function fetchPackageJsonUpdates(repoUrl: string, destinationPath: string) {
  const git = new GitNode({
    // Replace 'YOUR_GITHUB_ACCESS_TOKEN' with your actual token if needed
    token: 'YOUR_GITHUB_ACCESS_TOKEN',
    url: repoUrl
  });

  // Clone the repository or fetch updates if it's already cloned
  try {
    await git.clone();
  } catch (error) {
    if (error.code !== 'alreadyExists') {
      throw error;
    }
    await git.fetch();
  }

  // Check for updates in the 'package.json' file
  const sourcePath = './repository-name/package.json';
  const gitStatus = await git.status(sourcePath);

  if (gitStatus.staged || gitStatus.unstaged) {
    console.log('Updates found in package.json. Fetching...');
    await git.checkout(sourcePath);
  } else {
    console.log('No updates found in package.json.');
    return;
  }

  // Copy the updated 'package.json' file to the destination
  await fs.copyFile(sourcePath, destinationPath);

  console.log('Updated package.json copied successfully!');
}

// Usage example:
fetchPackageJsonUpdates('https://github.com/username/repository-name.git', './copied-package.json');

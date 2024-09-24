import { readFileSync } from 'fs';

function filterPackages(packageList: string[], packageJsonPath: string): string[] {
  const packageJsonData = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
  const dependencies = Object.keys(packageJsonData.dependencies || {});

  return packageList.filter(packageName => dependencies.includes(packageName));
}

// Usage example:
const desiredPackages = ['react', 'axios'];
const packageJsonPath = './package.json';

const foundPackages = filterPackages(desiredPackages, packageJsonPath);

console.log('Found packages:', foundPackages);

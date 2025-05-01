// downgrade-express.js
// This script will modify package.json to use Express 4.x instead of 5.x
// Run with: node downgrade-express.js

const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

// Find the package.json file
const packageJsonPath = path.join(process.cwd(), 'package.json');

if (!fs.existsSync(packageJsonPath)) {
  console.error('package.json not found in the current directory.');
  process.exit(1);
}

try {
  // Read and parse package.json
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  // Check if express is in the dependencies
  if (packageJson.dependencies && packageJson.dependencies.express) {
    const currentExpressVersion = packageJson.dependencies.express;

    // Only downgrade if using Express 5.x
    if (currentExpressVersion.startsWith('^5') || currentExpressVersion.startsWith('~5')) {
      console.log(`Found Express version ${currentExpressVersion}`);
      console.log('Downgrading to Express 4.18.2...');

      // Update the version
      packageJson.dependencies.express = '^4.18.2';

      // Write back to package.json
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

      console.log('Successfully updated package.json');
      console.log('Now run "npm install" to apply the changes.');

      // Ask if they want to run npm install
      console.log('\nDo you want to run npm install now? (y/n)');
      process.stdin.once('data', data => {
        const answer = data.toString().trim().toLowerCase();
        if (answer === 'y' || answer === 'yes') {
          console.log('Running npm install...');
          childProcess.execSync('npm install', { stdio: 'inherit' });
          console.log('Done! You should now be able to run your application without the path-to-regexp error.');
        } else {
          console.log('Please run "npm install" manually to apply the changes.');
        }
        process.exit(0);
      });
    } else {
      console.log(`Current Express version (${currentExpressVersion}) is not 5.x. No downgrade needed.`);
    }
  } else {
    console.log('Express not found in dependencies.');
  }
} catch (error) {
  console.error('Error processing package.json:', error);
  process.exit(1);
}

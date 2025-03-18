/**
 * This script helps to set up the remix development environment
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Setting up Remix development environment...');

// First, ensure all dependencies are installed
try {
    console.log('Installing npm dependencies...');
    execSync('npm install', { stdio: 'inherit' });

    // Install Remix CLI globally if needed
    console.log('Installing Remix CLI globally...');
    execSync('npm install -g @remix-run/dev @remix-run/serve', { stdio: 'inherit' });

    // Create app directory if it doesn't exist
    const appDir = path.join(__dirname, 'app');
    if (!fs.existsSync(appDir)) {
        console.log('Creating app directory structure...');
        fs.mkdirSync(appDir, { recursive: true });
        fs.mkdirSync(path.join(appDir, 'routes'), { recursive: true });

        // Create public directory if it doesn't exist
        const publicDir = path.join(__dirname, 'public');
        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir, { recursive: true });
        }
    }

    console.log('Setup complete. You can now run "npm run dev" to start the development server.');
} catch (error) {
    console.error('Error during setup:', error.message);
    process.exit(1);
}

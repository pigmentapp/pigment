const fs = require('fs');
const path = require('path');

const publicDir = './public';
const buildDir = './build';
const logoSrc = './src/assets/logo/logo.png';

if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir);
}

fs.copyFileSync(logoSrc, path.join(publicDir, 'notification.png'));
fs.copyFileSync(logoSrc, path.join(buildDir, 'icon.png'));

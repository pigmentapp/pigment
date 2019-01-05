/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const moveFile = require('move-file');
const rimraf = require('rimraf');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const removeExistingIcons = () => {
  rimraf.sync('./build/icons');
  rimraf.sync('./build/icon.icns');
  rimraf.sync('./build/icon.ico');
};

const generateIcons = async () => {
  const { stdout } = await exec('npx electron-icon-maker --input=./build/logo.png --output=./build');
  console.log(stdout);
};

const moveIcons = async () => {
  await moveFile('./build/icons/mac/icon.icns', './build/icon.icns');
  await moveFile('./build/icons/win/icon.ico', './build/icon.ico');
  await moveFile('./build/icons/png', './build/png');
  rimraf.sync('./build/icons');
  await moveFile('./build/png', './build/icons');
  fs.copyFileSync('./build/icons/512x512.png', './public/notification.png');
};

(async () => {
  removeExistingIcons();
  await generateIcons();
  await moveIcons();
})();

/* eslint-disable import/no-extraneous-dependencies */

const fs = require('fs');
const marked = require('marked');
const path = require('path');
const striptags = require('striptags');

const file = path.resolve(__dirname, '..', 'CHANGELOG.md');
const destination = path.resolve(__dirname, '..', 'public', 'changelog.html');
let contents = '# Changelog not found.';

if (fs.existsSync(file)) {
  contents = fs.readFileSync(file, 'utf-8');
}

let html = marked(contents);
html = striptags(html, ['h1', 'h3', 'ul', 'li', 'strong']);
html = html.replace(/\([0-9a-z]*\)/g, '');

fs.writeFileSync(destination, html);

/* eslint-disable no-template-curly-in-string */

module.exports = {
  tagFormat: '${version}',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    ['@semantic-release/npm', {
      npmPublish: false,
    }],
    '@semantic-release/git',
    '@semantic-release/github',
  ],
};

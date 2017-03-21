const fs = require('fs');
const execSync = require('child_process').execSync;
const inInstall = require('in-publish').inInstall;
const prettyBytes = require('pretty-bytes');
const gzipSize = require('gzip-size');

if (inInstall()) {
  process.exit(0);
}

const exec = (command, extraEnv) =>
  execSync(command, {
    stdio: 'inherit',
    env: Object.assign({}, process.env, extraEnv)
  });

console.log('Building CommonJS modules ...');

exec('babel modules -d lib', {
  BABEL_ENV: 'cjs'
});

console.log('\nBuilding ES modules ...');

exec('babel modules -d es', {
  BABEL_ENV: 'es'
});

// console.log('\nBuilding electron-log-rotate.js ...');
//
// exec('webpack modules/index.js umd/electron-log-rotate.js', {
//   NODE_ENV: 'production'
// });
//
// console.log('\nBuilding electron-log-rotate.min.js ...');
//
// exec('webpack -p modules/index.js umd/electron-log-rotate.min.js', {
//   NODE_ENV: 'production'
// });
//
// const size = gzipSize.sync(
//   fs.readFileSync('umd/electron-log-rotate.min.js')
// );
//
// console.log('\ngzipped, the UMD build is %s', prettyBytes(size));
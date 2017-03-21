import transportFile from './transport-file';

let logAppName = 'electron-log-rotate';
let logMaxSize = 5 * 1024 * 1024;

function log(text) {
  transportFile(text, logAppName, logMaxSize);
}

function setup(options) {
  logAppName = options.appName;
  logMaxSize = options.maxSize;
}

export { log, setup };


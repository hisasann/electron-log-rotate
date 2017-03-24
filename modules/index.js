import transportFile from './transport-file';
import deleteLogFiles from './delete-log-files';

let logAppName = 'electron-log-rotate';
let logMaxSize = 5 * 1024 * 1024;

function setup(options) {
  logAppName = options.appName;
  logMaxSize = options.maxSize;
}

function log(text) {
  transportFile(text, logAppName, logMaxSize);
}

function deleteLog(howManyDaysAgo) {
  deleteLogFiles(howManyDaysAgo, logAppName);
}

export { log, setup, deleteLog };


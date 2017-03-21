'use strict';

exports.__esModule = true;

var _transportFile = require('./transport-file');

var _transportFile2 = _interopRequireDefault(_transportFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logAppName = 'electron-log-rotate';
var logMaxSize = 5 * 1024 * 1024;

function log(text) {
  (0, _transportFile2.default)(text, logAppName, logMaxSize);
}

function setup(options) {
  logAppName = options.appName;
  logMaxSize = options.maxSize;
}

exports.default = {
  log: log,
  setup: setup
};
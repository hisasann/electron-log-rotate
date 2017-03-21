'use strict';

const os = require('os');
const fs   = require('fs');
const path = require('path');
const _ = require('lodash');
const moment = require('moment');

var file = undefined;
var stream = undefined;
var date = undefined;

function log(text) {
  transportFile(text);
}

function transportFile(msg) {
  var text = msg;

  date = dateDetermination(date);

  if (undefined === stream) {
    file = file || findLogPath(module.exports.appName, date);
    if (!file) {
      // error
      return;
    }

    if (module.exports.maxSize > 0) {
      logRotate(file, module.exports.maxSize);
    }

    stream = fs.createWriteStream(file, { flags: 'a' });
  }

  if (!stream) {
    return;
  }

  stream.write([date, ' ', getNowTime(), ' ', text, os.EOL].join(''));
}

function dateDetermination(d) {
  var now = getNowDate();

  if (d !== now) {
    stream = undefined;
    file = undefined;
  }

  return now;
}

function logRotate(file, maxSize) {
  try {
    const stat = fs.statSync(file);
    if (stat.size > maxSize) {
      fs.renameSync(file, file.replace(/log$/, 'old.log'));
    }
  } catch (e) {}
}

function findLogPath(appName, date) {
  var appName = appName ? appName : '';
  var dir;
  switch (process.platform) {
    case 'linux':
      dir = prepareDir(process.env['XDG_CONFIG_HOME'], appName)
        .or(process.env['HOME'] + '/.config', appName)
        .or(process.env['XDG_DATA_HOME'], appName)
        .or(process.env['HOME'] + '/.local/share', appName)
        .result;
      break;
    case 'darwin':
      dir = prepareDir(process.env['HOME'] + '/Library/Logs', appName)
        .or(process.env['HOME'] + '/Library/Application Support', appName)
        .result;
      break;
    case 'win32':
      dir = prepareDir(process.env['APPDATA'], appName)
        .or(process.env['HOME'] + '/AppData', appName)
        .result;
      break;
  }

  return [dir, '/', date, '_', 'log.log'].join('');
}

function prepareDir(path, appName) {
  if (!this || this.or !== prepareDir || !this.result) {
    if (!path) {
      return { or: prepareDir };
    }
    path = path + '/' + appName;
    mkDir(path);
    try {
      fs.accessSync(path, fs.W_OK);
    } catch (e) {
      return { or: prepareDir };
    }
  }

  return {
    or: prepareDir,
    result: (this ? this.result : false) || path
  };
}

function mkDir(path, root) {
  var dirs = path.split('/');
  var dir = dirs.shift();
  root = (root || '') + dir + '/';

  try {
    fs.mkdirSync(root);
  } catch (e) {
    if (!fs.statSync(root).isDirectory()) {
      throw new Error(e);
    }
  }

  return !dirs.length || mkDir(dirs.join('/'), root);
}

function getNowDate() {
  return [moment().get('year'), '-', _.padStart(moment().get('month') + 1, 2, '0'), '-', _.padStart(moment().get('date'), 2, '0')].join('');
}

function getNowTime() {
  var now = moment();
  return [_.padStart(now.hours(), 2, '0'), ':', _.padStart(now.minute(), 2, '0'), ':', _.padStart(now.second(), 2, '0')].join('');
}

module.exports.log = log;

module.exports.appName = 'electron-rog-rotate';

module.exports.maxSize = 5 * 1024 * 1024;

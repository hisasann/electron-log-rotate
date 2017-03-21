import os from 'os';
import fs from 'fs';
import getNowDate from './get-now-date';
import getNowTime from './get-now-time';
import findLogPath from './find-log-path';

let file;
let stream;
let date;

export default function (msg, appName, maxSize) {
  let text = msg;

  date = dateDetermination(date);

  if (!stream) {
    file = file || findLogPath(appName, date);
    if (!file) {
      // error
      return;
    }

    if (maxSize > 0) {
      logRotate(file, maxSize);
    }

    stream = fs.createWriteStream(file, { flags: 'a' });
  }

  if (!stream) {
    return;
  }

  stream.write([date, ' ', getNowTime(), ' ', text, os.EOL].join(''));
}

function dateDetermination(d) {
  let now = getNowDate();

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
  } catch (e) {
    // error
  }
}

import fs from 'fs';
import _ from 'lodash';
import moment from 'moment';
import findLogPath from './find-log-path';

const format = 'YYYY-MM-DD';

export default function (howManyDaysAgo, appName) {
  let path = findLogPath(appName);
  let files = [];
  try {
    files = fs.readdirSync(path);
  } catch (e) {
    return null;
  }

  _.forEach(files, (file, index) => {
    let yearMonthDay = getYearMonthDay(file);
    if (!yearMonthDay) {
      return;
    }

    if (!isBefore(howManyDaysAgo, yearMonthDay)) {
      return;
    }

    deleteLogFile(path + file);
  });
}

function getYearMonthDay(file) {
  let split = _.split(file, '-', 3);
  if (split.length < 3) {
    return null;
  }

  return {
    year: split[0],
    month: split[1],
    day: _.split(split[2], '_', 1)[0]
  };
}

function isBefore(howManyDaysAgo, yearMonthDay) {
  let agoDays = moment(moment().format(format)).subtract(howManyDaysAgo, 'days');
  let fileDays = moment([yearMonthDay.year, yearMonthDay.month, yearMonthDay.day].join('-'));
  return moment(fileDays).isBefore(agoDays);
}

function deleteLogFile(filePath) {
  try {
    fs.unlinkSync(filePath);
  } catch (e) {
    return null;
  }
}

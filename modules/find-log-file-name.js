import findLogPath from './find-log-path';

export default function (appName = '', date) {
  return [findLogPath(appName), date, '_', 'log.log'].join('');
}

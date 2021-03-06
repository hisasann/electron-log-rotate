import { log, setup, deleteLog } from '../lib/index';

const pkg = require('../package.json');

setup({
  appName: pkg.name + '-test',
  maxSize: 10 * 1024 * 1024
});

log('test ES');

deleteLog(2);


const logCJS = require('../lib/index');
logCJS.setup({
  appName: pkg.name + '-test',
  maxSize: 10 * 1024 * 1024
});

logCJS.log('test CJS');


import log from '../lib/index';

const pkg = require('../package.json');

log.setup({
  appName: pkg.name + '-test',
  maxSize: 10 * 1024 * 1024
});

setInterval(() => {
  log.log('test');
}, 3000);

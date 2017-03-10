const log = require('../lib/index');
const pkg = require('../package.json');
log.appName = pkg.name;

log.log('test');

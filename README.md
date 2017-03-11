:lipstick: electron-log-rotate :lipstick:
===============

[![npm version](https://badge.fury.io/js/electron-log-rotate.svg)](https://badge.fury.io/js/electron-log-rotate)


## Description

inspire:

[megahertz/electron-log: Just a very simple logging module for your Electron application](https://github.com/megahertz/electron-log)

Just a very simple logging module for your Electron application.
No dependencies. No complicated configuration. Just require and use.
Also it can be used without Electron.

By default it writes logs to the following locations:

 * **on Linux:** `~/.config/<app name>/log.log`
 * **on OS X:** `~/Library/Logs/<app name>/log.log`
 * **on Windows:** `$HOME/AppData/Roaming/<app name>/log.log`


## Installation

 Install with [npm](https://npmjs.org/package/electron-log-rotate):

     npm install electron-log-rotate


## Usage
 
 ```js
 var log = require('electron-log-rotate');
 log.appName = 'project-name';  // require for directory name

 log.log('Hello, log');
 ```


## Maintainers

 - [hisasann](https://github.com/hisasann)

## License

 MIT © [hisasann](https://github.com/hisasann)

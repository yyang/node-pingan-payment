'use strict';

var _pingan = require('./pingan');

var _pingan2 = _interopRequireDefault(_pingan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let pingan = new _pingan2.default({
  server: '192.168.32.210',
  port: 7072,
  marketId: '3006',
  webServiceHost: 'https://testebank.sdb.com.cn/'
});

console.log(pingan);
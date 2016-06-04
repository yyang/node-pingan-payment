'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaymentClient = exports.RegulatoryClient = undefined;

var _regulatory = require('./regulatory');

var _regulatory2 = _interopRequireDefault(_regulatory);

var _payment = require('./payment');

var _payment2 = _interopRequireDefault(_payment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.RegulatoryClient = _regulatory2.default;
exports.PaymentClient = _payment2.default;
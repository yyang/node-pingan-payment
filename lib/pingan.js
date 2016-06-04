'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pinganClients = require('./pingan-clients');

class Pingan {
  constructor(config) {
    this._config = config;

    this._regulatoryClient = new _pinganClients.RegulatoryClient(config);
    this._paymentClient = new _pinganClients.PaymentClient(config);
  }

  // sendMessage(functionCode, paramsList, callback) {
  //   var client = this._regulatoryClient;
  //   client.write();
  //   client.on('data', function(data) {
  //     console.log('DATA: ' + data);
  //     callback(data);
  //     // Close the client socket completely
  //     client.destroy();
  //   });
  // }
}
exports.default = Pingan;
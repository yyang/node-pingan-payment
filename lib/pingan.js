'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pinganClients = require('./pingan-clients');

var _apiDescription = require('./pingan-clients/api-description');

class Pingan {
  constructor(config) {
    this._config = config;

    this._regulatoryClient = new _pinganClients.RegulatoryClient(config);
    this._paymentClient = new _pinganClients.PaymentClient(config);
  }

  sendMessage(clientLogId, functionCode, parameters, callback) {
    if (_apiDescription.api[functionCode].client === 'regulatory') {
      this._regulatoryClient.sendMessage(clientLogId, functionCode, parameters, callback);
    }
  }

}
exports.default = Pingan;
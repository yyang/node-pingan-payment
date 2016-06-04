'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
class PaymentMessage {
  constructor(clientConfig, functionCode, paramsList) {}

  composeXML() {}
}

class PaymentResponse {
  constructor(string) {}

  parseXML() {}

}

class PaymentClient {
  constructor(config) {
    // Set up Regulatory Client (跨行支付收单)
    this._url = config.url;
    this._gatewayCertificate = config.gatewayCertificate;
    this._merchantCertificate = config.merchantCertificate;
  }

  sendMessage(functionCode, paramsList, callback) {
    var message = this.prepareMessage(functionCode, paramsList);

    this._pool.pull((err, connection) => {
      // Handles Error
      if (err) {
        callback(err, null);
        return;
      }

      // Sends message
      connection.write(message);
      connection.on('data', data => {
        callback(null, data.toString());
        connection.end();
      });

      // Disconnects message
      connection.on('end', () => {
        console.log('disconnected from server');
      });
    });
  }

  preparePaymentRequest(paramsList) {}
}

exports.default = PaymentClient; // TODO:
// GBK Encoding
// Split Message
// Prepare Message
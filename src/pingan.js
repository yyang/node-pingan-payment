import RegulatoryClient from './pingan-clients';
import PaymentClient from './pingan-clients';

export default class Pingan {
  constructor(config) {
    this._config = config;

    this._regulatoryClient = new RegulatoryClient(config);
    this._paymentClient = new PaymentClient(config);
  }

  sendMessage(functionCode, paramsList, callback) {
    var client = this._regulatoryClient;
    client.write();
    client.on('data', function(data) {
      console.log('DATA: ' + data);
      callback(data);
      // Close the client socket completely
      client.destroy();
    });
  }
}

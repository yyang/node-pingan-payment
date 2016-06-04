import {RegulatoryClient, PaymentClient} from './pingan-clients';
import {api} from './pingan-clients/api-description';

export default class Pingan {
  constructor(config) {
    this._config = config;

    this._regulatoryClient = new RegulatoryClient(config);
    this._paymentClient = new PaymentClient(config);
  }

  sendMessage(clientLogId, functionCode, parameters, callback) {
    if (api[functionCode].client === 'regulatory') {
      this._regulatoryClient.sendMessage(clientLogId, functionCode, parameters,
        callback);
    }
  }

}

import fs from 'fs';
import path from 'path';
import 'babel-polyfill';
import {RegulatoryClient, PaymentClient} from './pingan-clients';
import {api} from './pingan-clients/api-description';

let secureData = new WeakMap();

export default class Pingan {
  constructor(config) {
    let pingan = {config};

    if (config.regulatory) {
      let regulatoryConfig = config.regulatory;
      regulatoryConfig.webServiceHost = config.webServiceHost;
      pingan.regulatoryClient = new RegulatoryClient(regulatoryConfig);
      pingan.regulatorySupported = true;
    }

    if (config.payment) {
      let paymentConfig = {
        key: config.payment.passphrase ? {
          key: fs.readFileSync(path.join(__dirname, config.payment.pem)),
          passphrase: config.payment.passphrase
        } : fs.readFileSync(path.join(__dirname, config.payment.pem)),
        cert: fs.readFileSync(path.join(__dirname, config.payment.cert)),
        masterId: config.payment.masterId,
        returnURL: config.payment.returnURL,
        notifyURL: config.payment.notifyURL,
        webServiceHost: config.webServiceHost
      };
      pingan.paymentClient = new PaymentClient(paymentConfig);
      pingan.paymentSupported = true;
    }

    secureData.set(this, pingan);
  }

  sendMessage(clientLogId, functionCode, parameters, callback) {
    let secureClient = secureData.get(this);

    // Regulatory message
    if (api.request[functionCode].client === 'regulatory') {
      if (!secureClient.regulatorySupported) {
        throw new Error('[Pingan] Missing regulatory configuration.');
      }
      let client = secureClient.regulatoryClient;
      client.sendMessage(clientLogId, functionCode, parameters, callback);
      return;
    }

    // Payment message
    if (api.request[functionCode].client === 'payment') {
      if (!secureClient.paymentSupported) {
        throw new Error('[Pingan] Missing payment configuration.');
      }
      let client = secureClient.paymentClient;
      client.sendMessage(clientLogId, functionCode, parameters, callback);
      return;
    }
  }

  preparePaymentForm(params) {
    let secureClient = secureData.get(this);
    if (!secureClient.paymentSupported) {
      throw new Error('[Pingan] Missing payment configuration.');
    }
    return secureClient.paymentClient.paymentForm(params);
  }
}

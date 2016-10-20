import fs from 'fs';
import path from 'path';
import WeakMap from 'es6-weak-map';
import {RegulatoryClient, PaymentClient} from './pingan-clients';
import {api} from './pingan-clients/api-description';

let secureData = new WeakMap();
let loadPem = pemString => {
  if (/.pem$/.test(pemString)) {
    if (/^\//.test(pemString)) {
      return fs.readFileSync(pemString);
    }
    return fs.readFileSync(path.join(__dirname, pemString));
  }
  return pemString;
};

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
        cert: config.payment.passphrase ? {
          key: loadPem(config.payment.cert),
          passphrase: config.payment.passphrase
        } : loadPem(config.payment.pem),
        paygate: loadPem(config.payment.paygate),
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

  parsePaymentResponse(original, signature) {
    let secureClient = secureData.get(this);
    if (!secureClient.paymentSupported) {
      throw new Error('[Pingan] Missing payment configuration.');
    }
    return secureClient.paymentClient.parseResult(original, signature);
  }
}

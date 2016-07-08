import KeyedXML from '../utils/keyed-xml';

export default class PaymentClient {
  constructor(config) {
    // Set up Regulatory Client (跨行支付收单)
    this._url = config.url;
    this._gatewayCertificate = config.gatewayCertificate;
    this._merchantCertificate = config.merchantCertificate;
  }

  paymentForm(params) {

  }

  sendMessage(clientLogId, functionCode, paramsList, callback) {

  }

  parseResult(original, signature) {

  }
}

// TODO:
// GBK Encoding

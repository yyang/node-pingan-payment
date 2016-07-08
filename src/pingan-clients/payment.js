import crypto from 'crypto';
import KeyedXML from '../utils/keyed-xml';

// Using Symbol definition for private variables;
// Client
let _clientConfig = Symbol();

export default class PaymentClient {
  constructor(config) {
    // Set up Regulatory Client (跨行支付收单)
    this[_clientConfig] = config;
  }

  paymentForm(params) {
    // Prepares form and XML
    let form = KeyedXML.fromObject(params);
    let xml = form.xml;

    // Prepares signature
    var key = this[_clientConfig].pfx.toString('ascii');
    var sign = crypto.createSign('RSA-SHA256');
    sign.update('abcdef');  // data from your file would go here
    var signature = sign.sign(key, 'hex');

    return {xml, signature};
  }

  sendMessage(clientLogId, functionCode, paramsList, callback) {

  }

  parseResult(original, signature) {

  }
}

// TODO:
// GBK Encoding

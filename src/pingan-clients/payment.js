import crypto from 'crypto';
import Symbol from 'es6-symbol';
import KeyedXML from '../utils/keyed-xml';
import {validate, prepareForm, uriEncode, uriDecode} from '../utils/helpers';
import {api} from './api-description';

// Using Symbol definition for private variables;
// Client
let _clientConfig = Symbol();

export default class PaymentClient {
  constructor(config) {
    if (!('cert' in config && 'paygate' in config && 'masterId' in config &&
          'returnURL' in config && 'notifyURL' in config)) {
      throw new Error('[Pingan Payment] Cannot initialize payment client.');
    }
    // Set up Regulatory Client (跨行支付收单)
    this[_clientConfig] = config;
  }

  paymentForm(params) {
    // Verifies data
    params.masterId = this[_clientConfig].masterId;
    let keyDictionary = api.request.paymentForm.keys;
    let validateFunc = {part: 'Pingan Payment', name: 'paymentForm'};
    let data = validate(validateFunc, keyDictionary, params);

    // Prepares form and XML
    let form = KeyedXML.fromObject(data);
    let xml = form.xml;

    // Sign string
    let sign = crypto.createSign('MD5');
    sign.update(xml);  // data from your file would go here
    let signature = sign.sign(this[_clientConfig].cert, 'hex');

    // Form output
    let formId = 'pingan-payment-' + params.orderId;
    let endpoint = this[_clientConfig].webServiceHost +
                   api.request.paymentForm.endpoint;
    let formData = {
      orig: uriEncode(xml),
      sign: uriEncode(signature),
      returnurl: this[_clientConfig].returnURL,
      NOTIFYURL: this[_clientConfig].notifyURL
    };
    return prepareForm(formId, endpoint, formData);
  }

  sendMessage(clientLogId, functionCode, paramsList, callback) {

  }

  parseResult(original, signature) {
    original = uriDecode(original);
    signature = uriDecode(signature);

    // Verifies data
    let verifier = crypto.createVerify('MD5');
    verifier.update(original);
    if (!verifier.verify(this[_clientConfig].paygate, signature, 'hex')) {
      throw new Error('[Pingan Payment] Unable to verify response.');
    }

    // Parse data
    let data = KeyedXML.fromXML(original);
    return data.object;
  }
}

// TODO: 1. GBK Encoding; 2. Send message

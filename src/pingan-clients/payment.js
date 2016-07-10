import crypto from 'crypto';
import KeyedXML from '../utils/keyed-xml';
import {validate, prepareForm, uriEncode, uriDecode,
  joinUrl} from '../utils/helpers';
import {api} from './api-description';

// Using Symbol definition for private variables;
// Client
let _clientConfig = Symbol();

export default class PaymentClient {
  constructor(config) {
    // Set up Regulatory Client (跨行支付收单)
    this[_clientConfig] = config;
  }

  paymentForm(params) {
    // Verifies data
    let keyDictionary = api.request.paymentForm.keys;
    let validateFunc = {part: 'Pingan Payment', name: 'paymentForm'};
    let data = validate(validateFunc, keyDictionary, params);

    // Prepares form and XML
    let form = KeyedXML.fromObject(data);
    let xml = form.xml;

    // Sign string
    let sign = crypto.createSign('MD5');
    sign.update(xml);  // data from your file would go here
    let signature = sign.sign(this[_clientConfig].key, 'hex');

    // Form output
    let formId = 'pingan-payment-' + params.orderId;
    let endpoint = joinUrl(this[_clientConfig].webServiceHost,
                           api.request.paymentForm.endpoint);
    let formData = {
      orig: uriEncode(xml),
      sign: uriEncode(signature),
      sign2: signature,
      returnurl: this[_clientConfig].returnURL,
      NOTIFYURL: this[_clientConfig].notifyURL
    };
    console.log(xml);
    return prepareForm(formId, endpoint, formData);
  }

  sendMessage(clientLogId, functionCode, paramsList, callback) {

  }

  parseResult(original, signature) {

  }
}

// TODO:
// GBK Encoding
// Response verification
//

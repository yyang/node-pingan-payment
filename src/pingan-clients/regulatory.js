import net from 'net';
import Symbol from 'es6-symbol';
import dateFormat from 'dateformat';
import ConnectionPool from 'jackpot';
import {extract, gbkEncode, gbkDecode, padString,
  joinUrl} from '../utils/helpers';
import {api} from './api-description';

// Using Symbol definition for private variables;
// Client
let _clientConfig = Symbol();
let _pool = Symbol();
// Send message
let _clientLogId = Symbol();
let _functionCode = Symbol();
let _ignoreWebSign = Symbol();
let _paramsList = Symbol();
let _messageBodyBuffer = Symbol();
let _messageBody = Symbol();
let _messageHead = Symbol();
let _networkHead = Symbol();
// Receive Message
let _responseBuffer = Symbol();
let _responseCode = Symbol();
let _fullResponseMessage = Symbol();
let _responseMessage = Symbol();
let _responseBody = Symbol();
let _responseBodyString = Symbol();

class RegulatoryMessage {
  /**
   * Class Constructor
   * @param {String} clientConfig    客户端配置
   * @param {String} clientLogId     第三方系统流水ID
   * @param {String} functionCode    (4 digit string) according to Pingan Bank.
   * @param {Object} paramsList      Keys and values.
   * @param {Boolean} ignoreWebSign  是忽略websign
   */
  constructor(clientConfig, clientLogId, functionCode, paramsList,
    ignoreWebSign) {
    // Links client configuration file.
    this[_clientConfig] = clientConfig;

    // Validates and stores client side ID;
    // Use last 20 digits or fill up string with '0'
    this[_clientLogId] = padString(clientLogId, 20, '0');

    // Validates and stores function code
    this[_functionCode] = functionCode;
    if (!api.request.hasOwnProperty(functionCode)) {
      throw new Error('[Pingan JZB] Pingan Invalid Function Code');
    }

    this[_ignoreWebSign] = ignoreWebSign || false;

    // Saves parameter list
    this[_paramsList] = paramsList;
    this[_messageBody] = this.composeMessageBody();
    this[_messageHead] = this.composeMessageHead();
    this[_networkHead] = this.composeNetworkHead();
  }

  /**
   * Creates message body string
   * @return {String} Message Body
   */
  composeMessageBody() {
    /* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^self$" }] */
    let self = this;
    let extractFunc = {part: 'Pingan JZB', name: self._functionCode};
    let keyDictionary = api.request[this[_functionCode]].keys;
    let messageBody = '';

    for (let key of keyDictionary) {
      if (key instanceof Array) {
        for (let listItem of this[_paramsList].list) {
          for (let subKey of key) {
            messageBody += extract(extractFunc, subKey, listItem) + '&';
          }
        }
      } else if (this[_ignoreWebSign] && key.key === 'webSign') {
        continue;
      } else {
        messageBody += extract(extractFunc, key, this[_paramsList]) + '&';
      }
    }
    return messageBody;
  }

  /**
   * Creates message head string
   * @return {String} Message Head
   */
  composeMessageHead() {
    let messageHead = '';

    messageHead += this[_functionCode];
    messageHead += this[_clientConfig].serviceType;
    messageHead += this[_clientConfig].macAddress;
    messageHead += dateFormat(new Date(), this[_clientConfig].dateTimeFormat);
    messageHead += this[_clientConfig].defaultResponseCode;
    messageHead += Array(43).join(' '); // responseMessage, rspMsg
    messageHead += this[_clientConfig].conFlag;
    messageHead += padString(this.messageBodyBuffer.length, 8, '0');
    messageHead += this[_clientConfig].countId;
    messageHead += this[_clientLogId];
    messageHead += this[_clientConfig].marketId;

    return messageHead;
  }

  composeNetworkHead() {
    let networkHead = '';
    let messageLength = this.messageBodyBuffer.length +
                        Buffer.from(this.messageHead).length;

    networkHead += 'A001130101';
    networkHead += this[_clientConfig].marketId;
    networkHead += '                '; // Part 2, 16 spaces
    networkHead += padString(messageLength, 10, '0');
    networkHead += '000000'; // Part 3, hTradeCode
    networkHead += this[_clientConfig].countId; // Part 4, 7 digits total
    networkHead += this[_clientConfig].serviceType;
    networkHead += dateFormat(new Date(), this[_clientConfig].dateTimeFormat);
    networkHead += this[_clientLogId];
    networkHead += this[_clientConfig].defaultResponseCode; // Part 5, RspCode
    networkHead += Array(101).join(' '); // Part 6, RspMsg, 100 spaces
    networkHead += this[_clientConfig].conFlag; // Part 7, 1 char
    networkHead += '000'; // Part 7, hTimes, 3 char
    networkHead += '0'; // Part 7, hSignFlag, 1 char
    networkHead += '0'; // Part 7, hSignPacketType, 1 char
    networkHead += Array(13).join(' '); // Part 7, netHeadPart3, 12 spaces
    networkHead += Array(12).join('0'); // Part 7, netHeadPart4, 11 0s

    return networkHead;
  }

  get functionCode() {
    return this[_functionCode];
  }

  get paramsList() {
    return this[_paramsList];
  }

  get messageBody() {
    if (!this[_messageBody]) {
      this[_messageBody] = this.composeMessageBody();
    }
    return this[_messageBody];
  }

  get messageBodyBuffer() {
    if (!this[_messageBodyBuffer]) {
      this[_messageBodyBuffer] = gbkEncode(this.messageBody);
    }
    return this[_messageBodyBuffer];
  }

  get messageHead() {
    if (this[_messageHead]) {
      this[_messageHead] = this.composeMessageHead();
    }
    return this[_messageHead];
  }

  get networkHead() {
    if (this[_networkHead]) {
      this[_networkHead] = this.composeNetworkHead();
    }
    return this[_networkHead];
  }

  get buffer() {
    let networkHeadBuffer = Buffer.from(this.networkHead);
    let messageHeadBuffer = Buffer.from(this.messageHead);

    const totalLength = networkHeadBuffer.length + messageHeadBuffer.length +
                        this.messageBodyBuffer.length;

    return Buffer.concat([networkHeadBuffer,
                          messageHeadBuffer,
                          this.messageBodyBuffer], totalLength);
  }
}

class RegulatoryResponse {
  constructor(responseBuffer) {
    this[_responseBuffer] = responseBuffer;
    this[_responseCode] = responseBuffer.toString('utf8', 87, 93);
    this[_fullResponseMessage] = gbkDecode(responseBuffer.slice(93, 193));
    this[_responseMessage] = this[_fullResponseMessage].trim();

    // Escapes if response code other than 000000
    if (this[_responseCode] !== '000000') {
      throw new Error('[Pingan JZB] Invalid Response Code [' + this[_responseCode] +
                      ']: ' + this[_responseMessage]);
    }

    this[_functionCode] = responseBuffer.toString('utf8', 222, 226);

    // Copies last part of buffer to body buffer;
    let responseBodyBuffer = Buffer.alloc(this[_responseBuffer].length - 344);
    responseBuffer.copy(responseBodyBuffer, 0, 344);
    this[_responseBodyString] = gbkDecode(responseBodyBuffer);

    this[_responseBody] = this.parseResponseBody();
  }

  parseResponseBody() {
    let responseBody = {};
    let responseArray = this[_responseBodyString].split('&');
    let keyDictionary = api.response[this[_functionCode]].keys;
    let recurItemCount = 0;

    // Put everything into responseBody Object
    for (let i = 0; i < keyDictionary.length; i++) {
      let keyObject = keyDictionary[i];

      // Process Recurring items
      if (keyObject instanceof Array) {
        // Note: add a redundant item for the sake of fucking stupid
        // 'reserve' key at the end of response.
        // Otherwise no need to reassign recurItemCount.
        recurItemCount = responseArray.length - keyDictionary.length + 2;
        let recurrence = ~~(recurItemCount / keyObject.length);
        recurItemCount = keyObject.length * recurrence;
        // Initialize list;
        responseBody.list = [];
        // Prepares item
        while (recurrence--) {
          let recurItem = {};
          let base = i + recurrence * keyObject.length;
          for (let j = 0; j < keyObject.length; j++) {
            recurItem[keyObject[j].key] = responseArray[base + j];
          }
          responseBody.list.push(recurItem);
        }

      // Process standard items
      } else {
        let index = recurItemCount ? recurItemCount + i - 1 : i;
        responseBody[keyObject.key] = responseArray[index];
      }
    }
    return responseBody;
  }

  get success() {
    return this[_responseCode] === '000000';
  }

  get responseBody() {
    return this[_responseBody];
  }
}

export default class RegulatoryClient {
  constructor(config) {
    if (!('port' in config && 'server' in config && 'marketId' in config &&
          'webServiceHost' in config)) {
      throw new Error('[Pingan JZB] Cannot initialize retulatory client.');
    }
    // Set up Regulatory Client (见证宝)
    this[_pool] = new ConnectionPool(10, () => {
      return net.connect(config.port, config.server);
    }, {
      min: 100,
      max: 30000,
      retries: 3
    });

    this[_clientConfig] = {
      superviseAccountId: config.superviseAccountId, // 监管账号
      webServiceHost: config.webServiceHost, // 'https://ebank.sdb.com.cn/'
      webPath: config.webPath || '/corporbank/nonpartyVerify.do',
      formReturnUrl: config.formReturnUrl || '',
      fornNotifyUrl: config.formNotifyUrl || '',
      marketId: config.marketId, // qydm
      serviceType: config.serviceType || '01', // servType
      macAddress: config.macAddress || '                ', // macCode
      dateTimeFormat: config.dateTimeFormat || 'yyyymmddHHMMss', // tranDateTime
      defaultResponseCode: config.defaultResponseCode || "999999", // RspCode
      conFlag: config.conFlag || "0",
      countId: config.countId || "PA001"
    };
    this[_clientConfig].webEndpoint =
      joinUrl(this[_clientConfig].webServiceHost, this[_clientConfig].webPath);
  }

  sendMessage(clientLogId, functionCode, paramsList, callback) {
    paramsList.SupAcctId = this[_clientConfig].superviseAccountId;
    let message = new RegulatoryMessage(this[_clientConfig], clientLogId,
                                        functionCode, paramsList, false);

    this[_pool].pull((err, connection) => {
      // Handles Error
      if (err) {
        callback(err, null);
        return;
      }

      // Sends message
      console.log('Connection Initialized');
      connection.write(message.buffer);

      // Response message
      let buffer = Buffer.alloc(0);
      connection.on('data', data => {
        let totalLength = buffer.length + data.length;
        buffer = Buffer.concat([buffer, data], totalLength);
      });

      // Disconnects message
      connection.on('end', () => {
        console.log('Connection Terminated');
        try {
          let response = new RegulatoryResponse(buffer);
          callback(null, response);
        } catch (error) {
          callback(error, null);
        }
      });
    });
  }

  preparePasswordForm(clientLogId, functionCode, paramsList, formParamsList) {
    let form = '<form name="payment-form' + clientLogId + '" ' +
               'action=' + this[_clientConfig].webEndpoint + '" method="post">';

    // Put together keys
    for (let keyObject of api.passwordForm.keys) {
      let value;
      if (keyObject.key === 'orderid') {
        value = clientLogId;
      } else if (keyObject.key === 'P2PCode') {
        value = this[_clientConfig].marketId;
      } else if (keyObject.key === 'orig') {
        if (formParamsList.type === 'V') {
          let message = new RegulatoryMessage(this[_clientConfig], clientLogId,
                                              functionCode, paramsList, true);
          value = message.messageBody;
        } else {
          continue;
        }
      } else if (keyObject.key === 'returnurl') {
        value = this[_clientConfig].formReturnUrl;
      } else if (keyObject.key === 'notifyUrl') {
        value = this[_clientConfig].formNotifyUrl;
      } else {
        // Throws Error for missing required param;
        if (keyObject.required &&
            !formParamsList.hasOwnProperty(keyObject.key) &&
            !keyObject.hasOwnProperty('default')) {
          throw new Error('[Pingan JZB] Missing key ' + keyObject.key +
                          ' for payment form for ' + functionCode);
        }
        // Writes default value for non-existing default;
        if (keyObject.hasOwnProperty('default') &&
            !formParamsList.hasOwnProperty(keyObject.key)) {
          value = keyObject.default;
        } else if (formParamsList.hasOwnProperty(keyObject.key)) {
          value = formParamsList[keyObject.key];
        } else {
          continue;
        }
      }

      // Validation
      if (keyObject.type === Number && !/^\d+$/.test(value)) {
        throw new Error('[Pingan JZB] Incorrect key ' + keyObject.key +
                        ' format for payment form ' + functionCode);
      }
      if (value.toString.length > keyObject.length) {
        throw new Error('[Pingan JZB] Key ' + keyObject.key +
                        ' overflow for function ' + functionCode);
      }
      if (keyObject.allowedValues &&
          keyObject.allowedValues.indexOf(value) === -1) {
        throw new Error('[Pingan JZB] Key ' + keyObject.key +
                        ' has invalid value for function ' + functionCode);
      }

      // Put forms together
      form += '<input type="hidden" name="' + keyObject.key +
              '" value="' + value + '" />';
    }

    form += '</form>';

    return form;
  }
}

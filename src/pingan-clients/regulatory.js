import net from 'net';
import iconv from 'iconv-lite';
import api from 'regulatory-description';
import ConnectionPool from 'jackpot';

/**
 * Encodes UTF-8 String to GBK Encoded Buffer
 * @param  {String} string UTF-8 String
 * @return {String}        GBK Encoded Buffer
 */
function gbkEncode(string) {
  return iconv.encode(string, 'gbk');
}

/**
 * Decudes GBK Encoded Buffer to UTF-8 String
 * @param  {Buffer} buffer GBK Encoded Buffer
 * @return {String}        UTF-8 String
 */
function gbkDecode(buffer) {
  return iconv.decode(buffer, 'gbk');
}

class RegulatoryMessage {
  /**
   * Class Constructor
   * @param  {String} functionCode (4 digit string) according to Pingan Bank.
   * @param  {Object} paramsList   Keys and values.
   */
  constructor(functionCode, paramsList) {
    this._functionCode = functionCode;
    this._paramsList = paramsList;
  }

  get functionCode() {
    return this._functionCode;
  }

  get paramsList() {
    return this._paramsList;
  }

  get messageBody() {
    if (this._messageBody) {
      return this._messageBody;
    }

    return '';
  }

  get messageHead() {
    if (this._messageHead) {
      return this._messageHead;
    }

    return '';
  }

  get networkHead() {
    if (this._networkHead) {
      return this._networkHead;
    }
    return '';
  }

  get message() {
    return this.networkHead + this.messageHead + this.messageBody + '\x00';
  }
}

export default class RegulatoryClient {
  constructor(config) {
    // Set up Regulatory Client (见证宝)
    this._pool = new ConnectionPool(10, () => {
      return net.connect(config.port, config.server);
    }, {
      min: 100,
      max: 30000,
      retries: 3
    });
    this._marketId = config.marketId;
  }

  sendMessage(functionCode, paramsList, callback) {
    var message = new RegulatoryMessage(functionCode, paramsList);

    this._pool.pull((err, connection) => {
      // Handles Error
      if (err) {
        callback(err, null);
        return;
      }

      // Sends message
      connection.write(message);
      console.log('Connection Initialized');
      connection.on('data', data => {
        callback(null, data.toString());
        connection.end();
      });

      // Disconnects message
      connection.on('end', () => {
        console.log('Connection Terminated');
      });
    });
  }
}

// TODO:
// GBK Encoding
// Split Message
// Prepare Message

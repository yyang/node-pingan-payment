require('./utils/polyfill');
import {RegulatoryClient, PaymentClient} from './pingan-clients';

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

  testRegulatoryClient() {
    var params = {
      FuncFlag: '1',
      SupAcctId: '11014166568005',
      ThirdCustId: 'HW0022',
      CustProperty: '00',
      NickName: '黄威翔',
      Reserve: '保留域'
    };
    console.log('Sending Message: ' + params);
    this._regulatoryClient.sendMessage('20160531010101123456', '6000', params,
      (error, result) => {
        console.log('Error: ' + error);
        console.log('Result: ' + JSON.stringify(result));
      });
  }
}

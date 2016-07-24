import express from 'express';
import Pingan from './pingan';

let pingan = new Pingan({
  webServiceHost: 'https://ebank.sdb.com.cn/',
  regulatory: {
    server: '192.168.32.210',
    port: 7072,
    marketId: '3006',
    superviseAccountId: '11014892692004'
  },
  payment: {
    cert: '../certs/paygate.pem',
    passphrase: '111111',
    paygate: '../certs/paygate.pem',
    masterId: '2000311146',
    returnURL: 'http://pingan.stackup.guru/peyment/return',
    notifyURL: 'http://pingan.stackup.guru/peyment/notify'
  }
});

pingan.sendMessage('123456', '6000', {}, (error, result) => {
  console.log(error);
  console.log(result);
});

const app = express();

app.get('/', (req, res) => {
  res.send(pingan.preparePaymentForm({
    masterId: '2000311146',
    orderId: '200031114620160715' + ~~(Math.random() * 89999999 + 10000000),
    currency: 'RMB',
    amount: '0.01',
    objectName: 'Test Order',
    paydate: '20160715102406',
    remark: 'this is a test product',
    validtime: '0'
  }));
});

app.listen(3000, () => {
  console.log('Pingan test app listening on port 3000!');
});

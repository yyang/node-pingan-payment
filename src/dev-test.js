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
    cert: '../certs/kuahang0711.pem',
    passphrase: '12345678',
    paygate: '../certs/paygate.pem',
    masterId: '2000724799',
    returnURL: 'http://pingan.stackup.guru/peyment/return',
    notifyURL: 'http://pingan.stackup.guru/peyment/notify'
  }
});

const app = express();

app.get('/', (req, res) => {
  res.send(pingan.preparePaymentForm({
    masterId: '2000724799',
    orderId: '200072479920160715' + ~~(Math.random() * 89999999 + 10000000),
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

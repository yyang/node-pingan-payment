import express from 'express';
import Pingan from './pingan';

let pingan = new Pingan({
  webServiceHost: 'https://testebank.sdb.com.cn/',
  regulatory: {
    server: '192.168.32.210',
    port: 7072,
    marketId: '3006',
    superviseAccountId: '11014892692004'
  },
  payment: {
    cert: '../certs/2000311146.pem',
    passphrase: '111111',
    paygate: '../certs/paygate.pem',
    masterId: '2000311146',
    returnURL: 'http://pingan.stackup.guru/peyment/return',
    notifyURL: 'http://pingan.stackup.guru/peyment/notify'
  }
});

const app = express();

app.get('/', (req, res) => {
  res.send(pingan.preparePaymentForm({
    masterId: '2000311146',
    orderId: '200031114620150604' + '13579246', //~~(Math.random() * 89999999 + 10000000),
    currency: 'RMB',
    amount: '0.01',
    objectName: '测试签名',
    paydate: '20160710120406',
    remark: 'this is a test product',
    validtime: '0'
  }));
});

app.listen(3000, () => {
  console.log('Pingan test app listening on port 3000!');
});

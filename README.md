平安银行支付客户端（node.js）
==========================

```lang=javascript
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

var params = {
  FuncFlag: '1',
  SupAcctId: '11014166568005',
  ThirdCustId: 'TestAccountID',
  CustProperty: '00',
  NickName: '测试用户名',
  Reserve: '保留域信息'
};

pingan.sendMessage('20160531010101123456', '6000', params, (error, result) => {
  console.log('Error: ' + error);
  console.log('Result: ' + JSON.stringify(result));
});

pingan.preparePaymentForm({
  masterId: '2000311146',
  orderId: '200031114620150604' + '13579246', //~~(Math.random() * 89999999 + 10000000),
  currency: 'RMB',
  amount: '0.01',
  objectName: '测试签名',
  paydate: '20160710120406',
  remark: 'this is a test product',
  validtime: '0'
});
```

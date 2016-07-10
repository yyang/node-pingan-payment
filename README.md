平安银行支付客户端（node.js）
==========================

```lang=javascript
var pingan = new Pingan({
  server: '192.168.32.210',
  port: 7072,
  marketId: '3006'
});

var params = {
  FuncFlag: '1',
  SupAcctId: '11014166568005',
  ThirdCustId: 'TestAccountID',
  CustProperty: '00',
  NickName: '测试用户名',
  Reserve: '保留域信息'
};

pingan.sendMessage('20160531010101123456', '6000', params,
  (error, result) => {
    console.log('Error: ' + error);
    console.log('Result: ' + JSON.stringify(result));
  });
```

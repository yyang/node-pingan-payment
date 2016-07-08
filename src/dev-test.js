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
    pfx: '../certs/2000311146.pfx',
    cert: '../certs/paygate.cer',
    masterId: '2000311146'
  }
});

console.log(pingan);

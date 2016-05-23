let C = String;
let N = Number;
let B = Boolean;

let request = {
  6000: {
    keys: [
      {key: 'FuncFlag', required: true, type: C, length: 1, default: '1'},
      {key: 'SupAcctId', required: true, type: C, length: 32},
      {key: 'ThirdCustId', required: true, type: C, length: 32},
      {key: 'CustProperty', required: true, type: C, length: 2, default: '00'},
      {key: 'NickName', required: false, type: C, length: 120},
      {key: 'MobilePhone', required: false, type: C, length: 12},
      {key: 'Email', required: false, type: C, length: 120},
      {key: 'Reserve', required: false, type: C, length: 120}
    ]
  },
  6052: {
    keys: [
      {key: 'FuncFlag', required: true, type: C, length: 1, default: '1'},
      {key: 'FuncFlag', required: true, type: C, length: 1},
      {key: 'OutCustAcctId', required: true, type: C, length: 32},
      {key: 'OutThirdCustId', required: true, type: C, length: 32},
      {key: 'SupAcctId', required: true, type: C, length: 32},
      {key: 'ThirdHtCount', required: true, type: C, length: 30},
      {key: 'InCustAcctId', required: true, type: C, length: 32},
      [
        {key: 'InThirdCustId', required: true, type: C, length: 32},
        {key: 'TranAmount', required: true, type: N, length: 15},
        {key: 'TranFee', required: true, type: N, length: 15},
        {key: 'CcyCode', required: true, type: C, length: 3, default: 'RMB'},
        {key: 'ThirdHtId', required: true, type: C, length: 30},
        {key: 'ThirdHtMsg', required: false, type: C, length: 500},
        {key: 'Note', required: false, type: C, length: 120},
        {key: 'MarketLogNo', required: true, type: C, length: 20}
      ],
      {key: 'Reserve', required: false, type: C, length: 120},
      {key: 'WebSign', required: false, type: C, length: 256}
    ]
  }
};

let response = {
  6000: {
    keys: [
      {key: 'CustAcctId', required: true, type: C, length: 32},
      {key: 'Reserve', required: true, type: C, length: 20}
    ]
  }
};

export let api = {request, response};

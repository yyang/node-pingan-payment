let request = {
  6000: {
    keys: [
      {key: 'FuncFlag', required: true, length: 1, default: '1'},
      {key: 'SupAcctId', required: true, length: 32},
      {key: 'ThirdCustId', required: true, length: 32},
      {key: 'CustProperty', required: true, length: 2, default: '00'},
      {key: 'NickName', required: false, length: 120},
      {key: 'MobilePhone', required: false, length: 12},
      {key: 'Email', required: false, length: 120},
      {key: 'Reserve', required: false, length: 120}
    ]
  }
};

let response = {
  6000: {
    keys: [
      {key: 'CustAcctId', required: true, length: 32},
      {key: 'Reserve', required: true, length: 20}
    ]
  }
};

export let api = {request, response};

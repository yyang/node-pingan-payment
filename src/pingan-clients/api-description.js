/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^[CNB]$" }] */

let C = String;
let N = Number;
let B = Boolean;

const request = {
  6000: {
    client: 'regulatory',
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
    client: 'regulatory',
    keys: [
      {key: 'FuncFlag', required: true, type: C, length: 1},
      {key: 'OutCustAcctId', required: true, type: C, length: 32},
      {key: 'OutThirdCustId', required: true, type: C, length: 32},
      {key: 'SupAcctId', required: true, type: C, length: 32},
      {key: 'ThirdHtCount', required: true, type: C, length: 30},
      [
        {key: 'InCustAcctId', required: true, type: C, length: 32},
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
  },
  6055: {
    client: 'regulatory',
    keys: [
      {key: 'SupAcctId', required: true, type: C, length: 32},
      {key: 'CustAcctId', required: true, type: C, length: 32},
      {key: 'ThirdCustId', required: true, type: C, length: 32},
      {key: 'CustName', required: true, type: C, length: 120},
      {key: 'IdType', required: true, type: C, length: 2},
      {key: 'IdCode', required: true, type: C, length: 20},
      {key: 'AcctId', required: true, type: C, length: 32},
      {key: 'BankType', required: true, type: C, length: 1},
      {key: 'BankName', required: true, type: C, length: 120},
      {key: 'BankCode', required: false, type: C, length: 14},
      {key: 'SBankCode', required: false, type: C, length: 14},
      {key: 'MobilePhone', required: true, type: C, length: 12},
      {key: 'Reserve', required: false, type: C, length: 120}
    ]
  },
  6064: {
    client: 'regulatory',
    keys: [
      {key: 'SupAcctId', required: true, type: C, length: 32},
      {key: 'ThirdCustId', required: true, type: C, length: 32},
      {key: 'CustAcctId', required: true, type: C, length: 32},
      {key: 'AcctId', required: true, type: C, length: 32},
      {key: 'TranAmount', required: true, type: N, length: 15},
      {key: 'CcyCode', required: true, type: C, length: 3, default: 'RMB'},
      {key: 'Reserve', required: false, type: C, length: 120}
    ]
  },
  6066: {
    client: 'regulatory',
    keys: [
      {key: 'SupAcctId', required: true, type: C, length: 32},
      {key: 'CustAcctId', required: true, type: C, length: 32},
      {key: 'ThirdCustId', required: true, type: C, length: 32},
      {key: 'CustName', required: true, type: C, length: 120},
      {key: 'IdType', required: true, type: C, length: 2},
      {key: 'IdCode', required: true, type: C, length: 20},
      {key: 'AcctId', required: true, type: C, length: 32},
      {key: 'BankType', required: true, type: C, length: 1},
      {key: 'BankName', required: true, type: C, length: 120},
      {key: 'BankCode', required: false, type: C, length: 14},
      {key: 'SBankCode', required: false, type: C, length: 14},
      {key: 'MobilePhone', required: true, type: C, length: 12},
      {key: 'Reserve', required: false, type: C, length: 120}
    ]
  },
  6067: {
    client: 'regulatory',
    keys: [
      {key: 'SupAcctId', required: true, type: C, length: 32},
      {key: 'ThirdCustId', required: true, type: C, length: 32},
      {key: 'CustAcctId', required: true, type: C, length: 32},
      {key: 'AcctId', required: true, type: C, length: 32},
      {key: 'MessageCode', required: true, type: C, length: 7},
      {key: 'Reserve', required: false, type: C, length: 120}
    ]
  },
  6065: {
    client: 'regulatory',
    keys: [
      {key: 'FuncFlag', required: true, type: C, length: 1},
      {key: 'SupAcctId', required: true, type: C, length: 32},
      {key: 'ThirdCustId', required: true, type: C, length: 32},
      {key: 'CustAcctId', required: true, type: C, length: 32},
      {key: 'AcctId', required: true, type: C, length: 32},
      {key: 'Reserve', required: false, type: C, length: 120}
    ]
  },
  6056: {
    client: 'regulatory',
    keys: [
      {key: 'SupAcctId', required: true, type: C, length: 32},
      {key: 'CustAcctId', required: true, type: C, length: 32},
      {key: 'ThirdCustId', required: true, type: C, length: 32},
      {key: 'TranAmount', required: true, type: N, length: 15},
      {key: 'CcyCode', required: true, type: C, length: 3, default: 'RMB'},
      {key: 'Note', required: false, type: C, length: 120},
      {key: 'Reserve', required: false, type: C, length: 120}
    ]
  },
  6005: { // 6005文档有WebSign必填 Java源码没有这个字段
    client: 'regulatory',
    keys: [
      {key: 'TranWebName', required: true, type: C, length: 120},
      {key: 'CustAcctId', required: true, type: C, length: 32},
      {key: 'IdType', required: true, type: C, length: 2},
      {key: 'IdCode', required: true, type: C, length: 20},
      {key: 'ThirdCustId', required: true, type: C, length: 32},
      {key: 'CustName', required: true, type: C, length: 120},
      {key: 'SupAcctId', required: true, type: C, length: 32},
      {key: 'OutAcctId', required: true, type: C, length: 32},
      {key: 'OutAcctIdName', required: true, type: C, length: 120},
      {key: 'CcyCode', required: true, type: C, length: 3, default: 'RMB'},
      {key: 'TranAmount', required: true, type: N, length: 15},
      {key: 'Note', required: false, type: C, length: 120},
      {key: 'Reserve', required: false, type: C, length: 120},
      {key: 'WebSign', required: true, type: C, length: 256}
    ]
  },
  6033: {
    client: 'regulatory',
    keys: [
      {key: 'TranWebName', required: true, type: C, length: 120},
      {key: 'CustAcctId', required: true, type: C, length: 32},
      {key: 'IdType', required: true, type: C, length: 2},
      {key: 'IdCode', required: true, type: C, length: 20},
      {key: 'ThirdCustId', required: true, type: C, length: 32},
      {key: 'CustName', required: true, type: C, length: 120},
      {key: 'SupAcctId', required: true, type: C, length: 32},
      {key: 'OutAcctId', required: true, type: C, length: 32},
      {key: 'OutAcctIdName', required: true, type: C, length: 120},
      {key: 'CcyCode', required: true, type: C, length: 3, default: 'RMB'},
      {key: 'TranAmount', required: true, type: N, length: 15},
      {key: 'Note', required: false, type: C, length: 120},
      {key: 'Reserve', required: false, type: C, length: 120},
      {key: 'WebSign', required: false, type: C, length: 256}
    ]
  },
  6085: { // 文档存在，Java SDK没有
    client: 'regulatory',
    keys: [
      {key: 'SupAcctId', required: true, type: C, length: 32},
      {key: 'CustAcctId', required: true, type: C, length: 32},
      {key: 'ThirdCustId', required: true, type: C, length: 32},
      {key: 'CustName', required: true, type: C, length: 120},
      {key: 'OutAcctId', required: true, type: C, length: 32},
      {key: 'OutAcctIdName', required: true, type: C, length: 120},
      {key: 'CcyCode', required: true, type: C, length: 3, default: 'RMB'},
      {key: 'TranAmount', required: true, type: N, length: 15},
      {key: 'HandFee', required: true, type: N, length: 15},
      {key: 'SerialNo', required: true, type: C, length: 32},
      {key: 'MessageCode', required: true, type: C, length: 7},
      {key: 'Note', required: false, type: C, length: 120},
      {key: 'Reserve', required: false, type: C, length: 120},
      {key: 'WebSign', required: true, type: C, length: 256}
    ]
  },
  6008: { // 6005文档有Note必填 Java源码没有这个字段
    client: 'regulatory',
    keys: [
      {key: 'SupAcctId', required: true, type: C, length: 32},
      {key: 'CustAcctId', required: true, type: C, length: 32},
      {key: 'ThirdCustId', required: true, type: C, length: 32},
      {key: 'CustName', required: true, type: C, length: 120},
      {key: 'TranAmount', required: true, type: N, length: 15},
      {key: 'CcyCode', required: true, type: C, length: 3, default: 'RMB'},
      {key: 'Note', required: false, type: C, length: 120},
      {key: 'Reserve', required: false, type: C, length: 120}
    ]
  },
  6053: { // 文档存在，Java SDK没有
    client: 'regulatory',
    keys: [
      {key: 'SupAcctId', required: true, type: C, length: 32},
      {key: 'TotalCount', required: true, type: C, length: 8},
      [
        {key: 'CustAcctId', required: true, type: C, length: 32},
        {key: 'ThirdCustId', required: true, type: C, length: 32},
        {key: 'TranAmount', required: true, type: N, length: 15},
        {key: 'Note', required: false, type: C, length: 120},
        {key: 'MarketLogNo', required: true, type: C, length: 20}
      ],
      {key: 'Reserve', required: false, type: C, length: 120}
    ]
  },
  6006: { // 6006文档有WebSign必填 Java源码没有这个字段
    client: 'regulatory',
    keys: [
      {key: 'FuncFlag', required: true, type: C, length: 1},
      {key: 'OutCustAcctId', required: true, type: C, length: 32},
      {key: 'SupAcctId', required: true, type: C, length: 32},
      {key: 'OutThirdCustId', required: true, type: C, length: 32},
      {key: 'OutCustName', required: true, type: C, length: 120},
      {key: 'InCustAcctId', required: true, type: C, length: 32},
      {key: 'InThirdCustId', required: true, type: C, length: 32},
      {key: 'InCustName', required: true, type: C, length: 120},
      {key: 'TranAmount', required: true, type: N, length: 15},
      {key: 'TranFee', required: true, type: N, length: 15},
      {key: 'TranType', required: true, type: C, length: 2, default: '01'},
      {key: 'CcyCode', required: true, type: C, length: 3, default: 'RMB'},
      {key: 'ThirdHtId', required: true, type: C, length: 30},
      {key: 'ThirdHtMsg', required: false, type: C, length: 500},
      {key: 'Note', required: false, type: C, length: 120},
      {key: 'Reserve', required: false, type: C, length: 120},
      {key: 'WebSign', required: false, type: C, length: 256}
    ]
  },
  6034: {
    client: 'regulatory',
    keys: [
      {key: 'FuncFlag', required: true, type: C, length: 1},
      {key: 'OutCustAcctId', required: true, type: C, length: 32},
      {key: 'SupAcctId', required: true, type: C, length: 32},
      {key: 'OutThirdCustId', required: true, type: C, length: 32},
      {key: 'OutCustName', required: true, type: C, length: 120},
      {key: 'InCustAcctId', required: true, type: C, length: 32},
      {key: 'InThirdCustId', required: true, type: C, length: 32},
      {key: 'InCustName', required: true, type: C, length: 120},
      {key: 'TranAmount', required: true, type: N, length: 15},
      {key: 'TranFee', required: true, type: N, length: 15},
      {key: 'TranType', required: true, type: C, length: 2, default: '01'},
      {key: 'CcyCode', required: true, type: C, length: 3, default: 'RMB'},
      {key: 'ThirdHtId', required: true, type: C, length: 30},
      {key: 'ThirdHtMsg', required: false, type: C, length: 500},
      {key: 'Note', required: false, type: C, length: 120},
      {key: 'Reserve', required: false, type: C, length: 120},
      {key: 'WebSign', required: false, type: C, length: 256}
    ]
  },
  6031: {
    client: 'regulatory',
    keys: [
      {key: 'FuncFlag', required: true, type: C, length: 1},
      {key: 'SupAcctId', required: true, type: C, length: 32},
      {key: 'OutCustAcctId', required: true, type: C, length: 32},
      {key: 'OutThirdCustId', required: true, type: C, length: 32},
      {key: 'OutCustName', required: true, type: C, length: 120},
      {key: 'InCustAcctId', required: true, type: C, length: 32},
      {key: 'InThirdCustId', required: true, type: C, length: 32},
      {key: 'InCustName', required: true, type: C, length: 120},
      {key: 'TranAmount', required: true, type: N, length: 15},
      {key: 'TranFee', required: true, type: N, length: 15},
      {key: 'TranType', required: true, type: C, length: 2, default: '01'},
      {key: 'CcyCode', required: true, type: C, length: 3, default: 'RMB'},
      {key: 'ThirdHtId', required: true, type: C, length: 30},
      {key: 'ThirdHtMsg', required: false, type: C, length: 500},
      {key: 'Note', required: false, type: C, length: 120},
      {key: 'Reserve', required: false, type: C, length: 120}
    ]
  },
  6007: { // 6007文档有HandFee Java源码写作TranFee
    client: 'regulatory',
    keys: [
      {key: 'FuncFlag', required: true, type: C, length: 1},
      {key: 'SupAcctId', required: true, type: C, length: 32},
      {key: 'CustAcctId', required: true, type: C, length: 32},
      {key: 'ThirdCustId', required: true, type: C, length: 32},
      {key: 'TranAmount', required: true, type: N, length: 15},
      {key: 'HandFee', required: true, type: N, length: 15},
      {key: 'CcyCode', required: true, type: C, length: 3, default: 'RMB'},
      {key: 'ThirdHtId', required: true, type: C, length: 30},
      {key: 'ThirdHtMsg', required: false, type: C, length: 500},
      {key: 'Note', required: false, type: C, length: 120},
      {key: 'Reserve', required: false, type: C, length: 120}
    ]
  },
  6070: { // 文档存在，Java SDK没有
    client: 'regulatory',
    keys: [
      {key: 'SupAcctId', required: true, type: C, length: 32},
      {key: 'OutCustAcctId', required: true, type: C, length: 32},
      {key: 'OutThirdCustId', required: true, type: C, length: 32},
      {key: 'HandFee', required: true, type: N, length: 15},
      {key: 'CcyCode', required: true, type: C, length: 3, default: 'RMB'},
      {key: 'ThirdHtId', required: true, type: C, length: 30},
      {key: 'TotalCount', required: true, type: C, length: 8},
      [
        {key: 'InCustAcctId', required: true, type: C, length: 32},
        {key: 'InThirdCustId', required: true, type: C, length: 32},
        {key: 'TranAmount', required: true, type: N, length: 15}
      ],
      {key: 'Note', required: false, type: C, length: 120},
      {key: 'Reserve', required: false, type: C, length: 120}
    ]
  },
  6077: {
    client: 'regulatory',
    keys: [
      {key: 'SupAcctId', required: true, type: C, length: 32},
      {key: 'FuncFlag', required: true, type: C, length: 1},
      {key: 'OrigThirdLogNo', required: true, type: C, length: 20},
      {key: 'Reserve', required: false, type: C, length: 120}
    ]
  },
  6082: { // 文档存在，Java SDK没有
    client: 'regulatory',
    keys: [
      {key: 'SupAcctId', required: true, type: C, length: 32},
      {key: 'ThirdCustId', required: true, type: C, length: 32},
      {key: 'CustAcctId', required: true, type: C, length: 32},
      {key: 'TranType', required: true, type: C, length: 2},
      {key: 'TranAmount', required: true, type: N, length: 15},
      {key: 'AcctId', required: false, type: C, length: 32},
      {key: 'ThirdHtId', required: false, type: C, length: 30},
      {key: 'TranNote', required: false, type: C, length: 120},
      {key: 'Reserve', required: false, type: C, length: 120}
    ]
  },
  6083: { // 文档存在，Java SDK没有
    client: 'regulatory',
    keys: [
      {key: 'SupAcctId', required: true, type: C, length: 32},
      {key: 'ThirdCustId', required: true, type: C, length: 32},
      {key: 'CustAcctId', required: true, type: C, length: 32},
      {key: 'ModifiedType', required: true, type: C, length: 2},
      {key: 'NewMobilePhone', required: true, type: C, length: 12},
      {key: 'AcctId', required: false, type: C, length: 32},
      {key: 'Reserve', required: false, type: C, length: 120}
    ]
  },
  6084: { // 文档存在，Java SDK没有
    client: 'regulatory',
    keys: [
      {key: 'SupAcctId', required: true, type: C, length: 32},
      {key: 'ThirdCustId', required: true, type: C, length: 32},
      {key: 'CustAcctId', required: true, type: C, length: 32},
      {key: 'ModifiedType', required: true, type: C, length: 2},
      {key: 'SerialNo', required: true, type: C, length: 32},
      {key: 'MessageCode', required: true, type: C, length: 7},
      {key: 'Reserve', required: false, type: C, length: 120}
    ]
  },
  6010: {
    client: 'regulatory',
    keys: [
      {key: 'SupAcctId', required: true, type: C, length: 32},
      {key: 'CustAcctId', required: false, type: C, length: 32},
      {key: 'SelectFlag', required: true, type: C, length: 1},
      {key: 'PageNum', required: true, type: C, length: 6},
      {key: 'Reserve', required: false, type: C, length: 120}
    ]
  },
  6014: {
    client: 'regulatory',
    keys: [
      {key: 'SupAcctId', required: true, type: C, length: 32},
      {key: 'FuncFlag', required: true, type: C, length: 1},
      {key: 'OrigThirdLogNo', required: false, type: C, length: 20},
      {key: 'TranDate', required: true, type: C, length: 8},
      {key: 'Reserve', required: false, type: C, length: 120}
    ]
  },
  6048: {
    client: 'regulatory',
    keys: [
      {key: 'FuncFlag', required: true, type: C, length: 1, default: '1'},
      {key: 'SupAcctId', required: true, type: C, length: 32},
      {key: 'BeginDate', required: false, type: C, length: 8},
      {key: 'EndDate', required: false, type: C, length: 8},
      {key: 'Reserve', required: false, type: C, length: 120}
    ]
  },
  6050: {
    client: 'regulatory',
    keys: [
      {key: 'FuncFlag', required: true, type: C, length: 1, default: '1'},
      {key: 'SupAcctId', required: true, type: C, length: 32},
      {key: 'BeginDate', required: true, type: C, length: 8},
      {key: 'EndDate', required: true, type: C, length: 8},
      {key: 'PageNum', required: true, type: C, length: 6},
      {key: 'Reserve', required: false, type: C, length: 120}
    ]
  },
  6072: {
    client: 'regulatory',
    keys: [
      {key: 'FuncFlag', required: true, type: C, length: 1},
      {key: 'SupAcctId', required: true, type: C, length: 32},
      {key: 'CustAcctId', required: true, type: C, length: 32},
      {key: 'SelectFlag', required: true, type: C, length: 1},
      {key: 'BeginDate', required: false, type: C, length: 8},
      {key: 'EndDate', required: false, type: C, length: 8},
      {key: 'PageNum', required: true, type: C, length: 6},
      {key: 'Reserve', required: false, type: C, length: 120}
    ]
  },
  6073: {
    client: 'regulatory',
    keys: [
      {key: 'FuncFlag', required: true, type: C, length: 1},
      {key: 'SupAcctId', required: true, type: C, length: 32},
      {key: 'CustAcctId', required: true, type: C, length: 32},
      {key: 'SelectFlag', required: true, type: C, length: 1},
      {key: 'BeginDate', required: false, type: C, length: 8},
      {key: 'EndDate', required: false, type: C, length: 8},
      {key: 'PageNum', required: true, type: C, length: 6},
      {key: 'Reserve', required: false, type: C, length: 120}
    ]
  },
  6011: {
    client: 'regulatory',
    keys: [
      {key: 'SupAcctId', required: true, type: C, length: 32},
      {key: 'Reserve', required: false, type: C, length: 120}
    ]
  },
  6037: {
    client: 'regulatory',
    keys: [
      {key: 'SupAcctId', required: true, type: C, length: 32},
      {key: 'ThirdCustId', required: true, type: C, length: 32},
      {key: 'Reserve', required: false, type: C, length: 120}
    ]
  },
  6079: { // 文档存在，Java SDK没有
    client: 'regulatory',
    keys: [
      {key: 'SupAcctId', required: true, type: C, length: 32},
      {key: 'CustAcctId', required: true, type: C, length: 32},
      {key: 'SelectFlag', required: true, type: C, length: 1},
      {key: 'BeginDate', required: true, type: C, length: 8},
      {key: 'EndDate', required: true, type: C, length: 8},
      {key: 'PageNum', required: true, type: C, length: 6},
      {key: 'RecordMax', required: true, type: C, length: 4},
      {key: 'Reserve', required: false, type: C, length: 120}
    ]
  },
  6080: { // 文档存在，Java SDK没有
    client: 'regulatory',
    keys: [
      {key: 'SupAcctId', required: true, type: C, length: 32},
      {key: 'CustAcctId', required: false, type: C, length: 32},
      {key: 'SelectFlag', required: true, type: C, length: 1, default: '1'},
      {key: 'BeginDate', required: true, type: C, length: 8},
      {key: 'EndDate', required: true, type: C, length: 8},
      {key: 'PageNum', required: true, type: C, length: 6},
      {key: 'RecordMax', required: true, type: C, length: 4},
      {key: 'Reserve', required: false, type: C, length: 120}
    ]
  },
  passwordForm: {
    client: 'regulatory',
    keys: [
      {key: 'orderid', required: true, type: C},
      {key: 'type', required: true, type: C, length: 1,
       allowedValues: ['S', 'C', 'R', 'V', 'M']},
      {key: 'P2PCode', required: true, type: C, length: 4},
      {key: 'P2PType', required: true, type: C, length: 1, default: '2'},
      {key: 'thirdCustId', required: true, type: C, length: 32},
      {key: 'custAcctId', required: true, type: C, length: 32},
      {key: 'name', required: true, type: C},
      {key: 'idType', required: true, type: C},
      {key: 'idNo', required: true, type: C},
      {key: 'accNo', required: false, type: C},
      {key: 'accName', required: false, type: C},
      {key: 'mobile', required: true, type: N, length: 11},
      {key: 'orig', required: false, type: C},
      {key: 'returnurl', required: false, type: C},
      {key: 'notifyUrl', required: false, type: C},
      {key: 'channelType', required: false, type: C}
    ]
  },
  paymentForm: {
    client: 'payment',
    endpoint: '/khpayment/khPayment.do',
    keys: [
      {key: 'masterId', required: true, type: C, length: 10},
      // orderId: 商户号+YYYYMMDD+8位流水
      {key: 'orderId', required: true, type: N, length: 26},
      {key: 'currency', required: true, type: C, length: 3, default: 'RMB'},
      {key: 'amount', required: true, type: N, length: 12},
      {key: 'objectName', required: true, type: C, length: 200},
      {key: 'paydate', required: true, type: N, length: 14}, // YYYYMMDDHHMMSS
      {key: 'validtime', required: true, type: N, length: 10},
      {key: 'remark', required: false, type: C, length: 500}
    ]
  }
};

const response = {
  6000: {
    client: 'regulatory',
    keys: [
      {key: 'CustAcctId', required: true, type: C, length: 32},
      {key: 'Reserve', required: false, type: C, length: 20}
    ]
  },
  6055: {
    client: 'regulatory',
    keys: [
      {key: 'Reserve', required: false, type: C, length: 20}
    ]
  },
  6064: {
    client: 'regulatory',
    keys: [
      {key: 'FrontLogNo', required: true, type: C, length: 14},
      {key: 'Reserve', required: false, type: C, length: 20}
    ]
  },
  6066: {
    client: 'regulatory',
    keys: [
      {key: 'Reserve', required: false, type: C, length: 20}
    ]
  },
  6067: {
    client: 'regulatory',
    keys: [
      {key: 'FrontLogNo', required: false, type: C, length: 14},
      {key: 'Reserve', required: false, type: C, length: 20}
    ]
  },
  6065: {
    client: 'regulatory',
    keys: [
      {key: 'FrontLogNo', required: false, type: C, length: 14},
      {key: 'Reserve', required: false, type: C, length: 20}
    ]
  },
  6056: {
    client: 'regulatory',
    keys: [
      {key: 'FrontLogNo', required: true, type: C, length: 14},
      {key: 'Reserve', required: false, type: C, length: 20}
    ]
  },
  6005: {
    client: 'regulatory',
    keys: [
      {key: 'FrontLogNo', required: true, type: C, length: 14},
      {key: 'HandFee', required: true, type: N, length: 15},
      {key: 'Reserve', required: false, type: C, length: 20}
    ]
  },
  6033: {
    client: 'regulatory',
    keys: [
      {key: 'FrontLogNo', required: true, type: C, length: 14},
      {key: 'HandFee', required: true, type: N, length: 15},
      {key: 'Reserve', required: false, type: C, length: 20}
    ]
  },
  6085: {
    client: 'regulatory',
    keys: [
      {key: 'FrontLogNo', required: true, type: C, length: 14},
      {key: 'Reserve', required: false, type: C, length: 20}
    ]
  },
  6008: {
    client: 'regulatory',
    keys: [
      {key: 'FrontLogNo', required: true, type: C, length: 14},
      {key: 'Reserve', required: false, type: C, length: 20}
    ]
  },
  6053: {
    client: 'regulatory',
    keys: [
      {key: 'FrontLogNo', required: true, type: C, length: 14},
      {key: 'Reserve', required: false, type: C, length: 20}
    ]
  },
  6006: {
    client: 'regulatory',
    keys: [
      {key: 'FrontLogNo', required: true, type: C, length: 14},
      {key: 'Reserve', required: false, type: C, length: 20}
    ]
  },
  6034: {
    client: 'regulatory',
    keys: [
      {key: 'FrontLogNo', required: true, type: C, length: 14},
      {key: 'Reserve', required: false, type: C, length: 20}
    ]
  },
  6031: {
    client: 'regulatory',
    keys: [
      {key: 'FrontLogNo', required: true, type: C, length: 14},
      {key: 'Reserve', required: false, type: C, length: 20}
    ]
  },
  6007: {
    client: 'regulatory',
    keys: [
      {key: 'FrontLogNo', required: true, type: C, length: 14},
      {key: 'Reserve', required: false, type: C, length: 20}
    ]
  },
  6070: {
    client: 'regulatory',
    keys: [
      {key: 'FrontLogNo', required: true, type: C, length: 14},
      {key: 'Reserve', required: false, type: C, length: 20}
    ]
  },
  6077: {
    client: 'regulatory',
    keys: [
      {key: 'FrontLogNo', required: true, type: C, length: 14},
      {key: 'Reserve', required: false, type: C, length: 20}
    ]
  },
  6082: {
    client: 'regulatory',
    keys: [
      {key: 'RevMobilePhone', required: true, type: C, length: 12},
      {key: 'SerialNo', required: true, type: C, length: 32},
      {key: 'Reserve', required: false, type: C, length: 20}
    ]
  },
  6083: {
    client: 'regulatory',
    keys: [
      {key: 'RevMobilePhone', required: true, type: C, length: 12},
      {key: 'SerialNo', required: true, type: C, length: 32},
      {key: 'Reserve', required: false, type: C, length: 20}
    ]
  },
  6084: {
    client: 'regulatory',
    keys: [
      {key: 'Reserve', required: false, type: C, length: 20}
    ]
  },
  6010: {
    client: 'regulatory',
    keys: [
      {key: 'TotalCount', required: true, type: C, length: 8},
      {key: 'BeginNum', required: true, type: C, length: 8},
      {key: 'LastPage', required: true, type: C, length: 1},
      {key: 'RecordNum', required: true, type: C, length: 4},
      [
        {key: 'CustAcctId', required: true, type: C, length: 32},
        {key: 'CustType', required: true, type: C, length: 1},
        {key: 'ThirdCustId', required: true, type: C, length: 32},
        {key: 'CustName', required: true, type: C, length: 120},
        {key: 'TotalBalance', required: true, type: N, length: 15},
        {key: 'TotalTranOutAmount', required: true, type: N, length: 15},
        {key: 'TranDate', required: true, type: C, length: 8}
      ],
      {key: 'Reserve', required: false, type: C, length: 120}
    ]
  },
  6014: {
    client: 'regulatory',
    keys: [
      {key: 'TranFlag', required: true, type: C, length: 1},
      {key: 'TranStatus', required: true, type: C, length: 1},
      {key: 'TranAmount', required: true, type: N, length: 15},
      {key: 'TranDate', required: true, type: C, length: 8},
      {key: 'TranTime', required: true, type: C, length: 6},
      {key: 'InCustAcctId', required: false, type: C, length: 32},
      {key: 'OutCustAcctId', required: false, type: C, length: 32},
      {key: 'Reserve', required: false, type: C, length: 120}
    ]
  },
  6048: {
    client: 'regulatory',
    keys: [
      {key: 'TotalCount', required: true, type: C, length: 8},
      [
        {key: 'FrontLogNo', required: true, type: C, length: 14},
        {key: 'ThirdLogNo', required: true, type: C, length: 22},
        {key: 'Remark', required: false, type: C, length: 120},
        {key: 'WithDrawRemark', required: false, type: C, length: 600},
        {key: 'WithDrawDate', required: true, type: C, length: 8}
      ],
      {key: 'Reserve', required: false, type: C, length: 120}
    ]
  },
  6050: {
    client: 'regulatory',
    keys: [
      {key: 'TotalCount', required: true, type: C, length: 8},
      {key: 'BeginNum', required: true, type: C, length: 8},
      {key: 'LastPage', required: true, type: C, length: 1},
      {key: 'RecordNum', required: true, type: C, length: 4},
      [
        {key: 'TranType', required: true, type: C, length: 2},
        {key: 'ThirdCustId', required: true, type: C, length: 32},
        {key: 'CustAcctId', required: true, type: C, length: 32},
        {key: 'TranAmount', required: true, type: N, length: 15},
        {key: 'InAcctId', required: true, type: C, length: 32},
        {key: 'InAcctIdName', required: true, type: C, length: 120},
        {key: 'CcyCode', required: true, type: C, length: 3, default: 'RMB'},
        {key: 'AcctDate', required: true, type: C, length: 8},
        {key: 'BankName', required: true, type: C, length: 120},
        {key: 'Note', required: true, type: C, length: 120},
        {key: 'FrontLogNo', required: true, type: C, length: 14}
      ],
      {key: 'Reserve', required: false, type: C, length: 120}
    ]
  },
  6072: {
    client: 'regulatory',
    keys: [
      {key: 'TotalCount', required: true, type: C, length: 8},
      {key: 'BeginNum', required: true, type: C, length: 8},
      {key: 'LastPage', required: true, type: C, length: 1},
      {key: 'RecordNum', required: true, type: C, length: 4},
      [
        {key: 'TranFlag', required: true, type: C, length: 1},
        {key: 'TranStatus', required: true, type: C, length: 1, default: '0'},
        {key: 'TranAmount', required: true, type: N, length: 15},
        {key: 'TranDate', required: true, type: C, length: 8},
        {key: 'TranTime', required: true, type: C, length: 6},
        {key: 'FrontLogNo', required: true, type: C, length: 14},
        {key: 'KeepType', required: true, type: C, length: 1},
        {key: 'InCustAcctId', required: false, type: C, length: 32},
        {key: 'OutCustAcctId', required: false, type: C, length: 32},
        {key: 'Note', required: false, type: C, length: 120}
      ],
      {key: 'Reserve', required: false, type: C, length: 120}
    ]
  },
  6073: {
    client: 'regulatory',
    keys: [
      {key: 'TotalCount', required: true, type: C, length: 8},
      {key: 'BeginNum', required: true, type: C, length: 8},
      {key: 'LastPage', required: true, type: C, length: 1},
      {key: 'RecordNum', required: true, type: C, length: 4},
      [
        {key: 'TranFlag', required: true, type: C, length: 2},
        {key: 'TranStatus', required: true, type: C, length: 1, default: '0'},
        {key: 'FuncMsg', required: false, type: C, length: 120},
        {key: 'ThirdCustId', required: true, type: C, length: 32},
        {key: 'CustAcctId', required: true, type: C, length: 32},
        {key: 'CustName', required: true, type: C, length: 120},
        {key: 'TranAmount', required: true, type: N, length: 15},
        {key: 'HandFee', required: false, type: N, length: 15},
        {key: 'TranDate', required: true, type: C, length: 8},
        {key: 'TranTime', required: true, type: C, length: 6},
        {key: 'FrontLogNo', required: true, type: C, length: 14},
        {key: 'Note', required: false, type: C, length: 120}
      ],
      {key: 'Reserve', required: false, type: C, length: 120}
    ]
  },
  6011: {
    client: 'regulatory',
    keys: [
      {key: 'LastBalance', required: true, type: N, length: 15},
      {key: 'CurBalance', required: true, type: N, length: 15},
      {key: 'Reserve', required: false, type: C, length: 120}
    ]
  },
  6037: {
    client: 'regulatory',
    keys: [
      {key: 'CustAcctId', required: true, type: C, length: 32},
      {key: 'TotalAmount', required: true, type: N, length: 15},
      {key: 'TotalBalance', required: true, type: N, length: 15},
      {key: 'TotalFreezeAmount', required: true, type: N, length: 15},
      {key: 'Reserve', required: false, type: C, length: 120}
    ]
  },
  6079: {
    client: 'regulatory',
    keys: [
      {key: 'TotalCount', required: true, type: C, length: 8},
      {key: 'BeginNum', required: true, type: C, length: 8},
      {key: 'LastPage', required: true, type: C, length: 1},
      {key: 'RecordNum', required: true, type: C, length: 4},
      [
        {key: 'TranFlag', required: true, type: C, length: 2},
        {key: 'TranStatus', required: true, type: C, length: 1, default: '0'},
        {key: 'ThirdCustId', required: true, type: C, length: 32},
        {key: 'CustAcctId', required: true, type: C, length: 32},
        {key: 'CustAcctName', required: true, type: C, length: 120},
        {key: 'TranAmount', required: true, type: N, length: 15},
        {key: 'TranDate', required: true, type: C, length: 8},
        {key: 'TranTime', required: true, type: C, length: 6},
        {key: 'FrontLogNo', required: true, type: C, length: 14},
        {key: 'ThirdLogNo', required: true, type: C, length: 20},
        {key: 'Note', required: true, type: C, length: 500},
        {key: 'Note2', required: true, type: C, length: 500}
      ],
      {key: 'Reserve', required: false, type: C, length: 120}
    ]
  },
  6080: {
    client: 'regulatory',
    keys: [
      {key: 'TotalCount', required: true, type: C, length: 8},
      {key: 'BeginNum', required: true, type: C, length: 8},
      {key: 'LastPage', required: true, type: C, length: 1},
      {key: 'RecordNum', required: true, type: C, length: 4},
      [
        {key: 'TranFlag', required: true, type: C, length: 1},
        {key: 'TranStatus', required: true, type: C, length: 1, default: '0'},
        {key: 'TranAmount', required: true, type: N, length: 15},
        {key: 'HandFee', required: true, type: N, length: 15},
        {key: 'TranDate', required: true, type: C, length: 8},
        {key: 'TranTime', required: true, type: C, length: 6},
        {key: 'FrontLogNo', required: true, type: C, length: 14},
        {key: 'ThirdLogNo', required: true, type: C, length: 20},
        {key: 'ThirdHtId', required: true, type: C, length: 30},
        {key: 'OutCustAcctId', required: true, type: C, length: 32},
        {key: 'OutThirdCustId', required: true, type: C, length: 32},
        {key: 'OutCustAcctName', required: true, type: C, length: 120},
        {key: 'InCustAcctId', required: true, type: C, length: 32},
        {key: 'InThirdCustId', required: true, type: C, length: 32},
        {key: 'InCustAcctName', required: true, type: C, length: 120},
        {key: 'Note', required: true, type: C, length: 500},
        {key: 'Note2', required: true, type: C, length: 500}
      ],
      {key: 'Reserve', required: false, type: C, length: 120}
    ]
  }
};

export const api = {request, response};

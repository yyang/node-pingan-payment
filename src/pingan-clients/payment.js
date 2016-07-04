import Symbol from 'symbol';
import libxml from 'libxmljs';

// Using Symbol definition for private variables;
let _data = Symbol();
let _doc = Symbol();

/**
 * Parse Pingan Payment XML into JS object, recursively
 * @param  {Element} node XML Node Element
 * @return {Object}       Parsed XML
 */
const parseNode = node => {
  const dataField = node => node.name() === 'field';
  const convert = child => {
    return dataField(child) ? child.attr('value').value() : parseNode(child);
  };

  let name = node.name();

  if (name === 'kColl') {
    let data = {};
    let children = node.childNodes();
    for (let child of children) {
      let key = child.attr('id').value();
      if (!key) {
        throw new Error('[Pingan Payment] Missing key for kColl element.');
      }
      data[key] = convert(child);
    }
    return data;
  }

  if (name === 'iColl') {
    let data = [];
    let children = node.childNodes();
    for (let child of children) {
      data.push(convert(child));
    }
    return data;
  }
};

// Defines dummy methods
let assembleNode;
let arrayNode;

assembleNode = (object, docBase, id) => {
  console.log('Assemble: ' + JSON.stringify(object));
  if (object === null || typeof object !== 'object') {
    throw new Error('[Pingan Payment] Wrong object type');
  }
  let node = new libxml.Element(docBase, 'kColl');
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      let value = object[key];
      if (Object.prototype.toString.call(value) === '[object Object]') {
        node.addChild(assembleNode(value, docBase, key));
      } else if (Object.prototype.toString.call(value) === '[object Array]') {
        node.addChild(arrayNode(value, docBase, key));
      } else {
        let child = new libxml.Element(docBase, 'field');
        child.attr({id: key, value: value.toString()});
        node.addChild(child);
      }
    }
  }
  if (id) {
    node.attr({id: id});
  }
  return node;
};

arrayNode = (array, docBase, id) => {
  let node = new libxml.Element(docBase, 'iColl');
  for (let item of array) {
    if (Object.prototype.toString.call(item) === '[object Object]') {
      node.addChild(assembleNode(item, docBase));
    } else if (Object.prototype.toString.call(item) === '[object Array]') {
      node.addChild(arrayNode(item, docBase));
    } else {
      let child = new libxml.Element(docBase, 'field');
      child.attr({value: item.toString()});
      node.addChild(child);
    }
  }
  if (id) {
    node.attr({id: id});
  }
  return node;
};

class KeyedXML {
  constructor(data, doc) {
    // Allows missing doc.
    if (!data) {
      throw new Error('[Pingan Payment] Empty KeyedXML object.');
    }
    this[_data] = data;
    this[_doc] = doc || this._prepareXMLDocument();
  }

  static fromObject(obj) {
    return new KeyedXML(obj);
  }

  static fromXML(string) {
    let doc = libxml.parseXmlString(string, {noblanks: true});
    let obj = parseNode(doc.root());
    return new KeyedXML(obj, doc);
  }

  _prepareXMLDocument() {
    if (!this[_data]) {
      throw new Error('[Pingan Payment] Missing data object.');
    }
    let doc = new libxml.Document();

    let docRoot = assembleNode(this[_data], doc, 'input');
    doc.root(docRoot);

    return doc;
  }

  set data(newData) {
    this[_data] = newData;
    this[_doc] = this._prepareXMLDocument();
  }

  get xml() {
    let clean = string => string.replace(/^<\?.+\?>\n/, '').replace(/\n/g, '');
    return clean(this[_doc].toString('no_blanks'));
  }

  get json() {
    return JSON.stringify(this[_data]);
  }

  get object() {
    return this[_data];
  }
}

export default class PaymentClient {
  constructor(config) {
    // Set up Regulatory Client (跨行支付收单)
    this._url = config.url;
    this._gatewayCertificate = config.gatewayCertificate;
    this._merchantCertificate = config.merchantCertificate;
  }
}

// TODO:
// GBK Encoding
// Prepare Message

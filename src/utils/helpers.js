import libxml from 'libxmljs';
import iconv from 'iconv-lite';
import semver from 'semver';

let currentVersion = semver.clean(process.version);

const extract = (func, keyObj, dataObj) => {
  // Throws Error for missing required param;
  if (keyObj.required && !dataObj.hasOwnProperty(keyObj.key) &&
      !keyObj.hasOwnProperty('default')) {
    throw new Error('[' + (func.part || 'Pingan') + '] Missing key ' +
                    keyObj.key + ' for function ' + func.name);
  }
  // Writes default value for non-existing params;
  if (!dataObj.hasOwnProperty(keyObj.key)) {
    return keyObj.default || '';
  }
  // Validate data
  let value = dataObj[keyObj.key].toString();
  if (keyObj.type === Number && !/^\d+(\.\d{1,2})?$/.test(value)) {
    throw new Error('[' + (func.part || 'Pingan') + '] Incorrect key ' +
                    keyObj.key + ' format for function ' + func.name);
  }
  if (value.toString().length > keyObj.length) {
    throw new Error('[' + (func.part || 'Pingan') + '] Key ' + keyObj.key +
                    ' overflow for function ' + func.name);
  }
  if (keyObj.allowedValues &&
      keyObj.allowedValues.indexOf(value) === -1) {
    throw new Error('[' + (func.part || 'Pingan') + '] Key ' + keyObj.key +
                    ' has invalid value for ' + func.name);
  }
  return value;
};

const validate = (func, validator, dataObj) => {
  let validatedObj = {};
  for (let keyObj of validator) {
    // Throws Error for missing required param;
    if (keyObj.required && !dataObj.hasOwnProperty(keyObj.key) &&
        !keyObj.hasOwnProperty('default')) {
      throw new Error('[' + (func.part || 'Pingan') + '] Missing key ' +
                      keyObj.key + ' for function ' + func.name);
    }
    // Writes default value for non-existing params;
    if (!dataObj.hasOwnProperty(keyObj.key)) {
      if (keyObj.hasOwnProperty('default')) {
        validatedObj[keyObj.key] = keyObj.default;
      }
      continue;
    }
    // Further validates data;
    if (keyObj.type === Object) {
      let value = dataObj[keyObj.key];
      if (Object.prototype.toString.call(value) === '[object Object]') {
        throw new Error('[' + (func.part || 'Pingan') + '] Invalid type for ' +
                        keyObj.key + ' for function ' + func.name);
      }
      let newObj = validate(func, keyObj.validator, value);
      validatedObj[keyObj.key] = newObj;
    } else if (keyObj.type === Array) {
      let value = dataObj[keyObj.key];
      if (Object.prototype.toString.call(value) === '[object Array]') {
        throw new Error('[' + (func.part || 'Pingan') + '] Invalid type for ' +
                        keyObj.key + ' for function ' + func.name);
      }
      let newArray = [];
      for (let item of dataObj[keyObj.key]) {
        newArray.push(validate(func, keyObj.validator, item));
      }
      validatedObj[keyObj.key] = newArray;
    } else {
      validatedObj[keyObj.key] = extract(func, keyObj, dataObj);
    }
  }
  return validatedObj;
};

const prepareForm = (formId, endpoint, params) => {
  // Prepares form body
  let form = new libxml.Document();
  let formRoot = new libxml.Element(form, 'form');
  formRoot.attr({action: endpoint, method: 'post', id: formId});
  form.root(formRoot);

  // Attach params
  for (let key in params) {
    if (!params[key]) {
      continue;
    }
    let input = new libxml.Element(form, 'input');
    input.attr({type: 'hidden', name: key, value: params[key]});
    formRoot.addChild(input);
  }

  let clean = string => string.replace(/^<\?.+\?>\n/, '').replace(/\n/g, '');
  return clean(form.toString('no_blanks'));
};

/**
 * Base64 and then URI endoce string.
 * @param  {String} str String to encode
 * @return {String}     encoded String
 */
const uriEncode = str => {
  if (semver.satisfies(currentVersion, '<5.10.0')) {
    return encodeURIComponent(new Buffer(str).toString('base64'));
  }
  return encodeURIComponent(Buffer.from(str).toString('base64'));
};

/**
 * Base 64 and then URI decode String
 * @param  {String} str String to decode
 * @return {String}     decoded String
 */
const uriDecode = str => {
  if (semver.satisfies(currentVersion, '<5.10.0')) {
    return new Buffer(decodeURIComponent(str), 'base64').toString();
  }
  return Buffer.from(decodeURIComponent(str), 'base64').toString();
};

/**
 * Encodes UTF-8 String to GBK Encoded Buffer
 * @param  {String} string UTF-8 String
 * @return {String}        GBK Encoded Buffer
 */
const gbkEncode = string => iconv.encode(string, 'gbk');

/**
 * Decudes GBK Encoded Buffer to UTF-8 String
 * @param  {Buffer} buffer GBK Encoded Buffer
 * @return {String}        UTF-8 String
 */
const gbkDecode = buffer => iconv.decode(buffer, 'gbk');

/**
 * Return a fixed width string filled with spacer
 * @param  {String} string Original String
 * @param  {Number} width  Expected width
 * @param  {String} spacer Spacing character
 * @return {String}        String with spacer and fixed width
 */
const padString = (string, width, spacer) => {
  spacer = spacer ? spacer.slice(0, 1) : '0';
  // Translate to String.
  string = string.toString();
  if (string.length === width) {
    return string;
  }
  if (string.length > width) {
    return string.substr(string.length - width);
  }
  return Array(width + 1 - string.length).join(spacer) + string;
};

/**
 * Join all url segments as arguemnts
 * @return {String} joined url
 */
const joinUrl = () => {
  let final = '';
  for (let i = 0; i < arguments.length; i++) {
    let segment = arguments[i].toString();
    if (i !== 0) {
      segment = segment.replace(/^(?!\/)/, '/');
    }
    if (i !== arguments.length) {
      segment = segment.replace(/\/$/, '');
    }
    final += segment;
  }
  return final;
};

export {extract, validate, prepareForm, uriEncode, uriDecode,
        gbkEncode, gbkDecode, padString, joinUrl};

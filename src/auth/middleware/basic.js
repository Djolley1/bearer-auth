'use strict';

const base64 = require('base-64');
const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { return _authError(res); }

  let basic = req.headers.authorization.split(' ');
  if (basic.length !== 2 || basic[0] !== 'Basic') {
    return _authError(res);
  }

  let encoded = basic[1];
  let decoded;

  try {
    decoded = base64.decode(encoded);
  } catch (error) {
    return res.status(400).send('Bad Request: Error decoding credentials');
  }

  let [username, pass] = decoded.split(':');
  if (!username || !pass) {
    return _authError(res);
  }else {
    console.log('user:', username, 'pass:', pass)
  }
console.log(users);
}
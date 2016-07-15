'use strict';

const speakeasy = require('speakeasy');

// 1. Generate secret and associate with user
var secret = speakeasy.generateSecret({length: 20});

// 2. Create token, and text to user
// '014096'
var token = speakeasy.totp({
  secret: secret.base32,
  encoding: 'base32',
  counter: 2*60*60 //2hrs in seconds
});

// 3. Validate their token, and confirm
var tokenValidates = speakeasy.totp.verify({
  secret: secret.base32,
  encoding: 'base32',
  token: '014096',
  counter: 2*60*60 //2hrs in seconds
});

'use strict';

const express = require('express');
const request = require('request');

const User = require('../models/user');
const Token = require('../models/token');
const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);


let router = express.Router();

// 1. generate a token.
// 2. Send to user's phone
router.post('/send', User.authorize(), (req, res) => {
  Token.generate(req.user._id, function(err, token) {
      if(err) return res.send(err);
      console.log('token:' ,token)


      client.sendMessage({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: '+16508787182',
        body: token.code+'your valification code'
      }, (err, response) => {
        console.log("err: ",err);
        console.log("response: ",response);
      });

    });

})


router.post('/verify', User.authorize(), (req, res)=>{
  console.log("req.body: ",req.body);
  console.log("req.user: ",req.user);
  Token.verify(req.user._id, req.body.code, function(err, token) {
    if(err) return res.send(err);
    console.log('token:' ,token)
    if(token){
      req.user.confirmKey = !req.user.confirmKey;
      User.findByIdAndUpdate(req.user._id, req.user, (err, user) => {
        if(err) return res.status(400).send(err || user);
        res.send(user);
      });
    }
    // res.send(token);
  });
})

module.exports = router;

'use strict';

const mongoose = require('mongoose');
const moment = require('moment');

let tokenSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  code: {type: String, required: true},
  exp: {type: Date, required: true}
})

tokenSchema.statics.generate = function(userId, cb){
  this.remove({user: userId}, (err) => {
    if(err) return cb(err);

    let token = new Token({
      user: userId,
      code: Math.floor(Math.random()*100000000).toString(16).toUpperCase(),
      exp: moment().add(30, 'minutes').toDate()
    });
    token.save(cb);

  });
}

tokenSchema.statics.verify = function(userId, code, cb){
  console.log("in verify");
  this.find({user: userId}, (err, token) => {
    if(err) return cb(err, false);
    console.log("token in verify: ", token);
    if(!token){
      console.log("bad token");
      return cb(null, false);
    }
    if(moment().isAfter(token[0].exp)){
      console.log("time's up");
       return cb(null, false);
    }
    if(code.toUpperCase() != token[0].code){
      console.log("token.code: ",typeof token[0].code);
      console.log("code: ", typeof code);
      console.log("wrong code");
      return cb(null, false);
    }
    cb(null, true);

  });
}

// Token.generate(user._id, (err, token) => {
//
// })

let Token = mongoose.model('Token', tokenSchema);
module.exports = Token;

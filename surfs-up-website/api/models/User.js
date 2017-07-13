/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var CryptoJS = require("crypto-js");

module.exports = {

  attributes: {
    userName:{
      type: 'string',
      required: true,
    },
    password:{
      type: 'string',
    },
    email:{
      type: 'string',
      required: true,
      email:true,
      unique:true
    },
    role:{
      type: 'string',
      required: true,
    },
    encryptedPassword:{
      type: 'string',
      required:true,
    },
    toJSON:function() {
      var obj = this.toObject();
      delete obj.encryptedPassword;
      return obj;
    }
  },
  beforeValidate:function (values,next) {
     if (!values.encryptedPassword) {
         values.encryptedPassword = "0000";
     }
     next();
 },
 beforeCreate:function (values,next) {
     var cipherText = CryptoJS.SHA256(values.password).toString();
     values.encryptedPassword = cipherText;
     values.password = null;
     next();
 }

};

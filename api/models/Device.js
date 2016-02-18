/**
* Device.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var uuid = require('uuid-v4'); 
module.exports = {

  attributes: {
    device_key: {
      type: 'string',
      unique: true
    },
    deviceModel: {
      type: 'string'
    },
    enable: {
      type: 'boolean',
      defaultsTo: true
    },
    name: {
      type: 'string'
    },
    status: {
      type: 'string',
      defaultsTo: "Just Registered"
    },
    lastSignal: {
      type: 'datetime'
    },
    description: {
      type: 'string'
    },
  	spot: {
  		model: 'Spot'
  	},
    configuration: {
      model: 'Configuration'
    },
<<<<<<< HEAD
    modules: {
=======
    module: {
>>>>>>> 9c97dde2cd209287eb9d1bc1495512c4a5efcc29
      collection: 'Module',
      via: 'device'
    },
    organization: {
      model: 'Organization'
    }
  },
  beforeCreate: function (device, next) {
    if (_.isEmpty(device.device_key)) {
      device.device_key = uuid();
    };
    next();
  }

};

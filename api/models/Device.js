/**
* Device.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    device_key: {
      type: 'string'
    },
    deviceModel: {
      type: 'string'
    },
    enable: {
      type: 'boolean'
    },
    status: {
      type: 'string'
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
    sensors: {
      collection: 'Sensor',
      via: 'device'
    }
  }
};

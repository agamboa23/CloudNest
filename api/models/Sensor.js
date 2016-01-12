/**
* Sensor.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var uuid = require('uuid-v4'); 

module.exports = {

  attributes: {
    sensorCode: {
      type: 'string',
      unique: true
    },
    name: {
      type: 'string'
    },
    model: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    enable: {
      type: 'boolean',
      defaultsTo: true
    },
    status: {
      type: 'string',
      defaultsTo: "Just Registered"
    },
    lastSignal: {
      type: 'datetime'
    },
    configuration: {
      model: 'Configuration'
    },
    device: {
      model:'Device'
    },
    dataStructure: {
      model: 'SensorData'
    }
  },
  beforeCreate: function (sensor, next) {
    if (_.isEmpty(sensor.sensorCode)) {
      sensor.sensorCode = uuid();
    };
    next();
  }
}

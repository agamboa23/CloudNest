/**
* Sensor.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
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
      type: 'boolean'
    },
    status: {
      type: 'string'
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
  }
};

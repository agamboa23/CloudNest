/**
* Module.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var uuid = require('uuid-v4'); 

module.exports = {

  attributes: {
    module_key: {
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
    lastData:{

    },
    DataType: {
      type: 'string',
      enum: ['image','video','string','integer','float','array','matrix','json','binary']
    },
    configuration: {
      model: 'Configuration'
    },
    device: {
      model:'Device'
    },
    ModuleData: {
    	collection: 'ModuleData',
      	via: 'module'
    },
    ModuleDataStructure: {
      model: 'ModuleDataStructure'
    }
  },
  beforeCreate: function (module, next) {
    if (_.isEmpty(module.module_key)) {
      module.module_key = uuid();
    };
    next();
  }
}

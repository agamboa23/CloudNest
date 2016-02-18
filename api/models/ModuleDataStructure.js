/**
* ModuleDataStructure.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    DataType: {
      type: 'string',
      enum: ['image','video','string','integer','float','array','matrix','json','binary']
    },
    description: {
      type: 'string'
    },
    module: {
      model:'Module'
    }
  }
};

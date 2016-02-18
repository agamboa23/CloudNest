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
<<<<<<< HEAD:api/models/ModuleDataStructure.js
      enum: ['image','video','string','integer','float','array','matrix','json','binary']
=======
      enum: ['media','string','integer','float','array','matrix','json','binary']
>>>>>>> 9c97dde2cd209287eb9d1bc1495512c4a5efcc29:api/models/ModuleDataStructure.js
    },
    description: {
      type: 'string'
    },
    module: {
      model:'Module'
    }
  }
};

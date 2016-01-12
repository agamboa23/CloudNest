/**
* Spot.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	name: {
  		type: 'string'
  	},
    description: {
      type: 'string'
    },
    space: {
      type: 'string'
    },
    latitude: {
      type: 'float'
    },
    longitude: {
      type: 'float'
    },
  	location: {
  		model: 'Location'
  	},
    devices: {
      collection: 'Device',
      via: 'spot'
    }
  }
};

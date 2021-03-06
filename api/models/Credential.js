/**
* Credential.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	type: {
  		type: 'string'
  	},
    drive_folder: {
      type: 'string'
    },
    access_token: {
      type: 'string'
    },
    refresh_token: {
      type: 'string'
    },
  	organization: {
  		model: 'Organization'
  	}
  }
};

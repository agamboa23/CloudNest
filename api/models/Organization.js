/**
* Organization.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  types: {
    is_google_account: function(account){
        if (/^([A-Za-z0-9_\-\.])+\@([gmail|GMAIL])+\.(com)$/.test(account)) {
          return true
        }
        else{
          return false
        }
    }
  },
  attributes: {
  	name: {
  		type: 'string'
  	},
    email: {
      type: 'email',
      required: true,
      unique: true,
      is_google_account: true
    },
    credentials: {
      collection: 'Credential',
      via: 'organization'
    },
  	webSite: {
  		type: 'string'
  	},
  	administrator: {
  		model: 'User'
  	},
  	regions:{
  		collection: 'Region',
  		via: 'organization'
  	}
  }
};

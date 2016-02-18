/**
 * InterfaceController
 *
 * @description :: Server-side logic for managing Google Drive API functions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    /**
     * Oauth2 callback with the token and the related organization id
     * 
     *
     * @param {Object} uploadcontentType the type of the file to be uploaded, like video/mp4, image/jpeg.
     * @param {Object} uploadContentLength the complete size of the file to be uploaded. It can be set to 0 if unkown.
     */
    postData:function(req,res){
    	var key = req.param('moduleKey');
    	sails.log(key);
    	sails.models.module.findOne({module_key:key}).exec(function (err,moduleWithKey){
    		if (err){
    			return res.negotiate(err);
    		}
    		if(!moduleWithKey){
    			res.status(403).send({error: 'moduleKey not valid'});
    			return
    		}
    		sails.log(moduleWithKey.enable);
    		if(!moduleWithKey.enable){
    		    res.status(403).send({error: 'selected module is disabled'});
    		}
    		req.body["module"]=moduleWithKey.id;
    		req.body["ModuleDataStructure"]=moduleWithKey.ModuleDataStructure;
    		sails.models.moduledata.create(req.body).exec(function dataLogged(err, created) {
                sails.models.module.update({module_key:key},{lastData:req.body.data}).exec(function (err, updated){
                    sails.log(created);
                });
    		})
    		return res.json(moduleWithKey);
    	})
    },
    setDeviceConfiguration: function(req,res){
    	var key = req.param('deviceKey');
    	sails.models.device.findOne({device_key:key}).exec(function(err,deviceWithKey){
    		if (err){
    			return res.negotiate(err);
    		}
    		if(!deviceWithKey){
    			res.status(403).send({error: 'device key not valid'});
    			return;
    		}
    		req.body["device"]=deviceWithKey.id;
    		sails.models.configuration.create(req.body).exec(function (err, created){
    			sails.models.device.update({id:deviceWithKey.id},{configuration:created.id}).exec(function(err, updated){
    				res.status(200).send({data: 'new configuration set'});
    				sails.models.configuration.destroy({id:deviceWithKey.configuration});
    				return
    			})
    		})
    	})
    },
    updateDeviceConfiguration: function(req,res){
    	var key = req.param('deviceKey');
    	sails.models.device.findOne({device_key:key}).exec(function(err,deviceWithKey){
    		if (err){
    			return res.negotiate(err);
    		}
    		if(!deviceWithKey){
    			res.status(403).send({error: 'device key not valid'});
    			return;
    		}
			sails.models.configuration.update({id:deviceWithKey.configuration},req.body).exec(function(err, updated){
				res.status(200).send({data: 'Configuration updated'});
				return
			})
    	})
    },
    getDeviceConfiguration: function(req,res){
    	var key = req.param('deviceKey');
    	sails.models.device.findOne({device_key:key}).exec(function(err,deviceWithKey){
    		if (err){
    			return res.negotiate(err);
    		}
    		if(!deviceWithKey){
    			res.status(403).send({error: 'device key not valid'});
    			return;
    		}
    		sails.models.configuration.findOne({id:deviceWithKey.configuration}).exec(function(err, foundConfiguration){
    			res.status(200).send(foundConfiguration)
    			return;
    		})
    	})
    },
    setModuleConfiguration: function(req,res){
    	var key = req.param('moduleKey');
    	sails.models.module.findOne({module_key:key}).exec(function(err,moduleWithKey){
    		if (err){
    			return res.negotiate(err);
    		}
    		if(!moduleWithKey){
    			res.status(403).send({error: 'module key not valid'});
    			return;
    		}
    		req.body["module"]=moduleWithKey.id;
    		sails.models.configuration.create(req.body).exec(function (err, created){
    			sails.models.module.update({id:moduleWithKey.id},{configuration:created.id}).exec(function(err, updated){
    				res.status(200).send({data: 'new configuration set'});
    				sails.models.configuration.destroy({id:moduleWithKey.configuration});
    				return
    			})
    		})
    	})
    },
    updateModuleConfiguration: function(req,res){
    	var key = req.param('moduleKey');
    	sails.models.module.findOne({module_key:key}).exec(function(err,moduleWithKey){
    		if (err){
    			return res.negotiate(err);
    		}
    		if(!moduleWithKey){
    			res.status(403).send({error: 'module key not valid'});
    			return;
    		}
			sails.models.configuration.update({id:moduleWithKey.configuration},req.body).exec(function(err, updated){
				res.status(200).send({data: 'Configuration updated'});
				return
			})
    	})
    },
    getModuleConfiguration: function(req,res) {
    	var key = req.param('moduleKey');
    	sails.models.module.findOne({module_key:key}).exec(function(err,moduleWithKey){
    		if (err){
    			return res.negotiate(err);
    		}
    		if(!moduleWithKey){
    			res.status(403).send({error: 'module key not valid'});
    			return;
    		}
    		sails.models.configuration.findOne({id:moduleWithKey.configuration}).exec(function(err, foundConfiguration){
    			res.status(200).send(foundConfiguration)
    			return;
    		})
    	})
    }
}


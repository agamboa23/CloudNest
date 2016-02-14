/**
 * ModuleDataController.js
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	count: function(req, res){
		var moduleId = req.param("moduleID");
		sails.models.moduledata.count({module: moduleId}).exec(function countData(error, found){
			res.send('{"count":"'+ found+'"}');
		});
		res.send
	}
};


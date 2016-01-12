/**
 * GoogleDriveController
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
    oauth2callback:function(req,res){
        code = req.param('code');
        organizationId = req.param('status');
        sails.services.driveservice.saveTokenFromCode(code,organizationId);
        return res.redirect("/");
    },
    authorize: function(req,res){
        organizationId = req.param('organizationId');
        sails.services.driveservice.getTokenCode(organizationId,res);
    },
    /**
     * Get Google Drive Upload Link for a resumable upload
     * 
     *
     * @param {Object} uploadcontentType the type of the file to be uploaded, like video/mp4, image/jpeg.
     * @param {Object} uploadContentLength the complete size of the file to be uploaded. It can be set to 0 if unkown.
     */
    getResumableUploadLocation: function(req,res) {
        sails.services.driveservice.getResumableUploadLocation(req,res, false, function(err, message) {
            if (err) {
                sails.log.warn(err);
                res.send(err);
            }
            else{
              res.send(message);
            }
        });
    }
};


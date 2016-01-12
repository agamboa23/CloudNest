//Google Drive API handler Service
//
var http = require('https');
var querystring = require('querystring');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var SCOPES = ['https://www.googleapis.com/auth/drive'];

var clientId = sails.config.drive.clientId;
var clientSecret = sails.config.drive.clientSecret;
var redirectUrl = sails.config.drive.redirectUri;
var auth = new googleAuth();
var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

module.exports = {
    /**
     * Get and store new token after prompting for user authorization, and then
     * execute the given callback with the authorized OAuth2 client.
     *
     * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
     * @param {getEventsCallback} callback The callback to call with the authorized
     *     client.
     */
    getTokenCode: function(organizationId,res) {
        var authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
            prompt: 'consent',
            state: organizationId
        });
        return res.redirect(authUrl);
    },

    saveTokenFromCode: function(code, organizationId){
        oauth2Client.getToken(code, function(err, token) {
            if (err) {
                sails.log('Error while trying to retrieve access token', err);
                return;
            }
            sails.models.credential.findOrCreate({organization:organizationId},
            {type: "GoogleDrive",
            access_token : token.access_token,
            refresh_token : token.refresh_token,
            organization : organizationId
            }).exec(function createFindCB(err, record){
                if (err) {
                    sails.log('Error while saving the access token', err);
                    return;
                };
                if (record.access_token!=token.access_token){
                    sails.models.credential.update({organization:organizationId},
                        {access_token : token.access_token,
                        refresh_token : token.refresh_token,
                        organization : organizationId}).exec(function afterwards(err, updated){
                            if (err){
                                sails.log('Error while updating the access token', err);
                                return;
                            }
                        })
                }
            });
            });
        },
    getAccessToken: function(requiredUploadData, getLocation, refreshed, next){

        sails.models.device.find({device_key:requiredUploadData.deviceKey}).exec(function findCB(err, deviceFound){
            sails.models.credential.find({organization:deviceFound.organization}).exec(function findCB(err, found){
                requiredUploadData.token = found[0].access_token;
                getLocation(requiredUploadData, refreshed, next);
            })
        })
    },
    refreshAndRepost: function(requiredUploadData,getLocation, refresh, next){

        sails.models.device.find({device_key:requiredUploadData.deviceKey}).exec(function findCB(err, deviceFound){
            sails.models.credential.find({organization:deviceFound.organization}).exec(function findCB(err, found){
                sails.services.driveservice.getRefreshToken(found[0].refresh_token, function (newToken){
                    sails.models.credential.update({organization:deviceFound.organization},{access_token:newToken}).
                    exec(function afterwards(err, updated){
                        requiredUploadData.token = updated[0].access_token;
                        getLocation(requiredUploadData, true, next);
                    })
                })
            })
        })
    },
    getRefreshToken: function(refreshToken,callback){
        var options = {
          "method": "POST",
          "hostname": "www.googleapis.com",
          "path": "/oauth2/v4/token",
          "headers": {
            "content-type": "application/x-www-form-urlencoded"
          }
        };

        var post_data = querystring.stringify({ 
            client_id: clientId,
            grant_type: 'refresh_token',
            refresh_token: refreshToken, 
            client_secret: clientSecret });

        var req = http.request(options, function (authRes) {
            var chunks = [];
            authRes.on("data", function (chunk) {
                chunks.push(chunk);
            });

            authRes.on("end", function () {
            var recievedData = Buffer.concat(chunks);
            var body = JSON.parse(recievedData.toString());
            callback(body.access_token);
            });

        });

        req.on('error', function(e) {
          sails.log('ERROR: ' + e.message);
        });

        req.write(post_data);
        req.end();
    },
    getResumableUploadLocation: function(req, res, refreshed, next) {
        var postRequiredData ={
            uploadContentType : req.param('uploadContentType'),
            uploadContentLength : req.param('uploadContentLength'),
            uploadTitle : req.param('uploadTitle'),
            deviceKey : req.param('deviceKey'),
            originId : req.param('originId')
        };

        if (!(postRequiredData.uploadContentLength||postRequiredData.uploadContentType||postRequiredData.uploadTitle||postRequiredData.deviceKey)){
            err="Incorrect Parameters";
            next(err);
            return;
        }
        this.getAccessToken(postRequiredData,this.getDriveUploadLocation, refreshed, next);
    },
    getDriveUploadLocation : function (uploadRequiredData,refreshed,next){
        if (!uploadRequiredData.token){
            err="Organization Drive permission required";
            next(err);
            return;
        };
        var post_data = querystring.stringify({
            "title" : uploadRequiredData.uploadTitle
          });
        var location;
        var post_options = {
            host: 'www.googleapis.com',
            path: '/upload/drive/v2/files?uploadType=resumable',
            method: 'POST',
            headers: {
                'content-type': 'application/json; charset=UTF-8',
                'content-length': '0',
                'authorization': 'Bearer ' + uploadRequiredData.token,
                'X-Upload-Content-Type': uploadRequiredData.uploadContentType,
                'X-Upload-Content-Length':  uploadRequiredData.uploadContentLength
               }
        };
        var post_req = http.request(post_options, function(driveRes) {
            var chunks = [];
            driveRes.on("data", function (chunk) {
                chunks.push(chunk);
            });

            driveRes.on("end", function () {
                if (driveRes.statusCode===200){
                    location= driveRes.headers.location;
                    if (location){
                        next(null,location);
                    }
                    return;
                }
                var recievedData = Buffer.concat(chunks);
                var body = JSON.parse(recievedData.toString());
                if (driveRes.statusCode===401 && !refreshed){
                    sails.services.driveservice.refreshAndRepost(uploadRequiredData,sails.services.driveservice.getDriveUploadLocation, true, next);
                    return;
                };
                if (driveRes.statusCode!=200){
                    next(body,null);
                    return;
                }
            });

        });
        post_req.write(post_data);
        post_req.end();
    }
}